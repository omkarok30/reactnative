import { Image, View } from 'react-native'
import React from 'react'
import { UseFormGetValues } from 'react-hook-form';
import { ServiceFormData } from '@/types/services';
import { H4, P } from '@/components/ui/typography';
import { Text } from '@/components/ui/text';
import { useCategoryStore, useSelectedCategory, useSelectedSubCategory } from '@/store/useCategoryStore'; 
import { timeSlots } from '@/data/services';

interface PropType {
  getValues: UseFormGetValues<ServiceFormData>;
}

export function StepFour({ getValues }: PropType) {
  const values = getValues();

  const category = useSelectedCategory(Number(values?.category))
  const subCatogry = useSelectedSubCategory(Number(values?.subcategory));

  return (
    <View className="space-y-6">
      <H4 className="text-xl font-semibold mb-4 text-foreground">
        Récapitulatif de l'annonce
      </H4>

      <View className="flex-col gap-4">
        <View>
          <Text className="font-medium text-foreground">Catégorie</Text>
          <P className="text-muted-foreground">{category?.name}</P>
        </View>

        <View>
          <Text className="font-medium text-foreground">Sous-catégorie</Text>
          <P className="text-muted-foreground">{values.subcategory}</P>
        </View>

        <View>
          <Text className="font-medium text-foreground">Services proposés</Text>
          <View className="flex flex-wrap gap-2 mt-1">
            {values.services.map((service) => (
              <Text
                key={service}
                className="bg-accent px-3 py-1 rounded-full text-sm text-accent-foreground"
              >
                {service}
              </Text>
            ))}
          </View>
        </View>

        <View>
          <Text className="font-medium text-foreground">Description</Text>
          <P className="text-muted-foreground">{values.description}</P>
        </View>
        {/* <ServiceSummarySection values={values} />
        <PhotosSection photos={values.photos} />
        <AvailabilitySection
          availability={values.availability}
          price={values.price}
        /> */}

        <View>
          <Text className="font-medium text-foreground">Photos</Text>
          <View className="flex gap-2 mt-2">
            {values.photos.map((photo, index) => (
              <Image
                key={index}
                source={{ uri: photo }}
                className="w-20 h-20 object-cover rounded border border-border"
              />
            ))}
          </View>
        </View>

        <View>
          <View>
            <Text className="font-medium text-foreground">Tarif</Text>
            <P className="text-muted-foreground">{values?.price}€/heure</P>
          </View>

          <View>
            <Text className="font-medium text-foreground">Disponibilités</Text>
            <View className="flex flex-wrap gap-2 mt-2">
              {values?.availability.map((slot) => (
                <Text
                  key={slot}
                  className="bg-accent px-3 py-1 rounded-full text-sm text-accent-foreground"
                >
                  {timeSlots.find((s) => s.id === slot)?.label}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default StepFour