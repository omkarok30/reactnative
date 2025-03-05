import { ActivityIndicator, Pressable, View } from 'react-native';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import Ionicons from '@expo/vector-icons/Ionicons';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from './authSchema';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/api/useAuth';

const RegisterForm = () => {
    const { control, handleSubmit, onSubmit, isLoading, errors } = useAuth(true);
    const [secureText, setSecureText] = useState(true);
    const [secureConfirmText, setSecureConfirmText] = useState(true);

    const handleRegister = (data: { firstName: string; lastName: string; email: string; password: string, confirmPassword: string }) => {
        onSubmit(data);
    };
    console.log(errors)
    return (
        <View className="bg-white w-full px-5 py-6 rounded-xl shadow-md">
            {/* First & Last Name Inputs */}
            <View className="flex-row gap-x-4 mb-4">
                <View className="flex-1">
                    <Controller
                        control={control}
                        name="firstName"
                        render={({ field }) => (
                            <Input
                                placeholder="First Name"
                                value={field.value}
                                onChangeText={field.onChange}
                                size="lg"
                                className={`border-2 placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                            />
                        )}
                    />
                    {errors.firstName && <Text className="text-xs text-red-500 font-semibold">{errors.firstName.message}</Text>}
                </View>

                <View className="flex-1">
                    <Controller
                        control={control}
                        name="lastName"
                        render={({ field }) => (
                            <Input
                                placeholder="Last Name"
                                value={field.value}
                                onChangeText={field.onChange}
                                size="lg"
                                className={`border-2 placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                            />
                        )}
                    />
                    {errors.lastName && <Text className="text-xs text-red-500 font-semibold">{errors.lastName.message}</Text>}
                </View>
            </View>

            <View className="mb-3">
                {/* Email Input */}
                <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <Input
                            placeholder="Email"
                            value={field.value}
                            onChangeText={field.onChange}
                            size="lg"
                            className={`border-2 placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium ${errors.email ? "border-red-500" : "border-gray-300"}`}
                        />
                    )}
                />
                {errors.email && <Text className="text-xs text-red-500 font-semibold">{errors.email.message}</Text>}
            </View>

            {/* Password Input */}
            <View className="mb-3">
                <View className="relative">
                    <Pressable className="absolute right-4 top-1/2 -translate-y-1/2 z-10" onPress={() => setSecureText(!secureText)}>
                        <Ionicons name={secureText ? 'eye-outline' : 'eye-off-outline'} size={18} />
                    </Pressable>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <Input
                                placeholder="Password"
                                value={field.value}
                                onChangeText={field.onChange}
                                size="lg"
                                secureTextEntry={secureText}
                                className={`border-2 placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium ${errors.password ? "border-red-500" : "border-gray-300"}`}
                            />
                        )}
                    />
                    {errors.password && <Text className="text-xs text-red-500 font-semibold">{errors.password.message}</Text>}
                </View>
            </View>

            {/* Confirm Password Input */}
            <View className="mb-3">
                <View className="relative">
                    <Pressable className="absolute right-4 top-1/2 -translate-y-1/2 z-10" onPress={() => setSecureConfirmText(!secureConfirmText)}>
                        <Ionicons name={secureConfirmText ? 'eye-outline' : 'eye-off-outline'} size={18} />
                    </Pressable>

                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <Input
                                placeholder="Confirm Password"
                                value={field.value}
                                onChangeText={field.onChange}
                                size="lg"
                                secureTextEntry={secureConfirmText}
                                className={`border-2 placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                            />
                        )}
                    />
                    {errors.confirmPassword && <Text className="text-xs text-red-500 font-semibold">{errors.confirmPassword.message}</Text>}
                </View>
            </View>

            {/* Sign Up Button */}
            <Button onPress={handleSubmit(handleRegister)} variant="default" className="text-white mt-5 flex-row items-center justify-center" disabled={isLoading}>
                {isLoading && <ActivityIndicator color="#fff" size="small" className="mr-2" />}
                <Text className="text-white text-base">Sign Up</Text>
            </Button>

            {/* Divider */}
            <View className="flex flex-row justify-center items-center my-5">
                <View className="w-11 h-1 bg-gray-100 mr-2" />
                <Text className="text-gray-500 font-normal text-sm">Or login with</Text>
                <View className="w-11 h-1 bg-gray-100 ml-2" />
            </View>

            {/* Google Login Button */}
            <Button variant="outline" size="default" className="flex-row items-center">
                <Ionicons name="logo-google" size={18} />
                <Text className="ml-2 font-medium leading-tight">Continue with Google</Text>
            </Button>
        </View>
    );
};

export default RegisterForm;
