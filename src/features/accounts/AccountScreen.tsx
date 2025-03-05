import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { settings } from "@/utils/dummyData";
import {
  Alert,
  Animated,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MIcon from "@expo/vector-icons/MaterialIcons";
import { useCallback, useEffect, useRef, useState } from "react";
import { navigate, push, resetAndNavigate } from "@/utils/NavigationUtils";
import CustomSafeAreaView from "@/components/global/CustomSafeView";
import { PageHeader } from "@/components/layout/PageHeader";
import { FadeInDown } from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import { H4 } from "@/components/ui/typography";
import SettingsItem from "@/components/account/SettingsItem";
import SystemAppearance from "@/components/account/SystemSetting";
import { useAuthStore } from "@/store/useAuthStore";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";



const AccountScreen = () => {
  const bottomInset = useBottomTabBarHeight()
  const { logout, user, session } = useAuthStore();
  // console.log('user', user)
  // useEffect(() => { checkUser() }, []);

  return (
    <CustomSafeAreaView style={{ flex: 1 }}>
      {/* <PageHeader title="Profile" /> */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: bottomInset + 20 }}>

        <View className="px-4 flex-1">
          <View className="flex flex-row justify-center">
            <View className="flex flex-col items-center mt-5">
              <View className="relative">
                <Image
                  source={require("@assets/images/avatar.png")}
                  className="size-28 relative rounded-full"
                />
                {!(!user || !session) && <TouchableOpacity className="absolute bottom-0 right-2 bg-blue-600 p-1 rounded-md">
                  <MIcon name="edit-square" size={16} style={{ color: 'white' }} />
                </TouchableOpacity>}
              </View>
              {!(!user || !session) && <View>
                <Text className="text-xl font-bold mt-2 leading-tight">{"Omkar Khatavkar"}</Text>
                <Text className="text-gray-500 text-center">{"test@gmail.com"}</Text>
              </View>}
            </View>
          </View>

          {!(!user || !session) && (<><View className="flex flex-col mt-5 bg-white p-4 rounded-xl">
            <SettingsItem icon={"wallet-outline"} title="Payments" index={2} />
          </View>

            <View className="w-full h-[2px] bg-gray-200 my-4 flex-1" />

            <View className="flex flex-col border-t pt-5 bg-white p-4 rounded-xl border-gray-200">
              {settings.slice(2).map((item, index) => (
                <SettingsItem key={index} {...item} index={index + 2} />
              ))}
            </View>

            <View className="w-full h-[2px] bg-gray-200 my-4 flex-1" />

            <SystemAppearance /></>)}

          <View className="flex flex-col border-gray-400 mt-10 mb-8">

            {(!user || !session) ? <Button size='lg' onPress={() => navigate('LoginScreen')}>
              <Text className="text-lg text-white">Login</Text>
            </Button>
              :
              <Button variant='destructive' className="flex-row gap-1 items-center" onPress={() => logout()}>
                <Ionicons name="log-out-outline" size={24} style={{ color: 'white' }} />
                <Text>Logout</Text>
              </Button>}
          </View>
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

export default AccountScreen;