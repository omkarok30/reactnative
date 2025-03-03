import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { Text } from '../ui/text';
import { Colors } from '@/utils/Constants';
import { ventes } from '@/utils/dummyData';
import Animated, { FadeInRight } from 'react-native-reanimated';

const VentesCategory = () => {
    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<(React.ElementRef<typeof TouchableOpacity> | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelectedCategory = (index: number) => {
        const selected = itemRef.current[index];
        setActiveIndex(index);

        selected?.measure((x) => {
            scrollRef.current?.scrollTo({ x: x - 14, y: 0, animated: true });
        })
    }
    return (
        <FlatList
            data={ventes}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.itemswrapper}
            renderItem={({ item, index }) => (
                <Animated.View
                    entering={FadeInRight.delay(index * 100).duration(1000).damping(12).springify()}
                >
                    <TouchableOpacity
                        ref={(el) => (itemRef.current[index] = el)}
                        style={[styles.item, {
                            borderColor: activeIndex === index ? Colors.primary : Colors.border,
                            backgroundColor: activeIndex === index ? Colors.primary_opacity : Colors.white,
                        }]}
                        onPress={() => handleSelectedCategory(index)}
                    >
                        <Text className={`${activeIndex === index ? 'text-black' : 'text-gray-600'} text-sm font-medium`}>{item.name}</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}
        />
    )
}
const styles = StyleSheet.create({
    itemswrapper: {
        // backgroundColor: Colors.white,
        gap: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
    item: {
        borderWidth: 2,
        borderColor: Colors.border,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    }
})

export default VentesCategory;