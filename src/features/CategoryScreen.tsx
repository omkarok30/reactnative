import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import { useCategories } from '@/hooks/api/useCategories'
import { Ionicons } from '@expo/vector-icons'
import CategoryListLoader from '@/components/loaders/CategoryListLoader'

const CategoryScreen = () => {
    const { data: categories, isLoading, isError } = useCategories('service')
    return (
        <View className='px-4 my-8 flex-1'>
            {isLoading ? <ActivityIndicator size='large' /> : <FlatList
                data={categories}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => `${item.id}`}
                contentContainerStyle={{ backgroundColor: 'transparent', flexGrow: 1, borderRightColor: 'red', height: 100 }}
                renderItem={({ item }) => (
                    <>

                        <View className='flex-grow px-4 py-5 rounded-xl flex-row items-center justify-between w-full mb-3 bg-primary/20'>
                            <Text className='font-semibold text-left'>
                                {item.name}
                            </Text>
                            <Ionicons name='arrow-forward-outline' size={20} />
                        </View>

                    </>
                )}
                contentContainerClassName="bg-white"
            />}
        </View>
    )
}

export default CategoryScreen