import { Text } from "@/components/ui/text";
import { Colors } from "@/utils/Constants";
import { screenHeight } from "@/utils/Scaling";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";

type Product = {
    title: string;
    description: string;
    price: string;
    rating: number;
    image: any; // `require()` returns an imported image module, usually `any` type in React Native.
    seller: string;
    onPress: () => void
};

export const FeaturedCard = ({
    title,
    description,
    price,
    rating,
    image,
    seller,
    onPress
}: Product) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex flex-col items-start h-80 relative overflow-hidden"
        >
            <ImageBackground
                source={require("@assets/images/card-gradient.png")}
                className="absolute h-full w-full top-0 left-0"
            >
                {/* Overlay */}
                <View className="absolute top-0 left-0 w-full h-full bg-black/70 rounded-2xl" />

                {/* Main Image */}
                <Image source={{ uri: image }} className="size-full rounded-2xl" />
            </ImageBackground>
            
            <View className="flex flex-row items-center bg-primary/80 px-3 py-1.5 rounded-full absolute top-5 left-5">
                <Text className="text-sm font-semibold ml-1 text-white" >
                    Soldby: {seller}
                </Text>
            </View>

            <View className="flex flex-row items-center bg-primary/80 px-3 py-1.5 rounded-full absolute top-5 right-5">
                <Ionicons name="star-outline" size={16} />
                <Text className="text-sm font-semibold ml-1 text-blue-700" >
                    {rating}
                </Text>
            </View>

            <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
                <Text className="text-xl text-white font-bold">
                    {title}
                </Text>
                <Text className="text-base text-white font-medium" >
                    {description}
                </Text>

                <View className="flex flex-row items-center justify-between w-full mt-4">
                    <Text className="text-xl text-white font-semibold" >
                        ${price}
                    </Text>
                    <Ionicons name="heart" size={26} color={Colors.heart} />
                </View>
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    gradient: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 100, // Adjust as needed
        borderRadius: 16, // Equivalent to `rounded-2xl`
    },
});
