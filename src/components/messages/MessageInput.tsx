import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

// Define Zod validation schema
const messageSchema = z.object({
    message: z.string().min(1, "Le message ne peut pas être vide"),
});

// Define the form types
type MessageFormData = z.infer<typeof messageSchema>;

//{ onSend }: { onSend: (message: string) => void }
const MessageInput = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
        reset,
    } = useForm<MessageFormData>({
        resolver: zodResolver(messageSchema),
        mode: "onChange", // Validate on every change
    });

    const handleSend = async (message: any) => { console.log(message) }
    // Form submission
    const onSubmit = (data: MessageFormData) => {
        handleSend(data.message);
        reset(); // Reset input field after sending
    };

    return (
        <View className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 flex-row items-center gap-2">
            {/* Text Input */}
            <View className="flex-row gap-2">
                <TextInput
                    placeholder="Écrivez votre message..."
                    onChangeText={(text) => setValue("message", text, { shouldValidate: true })}
                    className={`flex-1 px-4 py-2 rounded-lg border  dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-black dark:text-white ${errors.message ? 'border-red-600' : 'border-gray-300'}`}
                />

                {/* Send Button */}
                <Pressable
                    onPress={handleSubmit(onSubmit)}
                    disabled={!isValid}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${isValid ? "bg-blue-500" : "bg-gray-400"}`}
                >
                    <Ionicons name="send" size={20} color="white" />
                </Pressable>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    inputContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        padding: 10,
        backgroundColor: "white",
        borderTopWidth: 1,
        // borderColor: "#ccc",
    },
})
export default MessageInput;
