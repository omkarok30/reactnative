import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar, FlatList } from 'react-native'
import React from 'react'
import { Conversation } from '@/types/conversations';
import { navigate } from '@/utils/NavigationUtils';
import { screenWidth } from '@/utils/Scaling';
import { Colors } from '@/utils/Constants';
import { formatMessageDate } from '@/utils/DateUtils';
import Ionicons from "@expo/vector-icons/Ionicons";

interface ConversationsListProps {
    conversations: Conversation[];
}
const ConversationsList = ({ conversations }: ConversationsListProps) => {

    return (
        <FlatList
            data={conversations}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
                const lastMessage = item.messages[0];
                const participant = item.participants[0]; // Assuming 1-to-1 chat

                return (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => navigate("Chat", { userName: `${participant?.first_name} ${participant?.last_name}`, conversationId: item.id })}
                        style={[
                            styles.userContainer,
                            index % 2 === 0 ? styles.oddBackground : null
                        ]}
                    >
                        {/* Profile Picture & Online Indicator */}
                        <View className='py-3 mr-5'>
                            {/** You can implement an 'isOnline' field in your participants */}
                            {/* {participant.isOnline && <View style={styles.onlineIndicator} />} */}

                            <Image
                                source={participant.profile_picture_url ? { uri: participant.profile_picture_url } : require("@/assets/images/avatar.png")}
                                resizeMode="contain"
                                className='h-[50px] w-[50px] rounded-full'
                            />
                        </View>

                        {/* Conversation Info */}
                        <View style={{ flexDirection: "row", width: screenWidth - 104 }}>
                            <View style={styles.userInfoContainer}>
                                <Text className='text-md font-semibold' style={{ color: Colors.primary }}>{participant.first_name} {participant.last_name}</Text>
                                <Text className='text-gray-500 text-sm'>
                                    {lastMessage ? (lastMessage.content.length > 25 ? lastMessage.content.slice(0, 25) + "..." : lastMessage.content) : ""}
                                </Text>
                            </View>

                            {/* Right Section: Time & Unread Count */}
                            <View style={{ position: "absolute", right: 4, alignItems: "center" }}>
                                <Text className='font-medium text-sm' style={{ color: Colors.primary }}>{lastMessage && formatMessageDate(new Date(lastMessage.created_at))}</Text>

                                {/* Unread Message Badge */}
                                {(item.unreadCount ?? 0) > 0 && (
                                    <TouchableOpacity
                                        style={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: 10,
                                            backgroundColor: Colors.primary,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginTop: 4,
                                        }}
                                    >
                                        <Text style={styles.messageInQueue}>{item.unreadCount}</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            }}
        />

    )
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: Colors.backgroundSecondary,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundSecondary,
        paddingTop: StatusBar.currentHeight,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: Colors.secondary,
        width: screenWidth - 32,
        height: 50,
        marginVertical: 22,
    },
    searchInput: {
        flex: 1,
        height: "100%",
        fontSize: 16,
        color: Colors.backgroundLight,
        marginHorizontal: 12,
    },
    userContainer: {
        width: '100%',
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: Colors.border,
        borderBottomWidth: 1
    },
    userImageContainer: {
        paddingVertical: 15,
        marginRight: 22,
    },
    onlineIndicator: {
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: Colors.primary,
        position: 'absolute',
        top: 14,
        right: 2,
        zIndex: 999,
        borderWidth: 2,
        borderColor: Colors.border
    },
    userImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    userInfoContainer: {
        flexDirection: 'column',
    },
    oddBackground: {
        backgroundColor: Colors.backgroundLight,
    },
    userName: {
        fontSize: 14,
        fontFamily: 'semiBold',
        color: Colors.primary_dark,
        marginBottom: 4
    },
    lastMessageTime: { fontSize: 12, color: Colors.primary_light },
    messageInQueue: {
        fontSize: 12,
        fontFamily: 'regular',
        color: "white",
    }
});

export default ConversationsList