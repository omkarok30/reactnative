import { View, Text } from 'react-native'
import React from 'react'
import { H3, P } from '@/components/ui/typography'
import { Controller } from 'react-hook-form'
import { PropsType } from './SalesStepOne'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ScrollView } from 'react-native-gesture-handler'
import { useFormStore } from '@/store/useServiceFormStore'
import { Label } from '@/components/ui/label'

const SalesStepThree = ({ control, setValue }: PropsType) => {
  const { salesFormData } = useFormStore();
  return (
    <View className="space-y-6">
      <View className="text-center mb-6">
        <H3 className="font-semibold text-foreground text-center">Prix et état de l'article</H3>
        <P className="text-muted-foreground mt-1 text-sm text-center">
          Ajoutez jusqu'à 3 photos de votre article
        </P>
      </View>

      <View className='mb-3'>
        <Label nativeID="price">Prix</Label>
        <Controller
          control={control}
          name="price"
          render={({ field: { onChange, value } }) => (
            <Input
              keyboardType="numeric"
              placeholder={"Ex: 50"}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>
      <View >
        <Label nativeID="condition">État</Label>
        <Controller
          control={control}
          name="condition"
          aria-labelledby="conditon"
          render={({ field }) => (
            <Select defaultValue={{ value: salesFormData.condition, label: salesFormData.condition }} onValueChange={(option) => {
              if (option?.value) {
                setValue("condition", option?.label);
              }
            }}>
              <SelectTrigger className="w-full bg-background">
                <SelectValue placeholder="Sélectionnez l'état" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border">
                <SelectItem label="Neuf" value="new">Neuf</SelectItem>
                <SelectItem label="Très bon état" value="very-good">Très bon état</SelectItem>
                <SelectItem label="Bon état" value="good">Bon état</SelectItem>
                <SelectItem label="État moyen" value="average">État moyen</SelectItem>
                <SelectItem label="Pour pièces" value="for-parts">Pour pièces</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </View>
    </View>
  )
}

export default SalesStepThree