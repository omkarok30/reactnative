import React, { useEffect, useRef, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from '@expo/vector-icons/Ionicons';
import TabNavigator from "./CustomTabBar";
import { ICONS, SCREENS } from "../tabConfig";
import { Alert, BackHandler } from "react-native";
import { useRoute } from "@react-navigation/native";
import { goBack, navigate, navigationRef, prepareNavigation } from "@/utils/NavigationUtils";

const Tab = createBottomTabNavigator();

const BottomTabsNavigator: React.FC = () => {
    const route = useRoute();

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
            tabBar={(props) => <TabNavigator {...props} />}
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
                        tabBarBadge: screen === "Messages" ? 2 : undefined,
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
