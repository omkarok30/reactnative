import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Conversation } from "@/types/conversations";
import { useToast } from "@/components/ui/use-toast";

export const useConversationFetching = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.log('❌ [useConversationFetching] No user found');
      return null;
    }
    return user;
  };

  const fetchConversationsData = async (userId: string) => {
    console.log('🔍 [useConversationFetching] Fetching conversations for user:', userId);
    
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

    if (error) throw error;
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
      .filter(conv => conv.participants.some(p => p.profiles.id === userId))
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

  const fetchConversations = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const conversationsData = await fetchConversationsData(user.id);
      
      if (!conversationsData) {
        console.log('⚠️ [useConversationFetching] No conversations found');
        setConversations([]);
        setLoading(false);
        return;
      }

      const formattedConversations = formatConversations(conversationsData, user.id);
      console.log('✅ [useConversationFetching] Formatted conversations:', formattedConversations);
      
      setConversations(formattedConversations);
    } catch (error) {
      console.error('❌ [useConversationFetching] Error in fetchConversations:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les conversations. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return { conversations, loading, fetchConversations };
};