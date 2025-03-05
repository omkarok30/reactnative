import { FC, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { useAuthStore } from "../store/useAuthStore"; 
import BottomTabsNavigator from "./bottomNavigation/BottomTabsNavigator";
import LoginScreen from "@/features/auth/LoginScreen";
import RegisterScreen from "@/features/auth/RegisterScreen";
import ChatScreen from "@/features/ChatScreen";
import AccountScreen from "@/features/accounts/AccountScreen";
import ProfileInfoScreen from "@/features/accounts/ProfileInfoScreen";
import Notifications from "@/features/accounts/Notifications";
import Privacy from "@/features/accounts/Privacy";
import PaymentMethods from "@/features/accounts/PaymentMethods";
import { useAuthStore } from "@/store/useAuthStore";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "@/utils/NavigationUtils";
import { Colors } from "@/utils/Constants";
import AuthLayout from "@/features/auth/AuthLayout";
import AddServices from "@/features/Publications/AddServices";
import MyPublications from "@/features/Publications/MyPublications";

const Stack = createNativeStackNavigator();

const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
);

const Navigation: FC = () => {
    const { logout, user, session } = useAuthStore();
    // useEffect(() => { checkUser() }, []);
    return (
        <NavigationContainer ref={navigationRef}>
            {/* Main Stack */}
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main" component={BottomTabsNavigator} />
                <Stack.Screen
                    name="Chat"
                    component={ChatScreen}
                    options={({ route }) => ({
                        title: `Chat with ${(route.params as { userName: string })?.userName ?? "Unknown"}`,
                        animation: 'slide_from_right',
                        gestureDirection: 'horizontal'
                    })}
                />
                {/* <Stack.Screen name="AccountScreen" component={AccountScreen} /> */}
                <Stack.Screen name="Profile" component={ProfileInfoScreen} />
                <Stack.Screen name="Notifications" component={Notifications} />
                <Stack.Screen name="Privacy" component={Privacy} />
                <Stack.Screen name="Payments" component={PaymentMethods} />
                <Stack.Screen name="Addservice" component={AddServices} />
                <Stack.Screen name="MyPublication" component={MyPublications} />

                {/* Auth Screens as Modal */}
                <Stack.Screen
                    name="LoginScreen"
                    component={AuthLayout}
                    options={{
                        presentation: "modal",
                        headerShown: true,
                        headerTitle: 'Welcome',
                        headerStyle: {
                            backgroundColor: Colors.primary,
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
                    }}
                />
                {/* <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                    options={{
                        presentation: "modal", headerShown: true,
                        headerStyle: {
                            backgroundColor: Colors.primary,
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
                    }}
                /> */}
            </Stack.Navigator>
        </NavigationContainer>


    );
};

export default Navigation;
