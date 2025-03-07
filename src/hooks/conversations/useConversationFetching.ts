import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToastStore } from "@/store/useToastStore";
import { useEffect } from "react";

// Fetch conversations from Supabase
const fetchConversations = async () => {
  const { data, error } = await supabase
    .from('conversations')
    .select(`
    id,
    created_at,
    messages (
      id,
      content,
      created_at,
      sender_id,
      read
    ),
    participants:conversation_participants (
      profiles (
        id,
        first_name,
        last_name,
        profile_picture_url
      )
    )
  `)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const formatParticipants = (participants: any[], currentUserId: string) => {
  return participants
    .map(p => p.profiles)
    .filter(profile => profile.id !== currentUserId)
    .map(profile => ({
      user_id: profile.id,
      first_name: profile.first_name || '',
      last_name: profile.last_name || '',
      profile_picture_url: profile.profile_picture_url
    }));
};

const sortMessagesByDate = (messages: any[]) => {
  return [...(messages || [])].sort((a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
};

const countUnreadMessages = (messages: any[], userId: string) => {
  return messages.filter(msg => !msg.read && msg.sender_id !== userId).length;
};
const formatConversations = (conversationsData: any[], userId: string) => {
  return conversationsData
    .filter(conv => conv.participants.some((p: any) => p.profiles.id === userId))
    .map(conv => {
      const otherParticipants = formatParticipants(conv.participants, userId);
      const sortedMessages = sortMessagesByDate(conv.messages);
      const unreadCount = countUnreadMessages(conv.messages, userId);

      console.log('👥 [useConversationFetching] Participants for conversation:', conv.id, otherParticipants);
      console.log('📬 [useConversationFetching] Unread messages count:', unreadCount);

      return {
        id: conv.id,
        created_at: conv.created_at,
        messages: sortedMessages,
        participants: otherParticipants,
        unreadCount
      };
    });
};

export const useConversationFetching = (userId: string) => {
  console.log(userId)
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['conversations', userId],
    queryFn: fetchConversations,
    enabled: !!userId, // Fetch only when userId is available
    select: (data) => formatConversations(data, userId), // Format conversations as needed
  });

  // Use refetch on update
  const onUpdate = () => {
    refetch(); // Trigger a refetch when data changes
  };

  // Setup subscription for real-time updates
  useEffect(() => {
    const channel = supabase
      .channel('conversations_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          console.log('📨 [useConversationSubscription] Received real-time update:', payload);
          onUpdate(); // Trigger fetch conversations on update
        }
      )
      .subscribe((status) => {
        console.log('🔌 [useConversationSubscription] Subscription status:', status);
      });

    // Cleanup subscription on component unmount
    return () => {
      console.log('🧹 [useConversationSubscription] Cleaning up subscription');
      supabase.removeChannel(channel);
    };
  }, [userId]); // Only re-subscribe if userId changes

  useEffect(() => {
    if(isError) showToast("error", "Erreur", "Impossible de charger les conversations. Veuillez réessayer.")
  }, [isError])

  return {
    data, isLoading, isError
  }
};
