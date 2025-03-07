import React, { useEffect, useRef, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons';
import TabNavigator from "./CustomTabBar";
import { ICONS, SCREENS } from "../tabConfig";
import { Alert, BackHandler } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { goBack, navigate, navigationRef, prepareNavigation } from "@/utils/NavigationUtils";
import { useAuthStore } from "@/store/useAuthStore";
import useUnreadMessages from "@/hooks/conversations/useUnreadMessages";

const Tab = createBottomTabNavigator();
type BottomTabParams = {
    Main: { unreadCount?: number };
};

const BottomTabsNavigator: React.FC = () => {
    const user = useAuthStore(state => state.user)
    const { unreadCount } = useUnreadMessages(user?.id);
    const route = useRoute<RouteProp<BottomTabParams>>();

    useEffect(() => {
        const backAction = () => {
            if (navigationRef.canGoBack()) {
                goBack();
            } else {
                navigate("Reserve"); // 👈 Default back to Home tab if no history
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, [route]);

    return (
        <Tab.Navigator
            tabBar={(props) => <TabNavigator {...props} user={user} />}
            screenOptions={{
                headerShown: false,
                animation: "fade",
            }}
            initialRouteName="Reserve"
        >
            {Object.keys(SCREENS).map((screen) => (
                <Tab.Screen
                    key={screen}
                    name={screen}
                    component={SCREENS[screen]}
                    options={{
                        tabBarIcon: ({ color, size }) => <Ionicons name={(ICONS[screen] as keyof typeof Ionicons.glyphMap)} size={size} color={color} />,
                        tabBarBadge: screen === "Messages" ? unreadCount : undefined,
                        tabBarBadgeStyle: {
                            color: "black",
                            backgroundColor: "yellow",
                        },
                        // tabBarStyle: screen === "Messages" && { display: 'none' }
                    }}
                />
            ))}

        </Tab.Navigator>
    );
};

export default BottomTabsNavigator;
