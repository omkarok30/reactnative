import { View, Text, KeyboardAvoidingView } from 'react-native'
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
  return (
    <View className="space-y-6">
      <View className="text-center mb-6">
        <H3 className="font-semibold text-foreground">Photos et zone d'intervention</H3>
        <P className="text-muted-foreground mt-2">
          Ajoutez des photos de vos réalisations et précisez votre zone d'intervention
        </P>
      </View>

      <View className='mb-3'>
        <Label htmlFor="photos">Photos (maximum 3)</Label>
        <Controller
          control={control}
          name="photos"
          render={({ field }) => (
            <PhotoUpload
              {...field}
              onPhotosChange={(photos) => {
                console.log(photos)
                // setValue("photos", photos);
              }}
            />
          )}
        />
      </View>

      <View className='mb-3'>
        <Label htmlFor="service_area">Zone d'intervention</Label>
        <Controller
          control={control}
          name="service_area"
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
        <Label htmlFor="spoken_languages">Langues parlées</Label>
        <Controller
          control={control}
          name="spoken_languages"
          render={({ field }) => (
            <Controller
              control={control}
              name="spoken_languages"
              render={({ field }) => (
                <Select
                  value={field.value?.[0] || ""}
                  onValueChange={(value) => field.onChange([value])} // Ensure it's a string
                >
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue placeholder="Sélectionnez une langue" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border">
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
              )}
            />

          )}
        />

      </View>

    </View>
  )
}

export default StepTwo