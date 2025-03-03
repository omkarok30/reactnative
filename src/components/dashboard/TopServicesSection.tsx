import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Text } from '@/components/ui/text'
import { topServices } from '@/utils/dummyData'
import { H3, H4 } from '@/components/ui/typography'
import ServiceCard from '@/components/servicesCards/ServiceCard'
import { screenWidth } from '@/utils/Scaling'

const TopServicesSection = () => {
    return (
        <View className="my-5">
            <View className="flex flex-row items-center justify-between px-4">
                <H4 className="text-black-300 font-bold">
                    Les meilleures prestations
                </H4>
                <TouchableOpacity>
                    <Text className="text-sm font-bold text-[#C69F4A]">
                        See all
                    </Text>
                </TouchableOpacity>
            </View>
            {false ? (
                <ActivityIndicator size="large" className="text-primary-300" />
            ) : !topServices || topServices.length === 0 ? (
                <Text className="text-center text-black-300 mt-5">No records found</Text>
            ) : (
                <FlatList
                    data={topServices}
                    renderItem={({ item }) => (
                        <ServiceCard
                            style={{ width: screenWidth - 60 }}
                            image={item.image}
                            onPress={() => { }}
                            title={item.title}
                            description={item.description}
                            price={item.price}
                            rating={item.rating}
                            providerName={item.provider}
                            topServiceCard={true}
                        />
                    )}
                    keyExtractor={(item) => item.title}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerClassName="flex mt-5"
                />
            )}
        </View>
    )
}

export default TopServicesSection