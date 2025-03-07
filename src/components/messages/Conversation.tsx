import { View, Text } from 'react-native'
import React from 'react'
import { Message } from '@/types/conversations';
import { cn } from '@/lib/utils';
import { P } from '../ui/typography';

interface MessageListProps {
    message: Message;
    currentUserId: boolean;
}

const Conversation = ({ message, currentUserId }: MessageListProps) => {
    return (
        <View className={cn("flex-row", currentUserId ? "justify-end" : "justify-start")}>
            <View
                className={cn(
                    "relative max-w-[80%] rounded-2xl px-4 py-2 shadow-sm mb-3",
                    currentUserId
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-background text-foreground rounded-tl-none dark:bg-accent"
                )}
            >
                <Text className={cn("text-sm whitespace-pre-wrap break-words text-left font-medium", currentUserId ? "text-white" : "text-gray-600")}>{message.content}</Text>
                <View className="flex flex-row items-center justify-end gap-2">
                    <Text
                        className={cn(
                            "text-xs",
                            currentUserId ? "text-white/70" : "text-muted-foreground"
                        )}
                    >
                        {new Date(message.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                    </Text>

                    {!message.read && !currentUserId && (
                        <View className="flex items-center justify-center bg-primary rounded-full w-5 h-5">
                            <Text className="text-xs font-medium text-primary-foreground">1</Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}

export default Conversation