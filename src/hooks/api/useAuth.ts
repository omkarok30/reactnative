import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginSchema, registerSchema } from "@/components/auth/authSchema";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/store/useAuthStore";
import { navigate } from "@/utils/NavigationUtils";
import { useNavigation } from "@react-navigation/native";

// Define types
type LoginData = { email: string; password: string };
type RegisterData = LoginData & { firstName: string; lastName: string; confirmPassword: string };

export const useAuth = (isRegister: boolean) => {
    const navigation = useNavigation()
    // Use appropriate schema
    const schema = isRegister ? registerSchema : loginSchema;

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginData | RegisterData>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
            ...(isRegister && { firstName: "", lastName: "", confirmPassword: "" }),
        },
    });

    // Login Mutation
    const loginMutation = useMutation({
        mutationFn: async (data: LoginData) => {
            const { email, password } = data;
            const { error, data: response } = await supabase.auth.signInWithPassword({ email, password });
            // console.log(response)
            if (error) throw new Error(error.message);
            return response;
        },
        onSuccess(data, variables, context) {
            const setAuth = useAuthStore.getState().setAuth;
            // console.log(data)
            setAuth(data.user, data.session);
            navigate('Reserve')
        },
        onError: (error) => {
            if (error instanceof Error) setError("email", { message: error.message });
        },
    });

    // Register Mutation
    const registerMutation = useMutation({
        mutationFn: async (data: RegisterData) => {
            const { email, password, firstName, lastName } = data;
            const { error, data: response } = await supabase.auth.signUp({
                email,
                password,
                options: { data: { firstName, lastName } },
            });

            if (error) throw new Error(error.message);
            return response;
        },
        onSuccess(data, variables, context) {
            navigate('Reserve')
        },
        onError: (error) => {
            if (error instanceof Error) setError("email", { message: error.message });
        },
    });

    // ✅ Fixed: Ensure correct function signature
    const onSubmit = (data: LoginData | RegisterData) => {
        if (isRegister) {
            registerMutation.mutate(data as RegisterData);
        } else {
            loginMutation.mutate(data as LoginData);
        }
    };

    return {
        control,
        handleSubmit,
        errors,
        isLoading: loginMutation.isPending || registerMutation.isPending,
        onSubmit, // ✅ Fixed: Now passing a proper function
    };
};
