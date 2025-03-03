import { Text } from "@/components/ui/text";
import { openLoginModal } from "@/utils/NavigationUtils";
import { FC, useEffect } from "react";
import { Animated, View } from "react-native";
import SearchBar from "./SearchBar";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import Ionicons from "@expo/vector-icons/Ionicons";

const Header_Max_Height = 240;
const Header_Min_Height = 120;
const Scroll_Distance = Header_Max_Height - Header_Min_Height;

const Header: FC<{ showNotice: () => void; value?: Animated.Value }> = ({ showNotice, value }) => {
  const user = useAuthStore((state) => (state?.user));

  const animatedValue = value ?? new Animated.Value(0);
  const animatedHeaderHeight = animatedValue.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Header_Max_Height, Header_Min_Height],
    extrapolate: 'clamp',
  });

  const animatedHeaderColor = animatedValue.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: ['#1A1F2C', '#6b7280'],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        { paddingLeft: 15, paddingRight: 15, paddingTop: 20 },
        {
          height: animatedHeaderHeight,
          backgroundColor: animatedHeaderColor,
        },
      ]}
      className="bg-blue-200 px-4 pb-8 rounded-bl-3xl rounded-br-3xl flex justify-center">
      {/* <View className="bg-blue-200 px-4 pb-8 rounded-bl-3xl rounded-br-3xl"> */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row gap-1">
          <View className="flex-col items-start justify-center">
            <Text className="text-white leading-none text-sm">
              Good Morning
            </Text>
            <Text className="text-lg text-white leading-none font-bold">
              Omkar Khatavkar
            </Text>
          </View>
        </View>
        <View className="flex-row items-center gap-4">
          {user ? <Ionicons name="notifications-outline" size={24} color='#FFF' />
            : <Button size='sm' className="flex-row" onPress={() => openLoginModal("LoginScreen")}>
              <Text className="text-white">Login</Text>
            </Button>}
          {/* <Pressable onPress={() => navigate('AccountScreen')}>
            <Ionicons name="person-circle-outline" size={36} color="#333" />
          </Pressable> */}
        </View>
      </View>

      <SearchBar />
      {/* </View> */}
    </Animated.View>
  )
}

export default Header;