import { useState } from "react";
import { View, Pressable, ActivityIndicator } from "react-native";
import { Controller } from "react-hook-form";
import { navigate } from "@/utils/NavigationUtils";
// import { useAuth } from "@/hooks/api/useAuth"; 
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuth } from "@/hooks/api/useAuth";

const LoginForm = () => {
    const { control, handleSubmit, onSubmit, isLoading, errors } = useAuth(false);
    const [secureText, setSecureText] = useState(true);
    const [checked, setChecked] = useState(false);
    const [touched, setTouched] = useState<{ email: boolean; password: boolean }>({
        email: false,
        password: false,
    });

    const handleLogin = (data: { email: string; password: string }) => {
        onSubmit(data);
    };

    return (
        <View className="bg-white w-full px-5 py-6 rounded-xl mt-6 shadow-md">
            {/* Google Login Button */}
            <Button variant="outline" size="default" className="flex-row items-center">
                <Ionicons name="logo-google" size={18} />
                <Text className="ml-2 font-medium leading-tight">Continue with Google</Text>
            </Button>

            {/* Divider */}
            <View className="flex flex-row justify-center items-center my-5">
                <View className="w-11 h-1 bg-gray-100 mr-2" />
                <Text className="text-gray-500 font-normal text-sm">Or login with</Text>
                <View className="w-11 h-1 bg-gray-100 ml-2" />
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
                            onBlur={() => setTouched((prev) => ({ ...prev, email: false }))}
                            onFocus={() => setTouched((prev) => ({ ...prev, email: true }))}
                            size="lg"
                            className={`border-2 placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium ${errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                    )}
                />
                {errors.email && <Text className="text-xs text-red-500 font-semibold">{errors.email.message}</Text>}
            </View>

            <View className="mb-3">
                {/* Password Input */}
                <View className="relative">
                    <Pressable
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
                        onPress={() => setSecureText(!secureText)}
                    >
                        <Ionicons name={secureText ? "eye-outline" : "eye-off-outline"} size={18} />
                    </Pressable>

                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <Input
                                placeholder="Password"
                                value={field.value}
                                onChangeText={field.onChange}
                                onBlur={() => setTouched((prev) => ({ ...prev, password: false }))}
                                onFocus={() => setTouched((prev) => ({ ...prev, password: true }))}
                                size="lg"
                                secureTextEntry={secureText}
                                className={`border-2 placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium ${errors.password ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                        )}
                    />
                </View>
                {errors.password && <Text className="text-xs text-red-500 font-semibold">{errors.password.message}</Text>}
            </View>

            {/* Remember Me & Forgot Password */}
            <View className="flex-row justify-between items-center">
                <Pressable onPress={() => setChecked(!checked)} className="flex-row items-center">
                    <Ionicons name={checked ? "checkbox" : "square-outline"} size={22} color={checked ? "blue" : "gray"} />
                    <Text className="ml-2 text-gray-500 font-medium text-sm">Remember Me</Text>
                </Pressable>

                <Pressable onPress={() => console.log("Navigate to Forgot Password")}>
                    <Text className="text-blue-500 text-sm">Forgot Password?</Text>
                </Pressable>
            </View>

            {/* Log In Button */}
            <Button onPress={handleSubmit(handleLogin)} variant="default" className="mt-6 flex-row shadow-md" disabled={isLoading}>
                {isLoading && <ActivityIndicator color="#fff" size="small" className="mr-2" />}
                <Text className="text-base text-white leading-tight">Log In</Text>
            </Button>

            {/* Sign Up Link */}
            <View className="flex-row justify-center mt-2">
                <Text className="text-gray-500 font-medium text-sm">Don't have an account? </Text>
                <Pressable onPress={() => navigate("RegisterScreen")}>
                    <Text className="text-blue-500 font-medium text-sm">Sign Up</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default LoginForm;
