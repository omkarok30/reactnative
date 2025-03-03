import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { PageHeader } from '../../components/layout/PageHeader';
import CustomSafeAreaView from '../../components/global/CustomSafeView';
import { Switch, View } from 'react-native';
import { Text } from '../../components/ui/text';
import { Colors } from '@/utils/Constants';

export default function Notifications() {
    const navigation = useNavigation();
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [pushNotifications, setPushNotifications] = useState(false);
    const [marketingNotifications, setMarketingNotifications] = useState(false);

    return (
        <CustomSafeAreaView style={{ flex: 1 }}>
            <PageHeader backUrl title='Notification' />

            {/* Notification Settings */}
            <View className="px-5 mt-5 dark:bg-gray-800/50 dark:backdrop-blur-xl dark:border-gray-700">
                <View className='bg-white p-4 rounded-xl shadow-lg flex-col gap-4'>
                    {/* Email Notifications */}
                    <View className="flex-row flex-wrap items-center justify-between border-b pb-4 border-gray-200">
                        <View className="space-y-1">
                            <Text className="text-lg font-medium dark:text-white">Notifications par email</Text>
                            <Text className="text-xs text-gray-500 dark:text-gray-400 text-w">Recevoir des notifications par email</Text>
                        </View>
                        <Switch
                            trackColor={{ false: Colors.primary, true: Colors.primary_light }}
                            thumbColor={emailNotifications ? Colors.primary : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            value={emailNotifications}
                            onValueChange={setEmailNotifications}
                            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                        />
                    </View>

                    {/* Push Notifications */}
                    <View className="flex-row flex-wrap items-center justify-between border-b pb-4 border-gray-200">
                        <View className="space-y-1">
                            <Text className="text-lg font-medium dark:text-white">Notifications push</Text>
                            <Text className="text-xs text-gray-500 dark:text-gray-400">Recevoir des notifications push</Text>
                        </View>
                        <Switch
                            trackColor={{ false: Colors.primary, true: Colors.primary_light }}
                            thumbColor={pushNotifications ? Colors.primary : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            value={pushNotifications}
                            onValueChange={setPushNotifications}
                            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                        />
                    </View>

                    {/* Marketing Notifications */}
                    <View className="flex-row flex-wrap items-center justify-between pb-4">
                        <View className="space-y-1">
                            <Text className="text-lg font-medium dark:text-white">Notifications marketing</Text>
                            <Text className="text-xs text-gray-500 dark:text-gray-400">Recevoir des offres et promotions</Text>
                        </View>
                        <Switch
                            trackColor={{ false: Colors.primary, true: Colors.primary_light }}
                            thumbColor={marketingNotifications ? Colors.primary : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            value={marketingNotifications}
                            onValueChange={setMarketingNotifications}
                            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                        />
                    </View>
                </View>
            </View>
        </CustomSafeAreaView>
    );
}
