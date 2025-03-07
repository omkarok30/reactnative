import { View, Text } from 'react-native'
import React from 'react'
import { Skeleton } from '../ui/skeleton'

const CategoryListLoader = () => {
    return (
        <View className="px-4 flex-1 flex-grow flex-col mt-16 items-center">
            {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                    key={index}
                    className={`h-12 mt-1 rounded-md bg-gray-200`}
                    style={{ width: `${90 - index * 10}%` }} // Reduce width by 10% for each item
                />
            ))}
        </View>
    )
}

export default CategoryListLoader