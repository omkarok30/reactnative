import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PhoneInput, { isValidPhoneNumber, ICountry } from 'react-native-international-phone-number';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils'; // Assuming cn function is available for class merging
import { Colors } from '@/utils/Constants';

const formSchema = z.object({
    first_name: z.string().min(2, "Prénom doit contenir au moins 2 caractères"),
    last_name: z.string().min(2, "Nom doit contenir au moins 2 caractères"),
    email: z.string().email("Email invalide"),
    phone: z.string().min(7, "Numéro de téléphone invalide"),
    address: z.string().min(5, "Adresse invalide"),
});

type FormData = z.infer<typeof formSchema>;

interface ProfileFormProps {
    profile: any;
    onProfileChange: (field: string, value: string) => void;
    onLocationSelect: (value: string) => void;
    isLoading: boolean;
}

const ProfileForm = ({ profile, onProfileChange, onLocationSelect, isLoading }: ProfileFormProps) => {
    const [selectedCountry, setSelectedCountry] = useState<ICountry | undefined>(undefined);
    const [phoneValid, setPhoneValid] = useState(false);
    const inputRefs = {
        first_name: useRef<TextInput>(null),
        last_name: useRef<TextInput>(null),
        email: useRef<TextInput>(null),
        phone: useRef<TextInput>(null),
        address: useRef<TextInput>(null),
    };

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: profile?.first_name || '',
            last_name: profile?.last_name || '',
            email: profile?.email || '',
            phone: profile?.phone || '',
            address: profile?.address || '',
        },
    });

    const onSubmit = (data: FormData) => {
        // const fullPhoneNumber = `${selectedCountry?.callingCode} ${data.phone}`;
        // const isPhoneValid = isValidPhoneNumber(data.phone, selectedCountry as ICountry);

        // setPhoneValid(isPhoneValid);

        // if (!isPhoneValid) {
        //     Alert.alert("Erreur", "Numéro de téléphone invalide");
        //     return;
        // }

        // Alert.alert(
        //     'Résultat',
        //     `Pays: ${selectedCountry?.name?.en} \nTéléphone: ${fullPhoneNumber} \nValide: ${isPhoneValid}`
        // );

        console.log("Form Submitted:", { ...data });
    };

    return (
        <View className="p-6 bg-white dark:bg-gray-800/50 dark:backdrop-blur-xl rounded-lg shadow-sm dark:border dark:border-gray-700">
            <View className="flex-row">
                {/* First Name */}
                <View className="flex-1">
                    <Label
                        className={cn(errors.first_name && 'text-destructive', 'pb-2 native:pb-1 pl-0.5 text-gray-600')}
                        nativeID="firstNameLabel"
                        onPress={() => inputRefs.first_name.current?.focus()}
                    >
                        Prénom
                    </Label>
                    <Controller
                        name="first_name"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                ref={inputRefs.first_name}
                                placeholder="Votre prénom"
                                value={value}
                                onChangeText={onChange}
                                aria-labelledby="firstNameLabel"
                                aria-errormessage="firstNameError"
                                className='placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium'
                            />
                        )}
                    />
                    {errors.first_name && <Text id="firstNameError" className="text-red-500 text-xs">{errors.first_name.message}</Text>}
                </View>
            </View>

            {/* Last Name */}
            <View className="mt-4">
                <Label
                    className={cn(errors.last_name && 'text-destructive', 'pb-2 native:pb-1 pl-0.5 text-gray-600')}
                    nativeID="lastNameLabel"
                    onPress={() => inputRefs.last_name.current?.focus()}
                >
                    Nom
                </Label>
                <Controller
                    name="last_name"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            ref={inputRefs.last_name}
                            placeholder="Votre nom"
                            value={value}
                            onChangeText={onChange}
                            aria-labelledby="lastNameLabel"
                            aria-errormessage="lastNameError"
                            className='placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium'
                        />
                    )}
                />
                {errors.last_name && <Text id="lastNameError" className="text-red-500 text-xs">{errors.last_name.message}</Text>}
            </View>

            {/* Email */}
            <View className="mt-4">
                <Label
                    className={cn(errors.email && 'text-destructive', 'pb-2 native:pb-1 pl-0.5 text-gray-600')}
                    nativeID="emailLabel"
                    onPress={() => inputRefs.email.current?.focus()}
                >
                    Email
                </Label>
                <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            ref={inputRefs.email}
                            placeholder="Votre email"
                            keyboardType="email-address"
                            value={value}
                            onChangeText={onChange}
                            aria-labelledby="emailLabel"
                            aria-errormessage="emailError"
                            className='placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium'
                        />
                    )}
                />
                {errors.email && <Text id="emailError" className="text-red-500 text-xs">{errors.email.message}</Text>}
            </View>

            {/* Phone */}
            {/* <View className="mt-4">
                <Label
                    className={cn(phoneValid && 'text-destructive', 'pb-2 native:pb-1 pl-0.5')}
                    nativeID="phoneLabel"
                    onPress={() => inputRefs.phone.current?.focus()}
                >
                    Téléphone
                </Label>
                <Controller
                    name="phone"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <PhoneInput
                            defaultValue="+12505550199"
                            value={value}
                            onChangePhoneNumber={onChange}
                            selectedCountry={selectedCountry}
                            onChangeSelectedCountry={setSelectedCountry}

                            phoneInputStyles={{
                                container: {
                                    backgroundColor: Colors.backgroundSecondary,
                                    borderWidth: 1,
                                    borderStyle: 'solid',
                                    borderColor: '#F3F3F3',
                                },
                                flagContainer: {
                                    width: 130,
                                    padding: 5,
                                    borderTopLeftRadius: 7,
                                    borderBottomLeftRadius: 7,
                                    backgroundColor: '#aeaeae',
                                    justifyContent: 'center',
                                },
                                flag: {
                                    fontSize: 14,
                                },
                                caret: {
                                    color: '#F3F3F3',
                                    fontSize: 14,
                                },
                                divider: {
                                    backgroundColor: '#F3F3F3',
                                },
                                callingCode: {
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    color: '#F3F3F3',
                                },
                                input: {
                                    color: "gray",
                                    fontSize: 14
                                },
                            }}
                            modalStyles={{
                                modal: {
                                    backgroundColor: '#FFF',
                                    borderWidth: 1,
                                },
                                backdrop: {},
                                divider: {
                                    backgroundColor: 'transparent',
                                },
                                countriesList: {},
                                searchInput: {
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    borderColor: '#F3F3F3',
                                    color: '#F3F3F3',
                                    backgroundColor: '#333333',
                                    paddingHorizontal: 12,
                                    height: 46,
                                },
                                countryButton: {
                                    borderWidth: 1,
                                    borderColor: '#F3F3F3',
                                    backgroundColor: '#666666',
                                    marginVertical: 4,
                                    paddingVertical: 0,
                                },
                                noCountryText: {},
                                noCountryContainer: {},
                                flag: {
                                    color: '#FFFFFF',
                                    fontSize: 20,
                                },
                                callingCode: {
                                    color: '#F3F3F3',
                                },
                                countryName: {
                                    color: '#F3F3F3',
                                },
                                sectionTitle: {
                                    marginVertical: 10,
                                    color: '#F3F3F3',
                                }
                            }}
                        />
                    )}
                />
                {phoneValid && <Text className="text-red-500 text-xs mt-1">Numéro de téléphone invalide</Text>}
            </View> */}

            {/* Address */}
            <View className="mt-4">
                <Label
                    className={cn(errors.address && 'text-destructive', 'pb-2 native:pb-1 pl-0.5 text-gray-600')}
                    nativeID="addressLabel"
                    onPress={() => inputRefs.address.current?.focus()}
                >
                    Adresse
                </Label>
                <Controller
                    name="address"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Input
                            ref={inputRefs.address}
                            placeholder="Votre adresse"
                            value={value}
                            onChangeText={onChange}
                            aria-labelledby="addressLabel"
                            aria-errormessage="addressError"
                            className='placeholder:text-gray-400 placeholder:text-sm placeholder:font-medium'
                        />
                    )}
                />
                {errors.address && <Text id="addressError" className="text-red-500 text-xs">{errors.address.message}</Text>}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
                className="w-full mt-6 bg-primary py-3 rounded-md flex items-center justify-center dark:bg-primary/90 dark:hover:bg-primary"
                onPress={handleSubmit(onSubmit)}
                disabled={isLoading || !phoneValid}
            >
                {isLoading ? <ActivityIndicator color="white" /> : <Text className="text-white font-medium">Enregistrer les modifications</Text>}
            </TouchableOpacity>
        </View>
    );
};

export default ProfileForm;
