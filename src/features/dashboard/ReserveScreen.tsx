import { View, Text, StatusBar, FlatList, TouchableOpacity, Animated } from 'react-native'
import React, { useRef } from 'react'
import CustomSafeAreaView from '@/components/global/CustomSafeView'
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import VentesCategory from '@/components/dashboard/VentesCategory';
import { H4 } from '@/components/ui/typography';
import ServiceCard from '@/components/servicesCards/ServiceCard';
import { navigate } from '@/utils/NavigationUtils';
import RecentSalesSection from '@/components/dashboard/RecentSalesSection';
import TopServicesSection from '@/components/dashboard/TopServicesSection';
import { useFetchAllServices } from '@/hooks/api/useFetchAllServices';
import CardSkeleton from '@/components/loaders/CardSkeleton';
import NoResults from '@/components/NoResults';
import CategoryScreen from '../CategoryScreen';
import useAuthCheckAction from '@/hooks/useAuthCheckAction';

function ReserveScreen() {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const checkAuthAction = useAuthCheckAction();
  const { data: servicesData = [], isLoading, isError } = useFetchAllServices();

  const handleChatWithProvider = () => {
    if (!checkAuthAction()) return;
    console.log("Start Conversation")
  }
console.log(servicesData)
  return (
    <CustomSafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content" // or "light-content" depending on your theme
        backgroundColor="transparent"
        translucent={true} // Makes the status bar transparent
      />

      <Header showNotice={() => { }} value={scrollOffsetY} />

      <FlatList
        data={Array.isArray(servicesData) ? servicesData : []}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          {
            useNativeDriver: false,
          },
        )}
        keyExtractor={(item) => item?.id}
        contentContainerClassName="bg-white"
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<>{isLoading && <CardSkeleton />}</>}
        horizontal={false}
        ListHeaderComponent={
          <>
            <VentesCategory />

            <View className="my-5 px-4">
              <View className="flex flex-row items-center justify-between">
                <H4 className="text-black-300 font-bold">
                  Services populaires
                </H4>
                <TouchableOpacity>
                  <Text className="text-sm font-bold text-[#C69F4A]">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <>{
            (isLoading || !item) ? <CardSkeleton /> :
              (!servicesData) ? (
                <NoResults />
              ) : (<ServiceCard
                title={item?.title}
                image={item?.photos?.[0] || "https://via.placeholder.com/150"}
                tags={[item?.category?.name, item?.subcategory?.name].filter(Boolean)}
                description={item?.description}
                providerName={item?.provider ? `${item?.provider?.first_name} ${item?.provider?.last_name}` : ""}
                providerImage={item?.provider?.profile_picture_url || "https://via.placeholder.com/50"}
                price={`${item?.price}€`}
                onChatPress={() => handleChatWithProvider()}
                onReservePress={() => console.log("Reserve pressed for", item?.title)}
                onPress={() => navigate("ServiceDetails")}
              />)
          }</>
        )}

        ListFooterComponent={
          <>
            <RecentSalesSection />

            <TopServicesSection />

            <Footer />
          </>
        }
      />
    </CustomSafeAreaView>
  )
}

export default ReserveScreen