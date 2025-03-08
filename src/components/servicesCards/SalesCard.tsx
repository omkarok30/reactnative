
import React from "react";
import { View, Image, TouchableOpacity, Pressable } from "react-native";
import { H4, P } from "../ui/typography";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/utils/Constants";
import { screenWidth } from "@/utils/Scaling";

export interface SalesCardProps {
    title: string;
    description: string;
    price: string;
    rating: number;
    image: string;
    seller: string;
    category?: string;
    subcategory?: string;
    isBlurred?: boolean;
    saleId?: string;
}

const SalesCard: React.FC<SalesCardProps> = ({
    title,
    description,
    price,
    rating,
    image,
    seller,
    category,
    subcategory,
    isBlurred = false,
    saleId
}) => {

    const handleReserveClick = () => {
        console.log('🎯 [SaleCardActions] Reserve button clicked for sale:', saleId);
        // onReserveClick();
    };

    const handleContactClick = () => {
        console.log('🎯 [SaleCardActions] Contact button clicked for sale:', saleId);
        // onContactClick();
    };
    // Pour les ventes de démonstration, les boutons sont activés mais déclenchent un message différent
    const isDemoSale = !saleId;
    return (
        <Pressable>
            <View className="border-gray-400 border-1 rounded-2xl shadow-xl shadow-gray-400 mx-4 mb-6 pb-1 bg-white">
                {/* Service Image */}
                <View className="relative">
                    <Image
                        source={{ uri: image }} // Replace with actual image URL 
                        style={{ height: screenWidth * 0.5 }}
                        className="rounded-tl-2xl rounded-tr-2xl"
                    />
                    {category && subcategory && (
                        <View className="absolute h-full w-full bg-black/20 rounded-tl-2xl rounded-tr-2xl p-2 flex-col justify-end">
                            {/* Tags */}
                            <View className="flex-row flex-wrap mt-1">
                                <Text
                                    className="bg-primary text-white px-3 py-2 text-xs font-semibold rounded-full first-line:marker:font-medium"
                                >
                                    {category}
                                </Text>
                                <Text
                                    className="bg-primary text-white px-3 py-2 text-xs font-semibold rounded-full first-line:marker:font-medium"
                                >
                                    {subcategory}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
                <View className="px-4">
                    <View className="flex flex-row items-center bg-gray-200 px-2 py-1 rounded-full absolute top-4 right-3">
                        <Ionicons name="star" size={16} color={Colors.primary} />
                        <Text className="text-sm font-semibold ml-1 text-primary" >
                            {rating.toFixed(1)}
                        </Text>
                    </View>
                    {/* Title */}
                    <H4 className="mt-3">{title}</H4>

                    {/* Description */}
                    <P className="text-gray-600 mt-2 font-normal" numberOfLines={2}>
                        {description}
                    </P>

                    {/* Provider Info */}
                    {seller && <View className="flex-row items-center mt-3 gap-2">
                        <Image
                            source={require("@assets/images/avatar.png")}
                            className="w-10 h-10 rounded-full"
                        />
                        <Text className="text-gray-800 text-sm font-semibold">{seller}</Text>
                    </View>}
                </View>

                {/* Footer */}
                <View className="flex-row items-center justify-between mt-4 px-4 border-t border-gray-200 py-2">
                    {/* Price */}
                    <Text className="text-primary text-lg font-semibold">{price}</Text>

                    {/* Buttons */}
                    <View className="flex-row items-center gap-x-2">
                        <Button variant='outline' className="border-primary bg-primary/10">
                            <Ionicons name="chatbubbles-outline" size={18} color={Colors.primary} />
                        </Button>

                        {/* Reserve Button */}
                        <Button className="leading-none">
                            <Text className="text-white leading-tight">Reserve</Text>
                        </Button>
                    </View>
                </View>
            </View>
        </Pressable >
    );
};

export default SalesCard;
