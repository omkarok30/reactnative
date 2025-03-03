import { ActivityIndicator, Pressable, View } from 'react-native';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import Ionicons from '@expo/vector-icons/Ionicons';

const RegisterForm = () => {
    const [secureText, setSecureText] = useState(true);
    const [secureConfirmText, setSecureConfirmText] = useState(true);
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    // const {
    //     control,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm({
    //     resolver: zodResolver(registerSchema),
    //     defaultValues: {
    //         firstName: '',
    //         lastName: '',
    //         email: '',
    //         password: '',
    //         confirmPassword: '',
    //     },
    // });

    // const onSubmit = (data: { firstName: string; lastName: string; email: string; password: string }) => {
    //     setLoading(true);
    //     console.log('Register Data:', data);
    //     setTimeout(() => setLoading(false), 2000); // Simulate API call
    // };

    return (
        <View className="bg-white w-full px-5 py-6 rounded-xl mt-6 shadow-md">
            {/* First & Last Name Inputs */}
            <View className="flex-row gap-x-4 mb-4">
                <View className="flex-1">
                    <Input
                        placeholder="First Name"
                        // value={field.value}
                        // onChangeText={field.onChange}
                        onBlur={() => setTouched((prev) => ({ ...prev, firstName: false }))}
                        onFocus={() => setTouched((prev) => ({ ...prev, firstName: true }))}
                        size="lg"
                        className={`border-2 placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium`}
                    />
                </View>

                <View className="flex-1">
                    <Input
                        placeholder="Last Name"
                        // value={field.value}
                        // onChangeText={field.onChange}
                        onBlur={() => setTouched((prev) => ({ ...prev, lastName: false }))}
                        onFocus={() => setTouched((prev) => ({ ...prev, lastName: true }))}
                        size="lg"
                        className={`border-2 placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium`}
                    />
                </View>
            </View>

            <View className="mb-3">
                {/* Email Input */}
                <Input
                    placeholder="Email"
                    // value={field.value}
                    // onChangeText={field.onChange}
                    onBlur={() => setTouched((prev) => ({ ...prev, email: false }))}
                    onFocus={() => setTouched((prev) => ({ ...prev, email: true }))}
                    size="lg"
                    className={`border-2 placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium`}
                />
            </View>

            {/* Password Input */}
            <View className="mb-3">
                <View className="relative">
                    <Pressable className="absolute right-4 top-1/2 -translate-y-1/2 z-10" onPress={() => setSecureText(!secureText)}>
                        <Ionicons name={secureText ? 'eye-outline' : 'eye-off-outline'} size={18} />
                    </Pressable>
                    <Input
                        placeholder="Password"
                        // value={field.value}
                        // onChangeText={field.onChange}
                        onBlur={() => setTouched((prev) => ({ ...prev, password: false }))}
                        onFocus={() => setTouched((prev) => ({ ...prev, password: true }))}
                        size="lg"
                        secureTextEntry={secureText}
                        className={`border-2 placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium`}
                    />
                </View>
            </View>

            {/* Confirm Password Input */}
            {/* <View className="mb-3">
                <View className="relative">
                    <Pressable className="absolute right-4 top-1/2 -translate-y-1/2 z-10" onPress={() => setSecureConfirmText(!secureConfirmText)}>
                        <Ionicons name={secureConfirmText ? 'eye-outline' : 'eye-off-outline'} size={18} />
                    </Pressable>
                    <Input
                        placeholder="Confirm Password"
                        // value={field.value}
                        // onChangeText={field.onChange}
                        onBlur={() => setTouched((prev) => ({ ...prev, confirmPassword: false }))}
                        onFocus={() => setTouched((prev) => ({ ...prev, confirmPassword: true }))}
                        size="lg"
                        secureTextEntry={secureConfirmText}
                        className={`border-2 placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium`}
                    />
                </View>
            </View> */}

            {/* Sign Up Button */}
            <Button onPress={() => { }} variant="default" className="text-white mt-5 flex-row items-center justify-center" disabled={loading}>
                {loading && <ActivityIndicator color="#fff" size="small" className="mr-2" />}
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
