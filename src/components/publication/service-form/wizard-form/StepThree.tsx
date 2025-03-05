import { View } from 'react-native'
import React from 'react'
import { H3, P } from '@/components/ui/typography';
import { ServiceFormData } from '@/types/services';
import { Control, Controller, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Text } from '@/components/ui/text'; 
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input'; 
import { screenWidth } from '@/utils/Scaling';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { timeSlots } from '@/data/services';
import { Checkbox } from '@/components/ui/checkbox';

type PropsType = {
  control: Control<ServiceFormData>;
  setValue: UseFormSetValue<ServiceFormData>;
  watch: UseFormWatch<ServiceFormData>;
}

const StepThree = ({ control, setValue, watch }: PropsType) => {

  function onLabelPress(label: string) {
    return () => {
      setValue("billing_type", label);
    };
  }
  return (
    <View className="space-y-6">
      <View className="text-center mb-6">
        <H3 className="text-xl font-semibold text-center">Tarification et disponibilités</H3>
        <P className="text-muted-foreground text-sm text-center">
          Définissez votre tarif et vos créneaux de disponibilité
        </P>
      </View>

      {/* Type de facturation */}
      <Controller
        control={control}
        name="billing_type"
        render={({ field: { onChange, value } }) => (
          <View>
            <Text className='mb-1 font-semibold text-lg'>
              Type de facturation
            </Text>
            <RadioGroup value={value} onValueChange={onChange} className='gap-x-4 flex-row'>
              <RadioGroupItemWithLabel value='Hourly rate' label="hourly" onLabelPress={onLabelPress('hourly')} />
              <RadioGroupItemWithLabel value='Package' label="fixed" onLabelPress={onLabelPress('fixed')} />
            </RadioGroup>
          </View>
        )}
      />

      {/* Tarif */}
      <Controller
        control={control}
        name="price"
        render={({ field: { onChange, value } }) => (
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>Tarif (€)</Text>
            <Input
              keyboardType="numeric"
              placeholder={watch("billing_type") === "hourly" ? "25" : "100"}
              value={value}
              onChangeText={onChange}
            />
          </View>
        )}
      />

      {/* Disponibilités */}
      <Controller
        control={control}
        name="availability"
        render={({ field: { onChange, value }, formState }) =>{console.log(formState) 
          return(
          <View className='mt-5'>
            <Text className='font-semibold mb-2'>Disponibilités</Text>
            <View className='mb-2 flex-row flex-1 flex-wrap gap-4 justify-between'>
              {timeSlots.map((slot) => (
                <View key={slot.id} className='flex-row items-center w-32'>
                  <Checkbox
                    // status={value.includes(slot.id) ? "checked" : "unchecked"}
                    checked={value.includes(slot.id)}
                    onCheckedChange={() => {
                      const newValue = value.includes(slot.id)
                        ? value.filter((id) => id !== slot.id)
                        : [...value, slot.id];
                      onChange(newValue);
                    }}
                    className='border-[2px]'
                  />
                  <Text className='ml-2 text-sm'>{slot.label}</Text>
                </View>
              ))}
            </View>
          </View>
        )}}
      />
    </View>
  )
}

function RadioGroupItemWithLabel({
  value,
  onLabelPress,
  label
}: {
  value: string;
  onLabelPress: () => void;
  label: string
}) {
  return (
    <View className={'flex-row gap-2 items-center'}>
      <RadioGroupItem aria-labelledby={`label-for-${label}`} value={label} style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }} />
      <Label nativeID={`label-for-${label}`} onPress={onLabelPress}>
        {value}
      </Label>
    </View>
  );
}

export default StepThree