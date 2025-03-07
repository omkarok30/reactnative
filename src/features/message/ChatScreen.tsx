import CustomSafeAreaView from "@/components/global/CustomSafeView";
import { PageHeader } from "@/components/layout/PageHeader";
import Conversation from "@/components/messages/Conversation";
import MessageInput from "@/components/messages/MessageInput";
import { Text } from "@/components/ui/text";
import { P } from "@/components/ui/typography";
import useChatMessage from "@/hooks/conversations/useChatMessage";
import { useAuthStore } from "@/store/useAuthStore";
import { conversations, currentUserId } from "@/utils/dummyData";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

// Define inline type for route params
type ChatScreenRouteProp = RouteProp<{ Chat: { conversationId: string; userName: string, currentUserId: string } }, "Chat">;

const ChatScreen = () => {
    const route = useRoute<ChatScreenRouteProp>();
    const { conversationId, userName, currentUserId } = route.params ?? {};
    const flatListRef = useRef<FlatList>(null);
    const { data: messageData, refetch, isLoading, error, markMessagesAsRead, handleSend } = useChatMessage(conversationId, currentUserId);

    // Find the current conversation 

    if (!conversationId || !userName) {
        return <View><Text>Error: Missing conversation details</Text></View>;
    }

    // Scroll to bottom when chat opens
    useEffect(() => {
        if (messageData?.messages) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100); // Small delay for smoother animation 
        }
    }, [messageData?.messages]); // Runs when messages change

    return (
        <CustomSafeAreaView>
            <View className="flex-1">
                {/* Sticky header */}
                <PageHeader title={userName} backUrl />

                {/* Scrollable content area */}
                <View className="flex-1">
                    <FlatList
                        ref={flatListRef}
                        data={messageData?.messages}
                        keyExtractor={(item) => item.id}
                        refreshing={true}
                        renderItem={({ item }) => (
                            <Animated.View entering={FadeInDown.duration(300)}>
                                <Conversation message={item} currentUserId={item?.sender_id === currentUserId} />
                            </Animated.View>
                        )}
                        refreshControl={
                            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
                        }
                        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 14 }}
                        showsVerticalScrollIndicator={false}
                        invertStickyHeaders={true}
                    />
                    <SafeAreaView />
                    <MessageInput onhandleSend={handleSend} />
                </View>
            </View>
        </CustomSafeAreaView>
    );
};

export default ChatScreen;
