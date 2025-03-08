import { View, Text, Keyboard } from 'react-native'
import React from 'react'
import { H3, P } from '@/components/ui/typography'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { LocationAutocomplete } from '@/components/LocationAutocomplete'
import { Label } from '@rn-primitives/select'
import { PropsType } from './SalesStepOne'
import { Controller } from 'react-hook-form'

const SalesStepFour = ({ control, setValue }: PropsType) => {
  return (
    <View className="space-y-6 min-h-40">
      <H3 className="text-xl font-semibold text-foreground text-center">
        Localisation
      </H3>
      <P className="text-muted-foreground mt-1 text-sm text-center">
        Indiquez où se trouve votre article
      </P>

      <View className='mt-3'>
        <Label nativeID="service_area">Adresse</Label>
        <Controller
          control={control}
          name="location"
          aria-labelledby="location"
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
    </View>
  )
}

export default SalesStepFour