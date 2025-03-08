import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { UseFormGetValues, UseFormReset } from 'react-hook-form';
import { SaleFormData } from '@/types/sales';
import { H4, P } from '@/components/ui/typography';
import { useSelectedCategory, useSelectedSubCategory } from '@/store/useCategoryStore';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/button';
import { useRoute } from '@react-navigation/native';
import useSubmitSales from '@/hooks/api/useSubmitSales';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { navigate } from '@/utils/NavigationUtils';
interface PropType {
  getValues: UseFormGetValues<SaleFormData>;
  reset: UseFormReset<SaleFormData>;
}
const SalesStepFive = ({ getValues, reset }: PropType) => {
  const route = useRoute();
  const [open, setOpen] = useState(false);
  const { id } = route.params as { id?: string };
  const values = getValues();

  const { mutate: submitSale, isSuccess, isPending } = useSubmitSales(id);

  const handleSubmit = () => {
    const values = getValues();
    submitSale(values);
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(true);
    }
  }, [isSuccess]);

  return (
    <View className="space-y-6">
      <H4 className="text-xl font-semibold mb-4 text-foreground  text-center">
        Récapitulatif et publication
      </H4>
      <P className="text-muted-foreground mt-1 text-sm text-center">Vérifiez les informations avant de publier</P>

      <View className="flex-col gap-4 mt-3">
        <View>
          <Text className="font-medium text-foreground">Titre</Text>
          <P className="text-muted-foreground">{values?.title}</P>
        </View>

        <View>
          <Text className="font-medium text-foreground">Description</Text>
          <P className="text-muted-foreground">{values.description}</P>
        </View>

        <View>
          <Text className="font-medium text-foreground">Prix</Text>
          <P className="text-muted-foreground">{values?.price} €</P>
        </View>

        <View>
          <Text className="font-medium text-foreground">Localisation</Text>
          <P className="text-muted-foreground">{values?.location}</P>
        </View>
      </View>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='w-[300px]'>
          <DialogHeader>
            {/* <DialogTitle>Congratulations!!</DialogTitle> */}
            <DialogDescription>
              <Text className='text-xl font-bold text-center text-black'>Congratulations!!</Text>
            </DialogDescription>
            <DialogDescription>
              <Text className='text-center'>Add posted successfully</Text>
            </DialogDescription>
          </DialogHeader>
          <Button
            onPress={() => {
              setOpen(false)
              reset();
              navigate("MyPublication");
            }}
            className='bg-green-600'
          >
            <Text className='text-white'>Close</Text>
          </Button>
        </DialogContent>
      </Dialog>
      <Button onPress={handleSubmit} className='flex-row items-center justify-center mt-4 gap-1' disabled={isPending}>
        {isPending ? <ActivityIndicator color='white' /> : <Ionicons name='checkmark-circle' color='white' size={20} />}
        <Text className='font-semibold text-white'>Publier l'annonce</Text>
      </Button>
    </View>
  )
}

export default SalesStepFive