import { View, Text } from 'react-native'
import React from 'react'
import { Skeleton } from '../ui/skeleton'

const CategoryListLoader = () => {
    return (
        <View className="px-4 flex-1 flex-grow h-screen bg-red-400">
            {/* Title Skeleton */}
            <Skeleton className="h-12 w-3/4 mt-3 rounded-md" />
            <Skeleton className="h-6 w-3/4 mt-3 rounded-md" />
            <Skeleton className="h-6 w-3/4 mt-3 rounded-md" />
            <Skeleton className="h-6 w-3/4 mt-3 rounded-md" />
        </View>
    )
}

export default CategoryListLoader