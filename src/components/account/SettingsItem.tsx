import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { navigate } from '@/utils/NavigationUtils';

interface SettingsItemProp {
    icon: string;
    title: string;
    onPress?: () => void;
    textStyle?: string;
    showArrow?: boolean;
    index?: number;
}

const SettingsItem = ({
    icon,
    title,
    onPress,
    textStyle,
    index = 1,
    showArrow = true,
}: SettingsItemProp) => {

    const [key, setKey] = useState(0);
    // comment this if you don't want to animate everytime you open this screen
    useFocusEffect(
        useCallback(() => {
            setKey((prevKey) => prevKey + 1);
        }, [])
    );
    return (
        <TouchableOpacity
            onPress={() => navigate(title)}
        >
            <Animated.View
                entering={FadeInDown.delay(index * 80)
                    .duration(800)
                    .damping(12)
                    .springify()}
                key={`${key}-${index}`}>
                <View
                    className="flex flex-row items-center justify-between py-3">
                    <View className="flex flex-row items-center gap-3">
                        <View className="bg-primary/50 rounded-full p-2">
                            <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={24} style={{ fontWeight: '900' }} />
                        </View>
                        <Text className={`text-ls font-semibold text-black-300 ${textStyle}`}>
                            {title}
                        </Text>
                    </View>

                    {showArrow && <Ionicons name="arrow-forward-outline" size={18} />}
                </View>
            </Animated.View>
        </TouchableOpacity>
    )
};

export default SettingsItem;