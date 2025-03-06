import { View, } from 'react-native'
import { Skeleton } from '../ui/skeleton'

const CardSkeleton = () => {
    return (
        <View className="border-gray-400 border-1 rounded-2xl shadow-xl shadow-gray-400 mx-4 mb-6 pb-1 bg-white">
            {/* Service Image Skeleton */}
            <Skeleton className="w-full rounded-tl-2xl rounded-tr-2xl" />

            <View className="px-4">
                {/* Title Skeleton */}
                <Skeleton className="h-6 w-3/4 mt-3 rounded-md" />

                {/* Tags Skeleton */}
                <View className="flex-row flex-wrap mt-1">
                    {[...Array(3)].map((_, index) => (
                        <Skeleton key={index} className="h-5 w-16 rounded-full mr-2 mb-2" />
                    ))}
                </View>

                {/* Description Skeleton */}
                <Skeleton className="h-4 w-full mt-2 rounded-md" />
                <Skeleton className="h-4 w-5/6 mt-1 rounded-md" />

                {/* Provider Info Skeleton */}
                <View className="flex-row items-center mt-3 gap-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 w-24 rounded-md" />
                </View>
            </View>

            {/* Footer Skeleton */}
            <View className="flex-row items-center justify-between mt-4 px-4 border-t border-gray-200 py-2">
                {/* Price Skeleton */}
                <Skeleton className="h-6 w-16 rounded-md" />

                {/* Buttons Skeleton */}
                <View className="flex-row items-center gap-x-2">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <Skeleton className="h-10 w-24 rounded-lg" />
                </View>
            </View>
        </View>

    )
}

export default CardSkeleton