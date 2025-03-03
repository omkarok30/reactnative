import { View, Text } from 'react-native'
import React from 'react'
import { Message } from '@/types/conversations';
import { cn } from '@/lib/utils';
import { P } from '../ui/typography';

interface MessageListProps {
    message: Message;
    currentUserId: string | null;
}

const Conversation = ({ message, currentUserId }: MessageListProps) => {

    return (
        <View className={cn("flex", currentUserId ? "items-end" : "items-start")}>
            <View
                className={cn(
                    "relative max-w-[80%] rounded-2xl px-4 py-2 shadow-sm",
                    currentUserId
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-muted text-foreground rounded-tl-none dark:bg-accent"
                )}
            >
                <Text className="text-sm whitespace-pre-wrap break-words text-left">{message.content}</Text>
                <View className="flex flex-row items-center justify-end gap-2">
                    <Text
                        className={cn(
                            "text-xs",
                            currentUserId ? "text-primary-foreground/70" : "text-muted-foreground"
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