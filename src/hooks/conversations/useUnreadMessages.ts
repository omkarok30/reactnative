import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const useUnreadMessages = (userId: string) => {
    const queryClient = useQueryClient();

    // Fetch unread messages count
    const { data: unreadCount = 0, refetch } = useQuery({
        queryKey: ["unreadMessages", userId],
        queryFn: async () => {
            console.log("🔄 Fetching unread count for user:", userId);
            const { count, error } = await supabase
                .from("messages")
                .select("*", { count: "exact", head: true })
                .eq("read", false)
                .neq("sender_id", userId);

            if (error) {
                console.error("❌ Error fetching unread count:", error);
                return 0;
            }

            console.log("✉️ Unread messages count:", count);
            return count || 0;
        },
        enabled: !!userId, // Ensure query runs only if userId is available
    });

    // Subscribe to new messages
    useEffect(() => {
        if (!userId) return;

        console.log("🔔 Subscribing to new messages for user:", userId);
        const channel = supabase
            .channel("new_messages")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "messages",
                    filter: `sender_id=neq.${userId}`,
                },
                () => {
                    console.log("📨 New message received. Refetching...");
                    refetch();
                }
            )
            .subscribe();

        return () => {
            console.log("🧹 Unsubscribing from new messages");
            supabase.removeChannel(channel);
        };
    }, [userId, refetch]);

    // Subscribe to message updates (for marking messages as read)
    useEffect(() => {
        if (!userId) return;

        console.log("🔔 Subscribing to message updates for user:", userId);
        const channel = supabase
            .channel("message_updates")
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "messages",
                    filter: `sender_id=neq.${userId}`,
                },
                (payload: any) => {
                    console.log("📬 Message update received:", payload);
                    if (payload.new.read && !payload.old.read) {
                        refetch();
                    }
                }
            )
            .subscribe();

        return () => {
            console.log("🧹 Unsubscribing from message updates");
            supabase.removeChannel(channel);
        };
    }, [userId, refetch]);

    return { unreadCount, refetch };
};

export default useUnreadMessages;
