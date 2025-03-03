import React, { useState, forwardRef } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useNavigationState } from "@react-navigation/native";
import { useRoutePersistence } from "@navigation/useRoutePersistence";
import { navigate } from "@utils/NavigationUtils";

const PullToRefreshWrapper = forwardRef<ScrollView, { children: React.ReactNode }>(
    ({ children, ...props }, ref) => {
        const currentRoute = useNavigationState((state) => state.routes[state.index]?.name);
        const { lastRoute, saveRoute } = useRoutePersistence();

        const [refreshing, setRefreshing] = useState(false);

        const onRefresh = async () => {
            setRefreshing(true);
            if (currentRoute) await saveRoute(currentRoute); // Save current route

            setTimeout(async () => {
                setRefreshing(false);

                if (lastRoute && typeof lastRoute === "string") {
                    navigate(lastRoute);
                }
            }, 1000);
        };

        return (
            <ScrollView
                ref={ref} // Forward ref
                automaticallyAdjustsScrollIndicatorInsets
                contentInsetAdjustmentBehavior="automatic"
                contentInset={{ bottom: 0 }}
                scrollIndicatorInsets={{ bottom: 0 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                {...props} // Spread additional props
            >
                {children}
            </ScrollView>
        );
    }
);

export default PullToRefreshWrapper;
