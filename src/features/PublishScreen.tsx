import { View, Text } from 'react-native'
import React from 'react'
import CustomSafeAreaView from '@/components/global/CustomSafeView'

const PublishScreen = () => {
    return (
        <CustomSafeAreaView style={{ backgroundColor: "#333" }}>
            <View>
                <Text>PublishScreen</Text>
            </View>
        </CustomSafeAreaView>
    )
}

export default PublishScreen