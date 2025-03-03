import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LAST_ROUTE_KEY = "last_visited_route";

export const useRoutePersistence = () => {
    const [lastRoute, setLastRoute] = useState<string | null>(null);

    // Load last route from storage
    useEffect(() => {
        const loadLastRoute = async () => {
            try {
                const storedRoute = await AsyncStorage.getItem(LAST_ROUTE_KEY);
                if (storedRoute) {
                    setLastRoute(storedRoute);
                }
            } catch (error) {
                console.error("Failed to load last route:", error);
            }
        };

        loadLastRoute();
    }, []);

    // Save route to storage
    const saveRoute = async (route: string) => {
        try {
            await AsyncStorage.setItem(LAST_ROUTE_KEY, route);
            setLastRoute(route);
        } catch (error) {
            console.error("Failed to save route:", error);
        }
    };

    return { lastRoute, saveRoute };
};
