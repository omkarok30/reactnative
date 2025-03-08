import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { H4, P } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { UseFormGetValues, UseFormReset } from 'react-hook-form'
import { ServiceFormData } from '@/types/services'
import { useRoute } from '@react-navigation/native'
import { navigate } from '@/utils/NavigationUtils'
import { useSubmitService } from '@/hooks/api/useSubmitService'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface PropType {
  getValues: UseFormGetValues<ServiceFormData>;
  reset: UseFormReset<ServiceFormData>;
}

const StepFive = ({ getValues, reset }: PropType) => {
  const route = useRoute();
  const [open, setOpen] = useState(false);
  const { id } = route.params as { id?: string };

  const { mutate: submitService, isSuccess } = useSubmitService(id);

  useEffect(() => {
    if (isSuccess) {
      setOpen(true);
    }
  }, [isSuccess]);

  const handleSubmit = () => {
    const values = getValues();
    submitService(values);
  };

  return (
    <View className="mb-6">
      <H4 className="text-2xl font-semibold text-foreground text-center">
        Publication de l'annonce
      </H4>
      <P className="text-muted-foreground mt-2 text-sm text-center">
        Vérifiez une dernière fois les informations avant de publier
      </P>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='w-4/5'>
          <DialogHeader>
            <DialogTitle>Congratulations!!</DialogTitle>
            <DialogDescription>
              Service created successfully.
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

      <Button onPress={() => handleSubmit()} className='mt-6'>
        <Text className=' text-white font-semibold'>Publier l'annonce</Text>
      </Button>
    </View>
  )
}

export default StepFive