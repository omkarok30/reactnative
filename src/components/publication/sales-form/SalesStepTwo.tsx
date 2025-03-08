import { View, Text } from 'react-native'
import React from 'react'
import { H3, P } from '@/components/ui/typography'
import { Label } from '@/components/ui/label'
import { Control, Controller, UseFormSetValue } from 'react-hook-form'
import { SaleFormData } from '@/types/sales'
import { PhotoUpload } from '@/components/photo-upload/PhotoUpload'
import { PropsType } from './SalesStepOne'


const SalesStepTwo = ({ control, setValue }: PropsType) => {
  return (
    <View className="space-y-6">
      <View className="text-center mb-6">
        <H3 className="font-semibold text-foreground text-center">Photos de l'article</H3>
        <P className="text-muted-foreground mt-1 text-sm text-center">
          Ajoutez jusqu'à 3 photos de votre article
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
    </View>
  )
}

export default SalesStepTwo