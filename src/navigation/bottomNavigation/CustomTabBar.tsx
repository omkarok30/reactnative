import { View, StyleSheet, LayoutChangeEvent, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, { FadeIn, FadeOut, LinearTransition, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { ICONS } from '../tabConfig';
import { useEffect, useState } from 'react';
import { Colors } from '@/utils/Constants';
import Ionicons from '@expo/vector-icons/Ionicons';
// import { useAuthStore } from '@store/useAuthStore';

const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

const CustomTabBar: React.FC<BottomTabBarProps> = ({
    state,
    descriptors,
    navigation,
}) => {

    // const { user, checkUser } = useAuthStore();

    // useEffect(() => {
    //     checkUser();
    // }, []);

    const [tabBarDimensions, setTabBarDimensions] = useState({ height: 20, width: 100 });

    const tabButtonWidth = tabBarDimensions.width / state.routes.length;
    const tabIndicatorPosition = useSharedValue(0);
    const animatedIndicatorStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: tabIndicatorPosition.value }],
    }));

    const handleTabBarLayout = (event: LayoutChangeEvent) => {
        setTabBarDimensions({
            height: event.nativeEvent.layout.height,
            width: event.nativeEvent.layout.width,
        });
    };

    return (
        <View onLayout={handleTabBarLayout} style={styles.container}>

            {/* AnimatedTabIndicator */}
            < Animated.View style={
                [animatedIndicatorStyle, {
                    position: 'absolute' as const,
                    backgroundColor: Colors.primary,
                    borderRadius: 50,
                    height: 5,
                    width: tabButtonWidth - 5,
                    left: 0,
                    top: 0,
                }]} />

            {/* TabButtons */}
            {state.routes.map((route, index) => {
                if (["_sitemap", "+not-found"].includes(route.name)) return null;

                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;
                isFocused && (tabIndicatorPosition.value = withSpring(tabButtonWidth * index, { duration: 150 }))
                const onPress = () => {
                    tabIndicatorPosition.value = withSpring(tabButtonWidth * index, { duration: 1500 });
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (route.name === "Messages") {
                        navigation.navigate("Messages"); // ✅ Ensure correct screen navigation
                    }
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                return (
                    <AnimatedTouchableOpacity
                        layout={LinearTransition.springify().mass(0.5)}
                        key={route.key}
                        onPress={onPress}
                        style={[
                            styles.tabItem,
                            { backgroundColor: "transparent" },
                            // (!user && !isFocused) && { opacity: 0.5, pointerEvents: 'none' }, // Disable button if not authenticated}
                        ]}
                    >
                        {<Ionicons name={ICONS[route.name] as keyof typeof Ionicons.glyphMap} size={isFocused ? 30 : 28} color={isFocused ? Colors.primary : Colors.gray} style={{ fontWeight: 'bold' }} />}
                        {!isFocused && (
                            <Animated.Text
                                entering={FadeIn.duration(200)}
                                exiting={FadeOut.duration(200)}
                                className="text-xs font-medium text-gray-500"
                            >
                                {label as string}
                            </Animated.Text>
                        )}
                    </AnimatedTouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 12,
        // ✅ iOS Shadow  
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 }, // Moves shadow **above** the tab bar
        shadowOpacity: 0.3,
        shadowRadius: 10,

        // ✅ Android Shadow  
        elevation: 15, // Higher elevation for more visible shadow
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CustomTabBar;
