import { View, ImageBackground, Image, SafeAreaView, StyleSheet, Pressable, Animated } from 'react-native';
import { FC, useRef, useState } from 'react';
import { navigate } from '@/utils/NavigationUtils';
import { Text } from '@/components/ui/text';
import RegisterForm from '@/components/auth/RegisterForm';
import CustomSafeAreaView from '@/components/global/CustomSafeView';
import { Button } from '@/components/ui/button';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/utils/Constants';

const RegisterScreen: FC = () => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    return (
        // <CustomSafeAreaView>
        <View style={styles.containerBg} className='px-4'>
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
                <View className="flex-col flex-1 items-center">
                    <Image
                        source={require("@assets/images/playstorewhite.png")}
                        className='w-20 h-16 filter brightness-0 invert'
                    />

                    {/* <Text className="text-white text-center text-2xl font-bold">Sign Up</Text>
                    <View className="flex-row justify-center items-center">
                        <Text className='font-medium'>Already have an Account? </Text>
                        <Pressable onPress={() => navigate("LoginScreen")}>
                            <Text className="text-white underline font-medium">LogIn</Text>
                        </Pressable>
                    </View> */}

                    {/* Register form */}
                    <RegisterForm />
                </View>
            </Animated.ScrollView>
            {/* <SafeAreaView />
            <Button variant='link' size='sm' className='absolute top-14 right-3 flex-row items-center' onPress={() => navigate('Reserve')}>
                <Text className='text-white'>Skip</Text>
                <Ionicons name="arrow-forward" size={16} color={Colors.white}></Ionicons>
            </Button> */}

            {/* Terms and Conditions */}
            {/* <View className='absolute bottom-0 p-5 w-full' >
                <SafeAreaView>
                    <Text className='text-center text-sm text-white'>By continuing, you agree to the terms and conditions.</Text>
                </SafeAreaView>
            </View> */}
        </View >
        // </CustomSafeAreaView>
    );
};

const styles = StyleSheet.create({
    containerBg: {
        backgroundColor: "#C69F4A",
        flex: 1,
    },
    containerView: {
        padding: 10
    },
    subContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        // alignItems: 'center',
        marginBottom: 20,
    }
});

export default RegisterScreen;
