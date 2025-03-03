import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, useWindowDimensions } from 'react-native';
import { TabView, TabBar, SceneMap, Route } from 'react-native-tab-view';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { Colors } from '@/utils/Constants';
import { CustomScrollView } from '@/components/global/CustumScrollView';

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
    login: LoginScreen,
    register: RegisterScreen,
});
const routes = [
    { key: 'login', title: 'Login' },
    { key: 'register', title: 'Register' },
];

const renderTabBar = (props: any) => (
    <TabBar
        {...props}
        style={styles.tabBar}
        indicatorStyle={styles.indicator}
        tabStyle={styles.tab}
        renderLabel={({ route }: { route: Route }) => (
            <Text style={[
                styles.label,
            ]}>
                {route.title}
            </Text>
        )}
        activeColor={Colors.white}
    />
);

const AuthLayout = () => {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

    return (
        <CustomScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} >
            <View style={styles.container}>
                <TabView
                    navigationState={{ index, routes }}
                    swipeEnabled={false}
                    renderScene={renderScene}
                    renderTabBar={renderTabBar}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                />
            </View>
        </CustomScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 16, // Space left 8 from screen window
        backgroundColor: Colors.primary
    },
    tabBar: {
        backgroundColor: 'transparent',
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
        backgroundColor: '#fff',
        borderRadius: 12,
        marginVertical: 4,
        marginHorizontal: 4,
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

export default AuthLayout;