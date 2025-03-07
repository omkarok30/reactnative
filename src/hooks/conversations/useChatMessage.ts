import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToastStore } from "@/store/useToastStore";

const useChatMessage = (id: string, userId: string) => {
    const { showToast } = useToastStore()
    const queryClient = useQueryClient();

    // Fetch conversation details and messages
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["conversationDetails", id],
        queryFn: async () => {
            console.log("Fetching conversation details for:", id);

            // Fetch conversation participants
            const { data: conversationData, error: conversationError } = await supabase
                .from("conversations")
                .select(`
                    conversation_participants!inner (
                        profiles_id,
                        profiles!inner (
                            first_name,
                            last_name,
                            profile_picture_url
                        )
                    )
                `)
                .eq("id", id)
                .single();

            if (conversationError) throw conversationError;

            // Fetch messages
            const { data: messagesData, error: messagesError } = await supabase
                .from("messages")
                .select("*")
                .eq("conversation_id", id)
                .order("created_at", { ascending: true });

            if (messagesError) throw messagesError;

            // Extract participants
            const participants = conversationData.conversation_participants.map((cp) => ({
                user_id: cp.profiles_id,
                ...cp.profiles,
            }));

            const otherParticipant = participants.find((p) => p.user_id !== userId) || participants[0];

            return {
                participants: [otherParticipant],
                messages: messagesData,
            };
        },
        enabled: !!id && !!userId,
    });

    // Mark messages as read
    const markMessagesAsRead = useMutation({
        mutationFn: async () => {
            console.log("📫 Marking messages as read for user:", userId);

            const { error } = await supabase
                .from("messages")
                .update({ read: true })
                .eq("conversation_id", id)
                .neq("sender_id", userId)
                .eq("read", false);

            if (error) throw error;

            console.log("✅ Messages marked as read successfully");
        },
        onSuccess: () => {
            queryClient.setQueryData(["conversationDetails", id], (oldData: any) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    messages: oldData.messages.map((msg: any) =>
                        msg.sender_id !== userId ? { ...msg, read: true } : msg
                    ),
                };
            });
        },
        onError: (err) => {
            console.error("❌ Error marking messages as read:", err);
        },
    });

    // Send message function
    const handleSend = async (newMessage: string) => {
        if (!newMessage.trim() || !userId || !id) return;

        try {
            console.log("✉️ Sending message:", {
                conversation_id: id,
                sender_id: userId,
                content: newMessage.trim(),
            });

            // Optimistic update: add message locally before API call
            queryClient.setQueryData(["conversationDetails", id], (oldData: any) => {
                if (!oldData) return oldData;

                const tempMessage = {
                    id: Date.now().toString(), // Temporary ID
                    conversation_id: id,
                    sender_id: userId,
                    content: newMessage.trim(),
                    created_at: new Date().toISOString(),
                    read: false,
                };

                return {
                    ...oldData,
                    messages: [...oldData.messages, tempMessage],
                };
            });

            // API call to send message
            const { error } = await supabase
                .from("messages")
                .insert({
                    conversation_id: id,
                    sender_id: userId,
                    content: newMessage.trim(),
                });

            if (error) throw error;

        } catch (error) {
            console.error("❌ Error sending message:", error);
            showToast("error", "Erreur", "Impossible d'envoyer le message");
        }
    };

    // Subscribe to real-time message updates
    useEffect(() => {
        if (!id) return;

        const channel = supabase
            .channel(`messages:${id}`)
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "messages",
                    filter: `conversation_id=eq.${id}`,
                },
                (payload) => {
                    const newMessage = payload.new;

                    queryClient.setQueryData(["conversationDetails", id], (oldData: any) => {
                        if (!oldData) return oldData;
                        return {
                            ...oldData,
                            messages: [...oldData.messages, newMessage],
                        };
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [id, queryClient]);

    // Auto-mark messages as read when chat opens
    useEffect(() => {
        if (data?.messages?.some((msg) => !msg.read && msg.sender_id !== userId)) {
            markMessagesAsRead.mutate();
        }
    }, [data?.messages]);

    return {
        data,
        isLoading,
        isError,
        error,
        refetch,
        markMessagesAsRead: () => markMessagesAsRead.mutate(),
        handleSend,
    };
};

export default useChatMessage;
