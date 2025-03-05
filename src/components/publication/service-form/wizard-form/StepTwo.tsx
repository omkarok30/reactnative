import { View, Text, KeyboardAvoidingView, Platform, Pressable } from 'react-native'
import React from 'react'
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import { ServiceFormData } from '@/types/services';
import { H3, P } from '@/components/ui/typography';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PhotoUpload } from '@/components/photo-upload/PhotoUpload';
import { LocationAutocomplete } from '@/components/LocationAutocomplete';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Keyboard } from 'react-native';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type PropsType = {
  control: Control<ServiceFormData>;
  setValue: UseFormSetValue<ServiceFormData>;
}

const languages = [
  { code: "fr", name: "Français" },
  { code: "en", name: "Anglais" },
  { code: "ar", name: "Arabe" },
  { code: "es", name: "Espagnol" },
  { code: "pt", name: "Portugais" },
  { code: "wo", name: "Wolof" },
  { code: "bm", name: "Bambara" }
];

const StepTwo = ({ control, setValue }: PropsType) => {
  const triggerRef = React.useRef<React.ElementRef<typeof SelectTrigger>>(null);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({ ios: insets.bottom, android: insets.bottom + 50 }),
    left: 12,
    right: 12,
  };
  return (
    <View className="space-y-6">
      <View className="text-center mb-6">
        <H3 className="font-semibold text-foreground">Photos et zone d'intervention</H3>
        <P className="text-muted-foreground mt-2">
          Ajoutez des photos de vos réalisations et précisez votre zone d'intervention
        </P>
      </View>

      <View className='mb-3'>
        <Label nativeID="photos">Photos (maximum 3)</Label>
        <Controller
          control={control}
          name="photos"
          aria-labelledby="photos"
          render={({ field }) => (
            <PhotoUpload
              {...field}
              onPhotosChange={(photos) => {
                setValue("photos", photos);
              }}
            />
          )}
        />
      </View>

      <View className='mb-3'>
        <Label nativeID="service_area">Zone d'intervention</Label>
        <Controller
          control={control}
          name="service_area"
          aria-labelledby="service_area"
          render={({ field }) => (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={{ flex: 1 }}>
                <LocationAutocomplete
                  {...field}
                  onChange={field.onChange}
                  onLocationSelect={(locationData) => {
                    console.log('Location selected:', locationData);
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      </View>

      <View className='mb-3'>
        <Label nativeID="spoken_languages">Langues parlées</Label>
        <Controller
          control={control}
          name="spoken_languages"
          render={({ field }) => (
            <Controller
              control={control}
              name="spoken_languages"
              render={({ field }) => {
                return (
                  <View className='justify-between items-center'>
                    <Pressable
                      className='absolute top-0 right-0 w-16 h-16 active:bg-primary/5'
                      onPress={() => {
                        // open programmatically
                        triggerRef.current?.open();
                      }}
                    />
                    <Select
                      value={field?.value?.[0] || ""}
                      onValueChange={(value) => field.onChange([value])} // Ensure it's a string
                      aria-labelledby="service_area"
                    >
                      <SelectTrigger ref={triggerRef} className="w-full bg-background">
                        <SelectValue placeholder="Sélectionnez une langue" />
                      </SelectTrigger>
                      <SelectContent insets={contentInsets} className="bg-background border border-border w-[250px]">
                        {languages.map((language) => (
                          <SelectItem
                            key={language.code}
                            value={language.code} // Ensure this is a string
                            label={language.name} // Ensure this is a string
                            className="py-3 hover:bg-accent/50 cursor-pointer text-foreground"
                          >
                            {language.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </View>
                )
              }}
            />

          )}
        />

      </View>

    </View>
  )
}

export default StepTwo