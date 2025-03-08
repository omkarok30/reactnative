import { ActivityIndicator, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { Colors } from '@/utils/Constants';
import { Route, SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { PublicationServiceCard } from './PublicationServiceCard';
import { screenWidth } from '@/utils/Scaling';
import { Text } from '@/components/ui/text';
import { useAuthStore } from '@/store/useAuthStore';
import { useServices } from '@/hooks/publication/useServices';
import { useSales } from '@/hooks/publication/useSales';

const ServiceList = () => {
    const user = useAuthStore((state) => state.user);

    // Ensure `user?.id` is valid before calling hooks
    const { services = [], loading: servicesLoading, handleDelete: handleServiceDelete } = useServices(user?.id || "");
    const { sales = [], loading: salesLoading, handleDelete: handleSaleDelete } = useSales(user?.id || "");

    const [index, setIndex] = useState(0);
    // Define scene rendering function
    const renderScene = ({ route }: { route: { key: string } }) => {
        switch (route.key) {
            case "services":
                return <PublicationServiceCard items={services} onDelete={handleServiceDelete} />;
            case "ventes":
                return <PublicationServiceCard items={sales} onDelete={handleSaleDelete} />;
            default:
                return null;
        }
    };

    if (salesLoading || servicesLoading) {
        return <View className='py-4 flex justify-center items-center flex-1'>
            <ActivityIndicator size='large' color={Colors.primary} />
            <Text>Chargement des services en cours...</Text>
        </View>
    }

    return (
        <TabView
            navigationState={{ index, routes }}
            swipeEnabled={false}
            renderScene={renderScene} // Use a function instead of SceneMap
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{ width: screenWidth }}
        />
    );
};

const routes = [
    { key: "services", title: "Services" },
    { key: "ventes", title: "Ventes" },
];

const renderTabBar = (props: any) => (
    <TabBar
        {...props}
        style={styles.tabBar}
        indicatorStyle={styles.indicator}
        tabStyle={styles.tab}
        renderLabel={({ route }: { route: { title: string } }) => (
            <Text style={styles.label}>{route.title}</Text>
        )}
        activeColor={Colors.primary}
        inactiveColor={Colors.text}
    />
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 16, // Space left 8 from screen window
        backgroundColor: Colors.primary
    },
    tabBar: {
        backgroundColor: '#fff',
        borderRadius: 15, // Rounded border
        marginVertical: 10,
        elevation: 0, // Remove shadow on Android
        shadowOpacity: 0, // Remove shadow on iOS
        overflow: 'hidden',
    },
    tab: {
        borderRadius: 16,
    },
    indicator: {
        backgroundColor: "#FFF",
        borderWidth: 4,
        borderColor: Colors.primary,
        borderRadius: 16,
        height: '100%',
    },
    scene: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontWeight: '600',
        fontSize: 14,
    },
});
export default ServiceList