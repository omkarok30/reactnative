import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useConversationSubscription = (onUpdate: () => void) => {
  useEffect(() => {
    console.log('🔄 [useConversationSubscription] Setting up conversations subscription');
    
    const channel = supabase
      .channel('conversations_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          console.log('📨 [useConversationSubscription] Received real-time update:', payload);
          onUpdate();
        }
      )
      .subscribe((status) => {
        console.log('🔌 [useConversationSubscription] Subscription status:', status);
      });

    return () => {
      console.log('🧹 [useConversationSubscription] Cleaning up subscription');
      supabase.removeChannel(channel);
    };
  }, [onUpdate]);
};