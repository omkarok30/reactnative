import { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabsNavigator from "./bottomNavigation/BottomTabsNavigator";
import LoginScreen from "@/features/auth/LoginScreen";
import RegisterScreen from "@/features/auth/RegisterScreen";
import ChatScreen from "@/features/message/ChatScreen";
import ProfileInfoScreen from "@/features/accounts/ProfileInfoScreen";
import Notifications from "@/features/accounts/Notifications";
import Privacy from "@/features/accounts/Privacy";
import PaymentMethods from "@/features/accounts/PaymentMethods";
import AddServices from "@/features/Publications/AddServices";
import MyPublications from "@/features/Publications/MyPublications";
import CategoryScreen from "@/features/CategoryScreen";
import { Colors } from "@/utils/Constants";
import AuthLayout from "@/features/auth/AuthLayout";
import { navigationRef } from "@/utils/NavigationUtils";
import SearchFilterScreen from "@/features/SearchFilterScreen";
import useUnreadMessages from "@/hooks/conversations/useUnreadMessages";
import { useAuthStore } from "@/store/useAuthStore";
import AddSales from "@/features/Publications/AddSales";

const Stack = createStackNavigator();

const Navigation: FC = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Group>
                    <Stack.Screen name="Main" component={BottomTabsNavigator} />
                    <Stack.Screen
                        name="Chat"
                        component={ChatScreen}
                        options={{
                            animation: "slide_from_right",
                        }}
                    />
                    <Stack.Screen name="Profile" component={ProfileInfoScreen} />
                    <Stack.Screen name="Notifications" component={Notifications} />
                    <Stack.Screen name="Privacy" component={Privacy} />
                    <Stack.Screen name="Payments" component={PaymentMethods} />
                    <Stack.Screen name="Addservice" component={AddServices} />
                    <Stack.Screen name="Addsale" component={AddSales} />
                    <Stack.Screen name="MyPublication" component={MyPublications} />

                    <Stack.Screen
                        name="Category"
                        component={CategoryScreen}
                        options={{
                            headerShown: true,
                            headerTitle: 'Select category',
                            headerStyle: { backgroundColor: Colors.primary },
                            headerTintColor: "#fff",
                            headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
                            animation: 'slide_from_right', cardStyle: {
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                overflow: "hidden",
                            },
                        }}
                    />
                </Stack.Group>
                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    {/* Auth Screens */}
                    <Stack.Screen
                        name="LoginScreen"
                        component={AuthLayout}
                        options={{
                            headerShown: true,
                            headerTitle: "Welcome",
                            headerStyle: { backgroundColor: Colors.primary },
                            headerTintColor: "#fff",
                            headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
                        }}
                    />
                    <Stack.Screen
                        name="Search"
                        component={SearchFilterScreen}
                        options={{
                            presentation: "transparentModal",
                            headerShown: false,
                            cardStyle: {
                                marginTop: 50,  // 👈 Creates a gap at the top
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                overflow: "hidden",
                            },
                            headerTransparent: true,
                            gestureEnabled: false,
                        }}
                    />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
