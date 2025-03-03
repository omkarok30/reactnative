import { View, TouchableOpacity, ActivityIndicator, FlatList, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useSharedValue } from 'react-native-reanimated'
import { Text } from '../ui/text';
import { recentSales } from '@/utils/dummyData';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel'
import { screenWidth } from '@/utils/Scaling';
import { FeaturedCard } from '../servicesCards/RecentSalesCard';
import { Colors } from '@/utils/Constants';
import { H4 } from '../ui/typography';

const RecentSalesSection = () => {

    const progress = useSharedValue<number>(0);
    const ref = React.useRef<ICarouselInstance>(null); const [cardHeight, setCardHeight] = React.useState(300); // Default height (fallback)

    const baseOptions = {
        vertical: false,
        width: screenWidth,
        height: cardHeight, // ✅ Dynamic height
    };

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            count: index - progress.value,
            animated: true,
        });
    };
    return (
        <View className="my-5 bg-gray-50 py-6">
            <View className="flex flex-row items-center justify-between px-4">
                <H4 className="text-black-300 font-bold">
                    Ventes récentes
                </H4>
                <TouchableOpacity>
                    <Text className="text-sm font-bold text-[#C69F4A]">
                        See all
                    </Text>
                </TouchableOpacity>
            </View>

            {false ? (
                <ActivityIndicator size="large" className="text-primary-300" />
            ) : !recentSales || recentSales.length === 0 ? (
                <Text className="text-center text-black-300 mt-5">No records found</Text>
            ) : (
                <>
                    <Carousel
                        {...baseOptions}
                        loop
                        pagingEnabled
                        snapEnabled
                        autoPlay
                        autoPlayInterval={3000}
                        onProgressChange={(_, absoluteProgress) => {
                            progress.value = absoluteProgress; // ✅ Correctly updates progress
                        }}
                        mode="parallax"
                        data={recentSales}
                        modeConfig={{
                            parallaxScrollingScale: 0.8,
                            parallaxAdjacentItemScale: 0.6
                            // parallaxScrollingOffset: 50, // Adjust spacing between items
                        }}
                        renderItem={({ item }) => (
                            <View onLayout={(event) => {
                                const { height } = event.nativeEvent.layout;
                                setCardHeight(height); // ✅ Capture card height dynamically
                            }}>
                                <FeaturedCard
                                    image={item.image}
                                    onPress={() => { }}
                                    title={item.title}
                                    description={item.description}
                                    price={item.price}
                                    rating={item.rating}
                                    seller={item.seller} />
                            </View>
                        )}
                    />
                    <Pagination.Basic<{ index: number }>
                        progress={progress}
                        data={recentSales.map((_, index) => ({ index }))}
                        dotStyle={{
                            width: 25,
                            height: 4,
                            backgroundColor: Colors.primary_opacity,
                        }}
                        activeDotStyle={{
                            overflow: "hidden",
                            backgroundColor: Colors.primary_dark,
                        }}
                        containerStyle={{
                            gap: 10,
                            marginBottom: 10,
                        }}
                        horizontal
                        onPress={onPressPagination}
                    />
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    shadowContainer: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5, // Android shadow
        backgroundColor: "white", // Required for shadow to be visible
        borderRadius: 10, // Optional for rounded shadow
    },
});

export default RecentSalesSection