import { View, Text } from 'react-native'
import React, { useState } from 'react'
import CustomSafeAreaView from '@/components/global/CustomSafeView'
import { PageHeader } from '@/components/layout/PageHeader';
import PhoneInput, {
  isValidPhoneNumber,
} from 'react-native-international-phone-number';
import ProfileForm from '@/components/account/ProfileInfoForm';

const profile = { first_name: 'Omkar', last_name: 'K', email: 'test@gmail.com', phone: null, address: null }
const emailError = null
const isLoading = false
const onProfileChange = () => { }
const onLocationSelect = () => { }
const onSubmit = () => { }

const ProfileInfoScreen = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [inputValue, setInputValue] = useState('');
  return (
    <CustomSafeAreaView style={{ flex: 1 }}>
      <PageHeader backUrl title='Informations personnelles' />

      <View className='px-4 pt-7'>
        <ProfileForm profile={profile} onProfileChange={onProfileChange} onLocationSelect={onLocationSelect} isLoading={isLoading} />
      </View>
    </CustomSafeAreaView>
  )
}

export default ProfileInfoScreen