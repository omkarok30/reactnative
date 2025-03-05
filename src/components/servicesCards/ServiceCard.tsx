
import React from "react";
import { View, Image, TouchableOpacity, Pressable } from "react-native";
import { H4, P } from "../ui/typography";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/utils/Constants";
import { screenWidth } from "@/utils/Scaling";

interface ServiceCardProps {
    title: string;
    image?: string;
    tags?: string[]; // Category object
    description: string;
    providerName?: string;
    providerImage?: string | null | undefined;
    price: string;
    rating?: number;
    onChatPress?: () => void;
    onReservePress?: () => void;
    onPress?: () => void;
    style?: object,
    topServiceCard?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
    title,
    image,
    tags,
    description,
    providerName,
    providerImage,
    price,
    onChatPress,
    onReservePress,
    onPress,
    style,
    topServiceCard
}) => {
    return (
        <Pressable onPress={onPress} style={[style]}>
            <View className="border-gray-400 border-1 rounded-2xl shadow-xl shadow-gray-400 mx-4 mb-6 pb-1 bg-white">
                {/* Service Image */}
                <Image
                    source={{ uri: image }} // Replace with actual image URL 
                    style={{ height: screenWidth * 0.5 }}
                    className="rounded-tl-2xl rounded-tr-2xl"
                />
                <View className="px-4">
                    {/* Title */}
                    <H4 className="mt-3">{title}</H4>

                    {/* Tags */}
                    <View className="flex-row flex-wrap mt-1">
                        {tags?.map((tag, index) => (
                            <Text
                                key={index}
                                className="bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded-full mr-2 mb-2 font-medium"
                            >
                                {tag}
                            </Text>
                        ))}
                    </View>

                    {/* Description */}
                    <P className="text-gray-600 mt-2 font-normal" numberOfLines={2}>
                        {description}
                    </P>

                    {/* Provider Info */}
                    <View className="flex-row items-center mt-3 gap-2">
                        <Image
                            source={require("@assets/images/avatar.png")}
                            className="w-10 h-10 rounded-full"
                        />
                        <Text className="text-gray-800 text-sm font-semibold">{providerName}</Text>
                    </View>
                </View>

                {/* Footer */}
                <View className="flex-row items-center justify-between mt-4 px-4 border-t border-gray-200 py-2">
                    {/* Price */}
                    <Text className="text-primary text-lg font-semibold">{price}</Text>

                    {/* Buttons */}
                    <View className="flex-row items-center gap-x-2">
                        {/* Chat Button */}
                        <Button variant='outline' size={`${topServiceCard ? "sm" : "default"}`} onPress={onChatPress} className="border-primary bg-primary/10">
                            <Ionicons name="chatbubbles-outline" size={18} color={Colors.primary} />
                        </Button>

                        {/* Reserve Button */}
                        <Button onPress={onReservePress} size={`${topServiceCard ? "sm" : "default"}`} className="leading-none">
                            <Text className="text-white leading-tight">Reserve</Text>
                        </Button>
                    </View>
                </View>
            </View>
        </Pressable >
    );
};

export default ServiceCard;
