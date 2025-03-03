import { useConversationFetching } from "./useConversationFetching";
import { useConversationSubscription } from "./useConversationSubscription";

export const useConversations = () => {
  const { conversations, loading, fetchConversations } = useConversationFetching();
  
  useConversationSubscription(fetchConversations);

  return { conversations, loading, fetchConversations };
};