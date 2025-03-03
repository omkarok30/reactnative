import { View, ImageBackground, Image, SafeAreaView, StyleSheet, Animated, StatusBar } from 'react-native';
import { FC, useRef, useState } from 'react';
import { Text } from '@/components/ui/text';
import LoginForm from '@/components/auth/LoginForm';
import { Colors } from '@/utils/Constants';
import CustomSafeAreaView from '@/components/global/CustomSafeView';
import { Button } from '@/components/ui/button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { navigate } from '@/utils/NavigationUtils';

const LoginScreen: FC = () => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const insets = useSafeAreaInsets(); // Get safe area insets

    return (
        // <CustomSafeAreaView>
        <View style={styles.containerBg} className='z-10 px-4'>
            <StatusBar
                barStyle="light-content" // or "light-content" depending on your theme
                backgroundColor="transparent"
                translucent={true} // Makes the status bar transparent
            />
            {/* <SafeAreaView /> */}
            {/* <Button variant='link' size='sm' className='absolute top-14 right-3 flex-row items-center' onPress={()=> navigate('Reserve')}>
                    <Text className='text-white'>Skip</Text>
                    <Ionicons name="arrow-forward" size={16} color={Colors.white}></Ionicons>
                </Button> */}

            <Animated.ScrollView
                bounces={true}
                style={{ transform: [{ translateY: animatedValue }] }}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.subContainer}>
                {/* Background Image */}
                <ImageBackground
                    source={require("@assets/images/Star.png")}
                    className="absolute w-full h-48 top-0 bg-auto bg-center bg-no-repeat"
                    resizeMode="cover"
                >
                </ImageBackground>

                {/* Login Card */}
                <View className="flex-col flex-1 items-center mt-5">
                    <Image
                        source={require("@assets/images/playstorewhite.png")}
                        className='w-32 h-24 filter brightness-0 invert'
                    />
                    {/* <Text className="text-white text-center text-2xl font-bold">Sign in to your Account</Text> */}
                    <LoginForm />
                </View>
            </Animated.ScrollView>

            {/* Terms and Conditions */}
            {/* <View className='fixed bottom-0 p-5 w-full' >
                    <SafeAreaView>
                        <Text className='text-center text-sm text-white'>By continuing, you agree to the terms and conditions.</Text>
                    </SafeAreaView>
                </View> */}
        </View >
        // </CustomSafeAreaView >
    );
};

const styles = StyleSheet.create({
    containerBg: {
        backgroundColor: Colors.primary,
        flex: 1,
    }, subContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 20,
    }
});

export default LoginScreen;
