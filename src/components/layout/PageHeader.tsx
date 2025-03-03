
import { cn } from "@/lib/utils";
import { goBack } from "@/utils/NavigationUtils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, View } from "react-native";
import { H4 } from "../ui/typography";

interface PageHeaderProps {
  title: string;
  backUrl?: boolean;
  className?: string;
}

export const PageHeader = ({ title, backUrl, className }: PageHeaderProps) => {

  return (
    <View
      className={cn("bg-white flex-row items-center justify-between gap-4 p-4 shadow-lg", className)}
    // style={{ paddingTop: (StatusBar.currentHeight ?? 0) + 10 }} // Fallback to 0 if undefined
    >
      <View className="flex-row items-center gap-3">
        {backUrl && <TouchableOpacity
          onPress={() => goBack()} className="bg-gray-200 p-3 rounded-full">
          <Ionicons name="arrow-back-outline" size={16} color="black" />
        </TouchableOpacity>}
        <H4 className="font-semibold text-foreground">
          {title}
        </H4>
      </View>

      {title?.toLocaleLowerCase() === "profile" && <Ionicons name="notifications" size={22} />}
    </View>
  );
};