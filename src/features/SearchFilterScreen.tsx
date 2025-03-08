import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { H3, H4, P } from '@/components/ui/typography'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

import { goBack, navigate } from '@/utils/NavigationUtils'
import CustomSafeAreaView from '@/components/global/CustomSafeView'
import { Ionicons } from '@expo/vector-icons'
import { Input } from '@/components/ui/input'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useFilterStore } from '@/store/useFilterStore'
import { useFetchResults } from '@/hooks/api/useFetchResults'
import { Colors } from '@/utils/Constants'
import CardSkeleton from '@/components/loaders/CardSkeleton'
import ServiceCard from '@/components/servicesCards/ServiceCard'
import SalesCard from '@/components/servicesCards/SalesCard'

const SearchFilterScreen = () => {
    // UUID validation regex
    const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const { filters, setShowResults, resetFilters, showResults } = useFilterStore()
    const { results, loading } = useFetchResults(filters)

    useFocusEffect(
        useCallback(() => {
            setShowResults(false);
            resetFilters()
        }, [setShowResults])
    );

    return (
        <CustomSafeAreaView>
            <View className='flex-row items-center justify-between mt-4 px-4 mb-2'>
                <TouchableOpacity
                    onPress={() => goBack()} className="bg-gray-200 p-3 mt-2 rounded-full">
                    <Ionicons name="arrow-back-outline" size={16} color="black" />
                </TouchableOpacity>
                <View
                    className="flex-row items-center justify-between bg-gray-100 border border-gray-300 rounded-lg px-4 mt-2 w-[86%] relative"
                >
                    <View className="flex-row items-center">
                        <Ionicons name="search" size={20} className="text-gray-600" />
                        <Input className="border-0 border-transparent bg-transparent text-gray-400 placeholder:text-sm" placeholder='Search for anything...' />
                    </View>

                    <TouchableOpacity
                        onPress={() => navigate('FilterPanel')}
                        activeOpacity={0.7} className='flex-row'>
                        {/* Divider & Filter Button */}
                        <View className="w-[1px] h-6 bg-gray-300 mx-2" />
                        <Ionicons name="options-outline" size={20} className="text-gray-600" />
                    </TouchableOpacity>
                </View>
            </View>
            <View className='flex-1 bg-white mt-5'>

                {loading && Array.from({ length: 3 }).map((item, index) => <CardSkeleton key={index} />)}
                <FlatList
                    data={results}
                    ListEmptyComponent={() => !loading && <NoResults />}
                    renderItem={({ item }) => {

                        // Validate item ID format
                        const isValidUUID = item.id && UUID_REGEX.test(item.id);

                        // Determine if this is a service or sale item
                        const isSale = 'seller_id' in item;

                        console.log('Item data:', {
                            id: item.id,
                            isValidUUID,
                            title: item.title,
                            type: isSale ? 'sale' : 'service'
                        });

                        if (isSale) {
                            return <SalesCard
                                key={item.id}
                                title={item.title}
                                description={item.description}
                                price={`${item.price}€`}
                                rating={item.rating || 0}
                                image={item.photos[0] || "/placeholder.svg"}
                                seller={item.seller?.first_name}
                                category={item.category?.name}
                                subcategory={item.subcategory?.name}
                                isBlurred={!isValidUUID}
                                saleId={isValidUUID ? item.id : undefined}
                            />
                        } else {
                            return <ServiceCard
                                title={item?.title}
                                image={item?.photos?.[0] || "https://via.placeholder.com/150"}
                                tags={[item?.category?.name, item?.subcategory?.name].filter(Boolean)}
                                description={item?.description}
                                providerName={item?.provider ? `${item?.provider?.first_name} ${item?.provider?.last_name}` : ""}
                                providerImage={item?.provider?.profile_picture_url || "https://via.placeholder.com/50"}
                                price={`${item?.price}€`}
                                onChatPress={() => { }}
                                onReservePress={() => console.log("Reserve pressed for", item?.title)}
                                onPress={() => navigate("ServiceDetails")}
                                isBlurred={!isValidUUID}
                                serviceId={isValidUUID ? item.id : undefined}
                            />;
                        }
                    }
                    }
                />
            </View>
        </CustomSafeAreaView >
    )
}

function NoResults() {
    return (
        <View className='mt-6'>
            <Image source={require("@/assets/images/no-result.png")} style={{
                width: 300,
                height: 200,
                resizeMode: 'contain',
                marginBottom: 20,
            }} />
            <Text className='text-center font-semibold mb-1 text-lg leading-tight'>Aucune prestation ne correspond à vos critères de recherche.</Text>
            <Text className='text-sm text-muted-foreground text-center'>Essayez de modifier vos filtres pour trouver plus de résultats.</Text>
        </View>)
}

export default SearchFilterScreen