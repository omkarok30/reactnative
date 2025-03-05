import AccountScreen from "@/features/accounts/AccountScreen";
import ActivityScreen from "@/features/ActivityScreen";
import CategoryScreen from "@/features/CategoryScreen";
import ReserveScreen from "@/features/dashboard/ReserveScreen";
import MessageScreen from "@/features/MessageScreen";
import PublishScreen from "@/features/Publications/PublishScreen";


export const ICONS: Record<string, string> = {
    Messages: "chatbubbles-outline",
    Publish: "add-circle-outline",
    Reserve: "calendar-outline",
    Activity: "analytics-outline",
    Account: "person-circle-outline",
};

export const SCREENS: Record<string, React.ComponentType<any>> = {
    Messages: MessageScreen,
    Publish: PublishScreen,
    Reserve: ReserveScreen,
    Activity: ActivityScreen,
    Account: AccountScreen,
};
