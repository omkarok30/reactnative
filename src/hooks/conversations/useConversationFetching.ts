import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToastStore } from "@/store/useToastStore";

export const useConversationFetching = (userId: string) => {
  const { showToast } = useToastStore();

  const fetchConversationsData = async (userId: string) => {
    try {
      console.log("🔍 [useConversationFetching] Fetching conversations for user:", userId);

      const { data, error } = await supabase
        .from("conversations")
        .select(
          `
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
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("❌ [useConversationFetching] Error fetching conversations:", error);
      showToast("error", "Erreur", "Impossible de charger les conversations. Veuillez réessayer.");
      throw error; // Ensure React Query registers it as an error
    }
  };

  const fetchConversations = async (userId: string) => {
    try {
      if (!userId) {
        return [];
      }

      const conversationsData = await fetchConversationsData(userId);

      if (!conversationsData) {
        console.log('⚠️ [useConversationFetching] No conversations found');
        return ([]);
      }

      const formattedConversations = formatConversations(conversationsData, userId);
      console.log('✅ [useConversationFetching] Formatted conversations:', formattedConversations);

      return (formattedConversations);
    } catch (error) {
      console.error('❌ [useConversationFetching] Error in fetchConversations:', error);
      showToast('error', "Erreur", "Impossible de charger les conversations. Veuillez réessayer.");
    }
  };

  const {
    data: conversations,
    error,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["conversations", userId],
    queryFn: () => fetchConversations(userId),
    enabled: !!userId, // Fetch only when userId is available
    // select: (data) => formatConversations(data),
  });

  return { conversations, error, refetch, isLoading };
};

function formatParticipants(participants: any[], currentUserId: string) {
  return participants
    .map((p) => p.profiles)
    .filter((profile) => profile.id !== currentUserId)
    .map((profile) => ({
      user_id: profile.id,
      first_name: profile.first_name || "",
      last_name: profile.last_name || "",
      profile_picture_url: profile.profile_picture_url,
    }));
};

function sortMessagesByDate(messages: any[]) {
  return [...(messages || [])].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
};

function countUnreadMessages(messages: any[], userId: string) {
  return messages.filter((msg) => !msg.read && msg.sender_id !== userId).length;
};

function formatConversations(conversationsData: any[], userId: string) {
  return conversationsData
    .filter((conv) => conv.participants.some((p: any) => p.profiles.id === userId))
    .map((conv) => {
      const otherParticipants = formatParticipants(conv.participants, userId);
      const sortedMessages = sortMessagesByDate(conv.messages);
      const unreadCount = countUnreadMessages(conv.messages, userId);

      return {
        id: conv.id,
        created_at: conv.created_at,
        messages: sortedMessages,
        participants: otherParticipants,
        unreadCount,
      };
    });
};
