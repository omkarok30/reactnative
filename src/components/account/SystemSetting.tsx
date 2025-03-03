import { View, Text, TouchableOpacity, StyleSheet, Pressable, Platform } from 'react-native'
import React, { useState } from 'react'
import { settings } from '@/utils/dummyData'
import { H4 } from '@/components/ui/typography'
import SettingsItem from '@/components/account/SettingsItem'
import Animated, { FadeInDown } from 'react-native-reanimated'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Switch } from 'react-native-gesture-handler'
import { Colors } from '@/utils/Constants'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const languages = [
    { value: "fr", label: "Français" },
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
];

const SystemAppearance = () => {
    const triggerRef = React.useRef<React.ElementRef<typeof SelectTrigger>>(null);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const insets = useSafeAreaInsets();
    const contentInsets = {
        top: insets.top,
        bottom: Platform.select({ ios: insets.bottom, android: insets.bottom + 24 }),
        left: 12,
        right: 12,
    };

    return (

        <View className="flex flex-col border-t pt-5 bg-white p-4 rounded-xl border-gray-200">
            <TouchableOpacity
                onPress={() => { }}
            >
                <View
                    className="flex flex-row items-center justify-between py-3">
                    <View className="flex flex-row items-center gap-3">
                        <View className="bg-primary/50 rounded-full p-2">
                            <Ionicons name='language-outline' size={24} style={{ fontWeight: '900' }} />
                        </View>
                        <Text className={`text-ls font-semibold text-black-300`}>
                            Language
                        </Text>
                    </View>
                    <View>
                        <Pressable
                            className='absolute top-0 right-0 w-16 h-16 active:bg-primary/5'
                            onPress={() => {
                                // open programmatically
                                triggerRef.current?.open();
                            }}
                        />
                        <Select>
                            <SelectTrigger ref={triggerRef} className="w-[120px] bg-background/95 backdrop-blur-sm border-border text-left">
                                <SelectValue placeholder='select language' />
                            </SelectTrigger>
                            <SelectContent insets={contentInsets} className="bg-background border-border shadow-lg">
                                <SelectGroup>
                                    {languages.map((lang) => (
                                        <SelectItem
                                            key={lang.value}
                                            value={lang.value}
                                            label={lang.value}
                                            className="text-foreground hover:bg-accent/50 focus:bg-accent/50 text-left"
                                        >
                                            {lang.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { }}
            >
                <View
                    className="flex flex-row items-center justify-between py-3">
                    <View className="flex flex-row items-center gap-3">
                        <View className="bg-primary/50 rounded-full p-2">
                            <Ionicons name='invert-mode' size={24} style={{ fontWeight: '900' }} />
                        </View>
                        <Text className={`text-ls font-semibold text-black-300`}>
                            Dark Mode
                        </Text>
                    </View>
                    <View>
                        <Switch
                            trackColor={{ false: Colors.primary, true: Colors.primary_light }}
                            thumbColor={isEnabled ? Colors.primary : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                            style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    /** Profile */
    profile: {
        padding: 24,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileAvatarWrapper: {
        position: 'relative',
    },
    profileAvatar: {
        width: 72,
        height: 72,
        borderRadius: 9999,
    },
    profileAction: {
        position: 'absolute',
        right: -4,
        bottom: -10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        borderRadius: 9999,
        backgroundColor: '#007bff',
    },
    profileName: {
        marginTop: 20,
        fontSize: 19,
        fontWeight: '600',
        color: '#414d63',
        textAlign: 'center',
    },
    profileAddress: {
        marginTop: 5,
        fontSize: 16,
        color: '#989898',
        textAlign: 'center',
    },
    /** Section */
    section: {
        paddingHorizontal: 24,
    },
    sectionTitle: {
        paddingVertical: 12,
        fontSize: 12,
        fontWeight: '600',
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: 1.1,
    },
    /** Row */
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 50,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 12,
    },
    rowIcon: {
        width: 32,
        height: 32,
        borderRadius: 9999,
        marginRight: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowLabel: {
        fontSize: 17,
        fontWeight: '400',
        color: '#0c0c0c',
    },
    rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
});

export default SystemAppearance;