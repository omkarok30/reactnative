import AccountScreen from "@/features/accounts/AccountScreen";
import Notifications from "@/features/accounts/Notifications";
import PaymentMethods from "@/features/accounts/PaymentMethods";
import Privacy from "@/features/accounts/Privacy";
import ProfileInfoScreen from "@/features/accounts/ProfileInfoScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AccountStack = createNativeStackNavigator();

const accountRoutes = [
    {
        path: "AccountScreen",
        name: "Account",
        component: AccountScreen,
    },
    {
        path: "profile",
        name: "Profile",
        component: ProfileInfoScreen,
    },
    {
        path: "notifications",
        name: "Notifications",
        component: Notifications,
    },
    {
        path: "privacy",
        name: "Privacy",
        component: Privacy,
    },
    {
        path: "payment-methods",
        name: "PaymentMethods",
        component: PaymentMethods,
    },
];

export function AccountStackNavigator() {
    return (
        <AccountStack.Navigator screenOptions={{ headerShown: false }}>
            {accountRoutes.map((route) => (
                <AccountStack.Screen
                    key={route.name}
                    name={route.name}
                    component={route.component}
                />
            ))}
        </AccountStack.Navigator>
    );
}