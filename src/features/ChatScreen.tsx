import CustomSafeAreaView from "@/components/global/CustomSafeView";
import { PageHeader } from "@/components/layout/PageHeader";
import Conversation from "@/components/messages/Conversation";
import MessageInput from "@/components/messages/MessageInput";
import { Text } from "@/components/ui/text";
import { P } from "@/components/ui/typography";
import { conversations, currentUserId } from "@/utils/dummyData";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useRef } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Define inline type for route params
type ChatScreenRouteProp = RouteProp<{ Chat: { conversationId: string; userName: string } }, "Chat">;

const ChatScreen = () => {
    const route = useRoute<ChatScreenRouteProp>();
    const { conversationId, userName } = route.params ?? {};
    const flatListRef = useRef<FlatList>(null);

    // Find the current conversation
    const messages = conversations.find((c) => c.id === conversationId)?.messages;

    if (!conversationId || !userName) {
        return <View><Text>Error: Missing conversation details</Text></View>;
    }

    return (
        <CustomSafeAreaView>
            <View className="flex-1">
                {/* Sticky header */}
                <PageHeader title={userName} backUrl />

                {/* Scrollable content area */}
                <View className="flex-1 px-4 pb-12">
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <Conversation message={item} currentUserId={currentUserId} />
                        )}
                        // ListHeaderComponent={() => (
                        //     <View className="pt-2 pb-4">
                        //         <Text>Chat with {userName}</Text>
                        //         <Text>Conversation ID: {conversationId}</Text>
                        //     </View>
                        // )}
                        contentContainerStyle={{ paddingVertical: 10 }}
                        showsVerticalScrollIndicator={false}
                        inverted // This keeps the latest messages at the bottom
                    />
                    <SafeAreaView />
                    <MessageInput />
                </View>
            </View>
        </CustomSafeAreaView>
    );
};

export default ChatScreen;
