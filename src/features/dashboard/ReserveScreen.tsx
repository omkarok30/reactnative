// import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';
// import React from 'react';
// import Header from '@components/layout/header/Header';
// import VentesCategory from '../../components/dashboard/VentesCategory';
// import { navigate } from '@utils/NavigationUtils';
// import ServiceCard from '@components/servicesCards/ServiceCard';
// import { H3 } from '@components/ui/typography';
// import { Text } from '@components/ui/text';
// import { servicesData } from '@utils/dummyData';
// import RecentSalesSection from '../../components/dashboard/RecentSalesSection';
// import TopServicesSection from '../../components/dashboard/TopServicesSection';
// import Footer from '@components/layout/Footer';
// import { Button } from '@components/ui/button';
// import { showToast } from '@utils/toast';

// const ReserveScreen = () => {
//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       <FlatList
//         data={servicesData}
//         keyExtractor={(item) => item.id}
//         contentContainerClassName="pb-24 bg-white"
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={<Text className="text-center pb- text-black-300 mt-5">No records found</Text>}
//         horizontal={false}
//         ListHeaderComponent={
//           <>
//             <Header showNotice={() => { }} />

//             <VentesCategory />

//             <View className="my-5 px-4">
//               <View className="flex flex-row items-center justify-between">
//                 <H3 className="text-black-300">
//                   Services populaires
//                 </H3>
//                 <TouchableOpacity>
//                   <Text className="text-base text-[#C69F4A]" fontWeight="bold">
//                     See all
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </>
//         }

//         renderItem={({ item }) => (
//           <ServiceCard
//             title={item.title}
//             image={item.photos?.[0] || "https://via.placeholder.com/150"}
//             tags={[item.category?.name, item.subcategory?.name].filter(Boolean)}
//             description={item.description}
//             providerName={`${item.provider.first_name} ${item.provider.last_name}`}
//             providerImage={item.provider.profile_picture_url || "https://via.placeholder.com/50"}
//             price={`${item.price}`}
//             onChatPress={() => console.log("Chat pressed for", item.title)}
//             onReservePress={() => console.log("Reserve pressed for", item.title)}
//             onPress={() => navigate("ServiceDetails")}
//           />
//         )}

//         ListFooterComponent={
//           <>
//             <RecentSalesSection />

//             <TopServicesSection />

//             <Footer />
//           </>
//         }
//       />
//     </SafeAreaView>
//   );
// };

// export default ReserveScreen;
import { View, Text, StatusBar, ScrollView, FlatList, TouchableOpacity, Animated } from 'react-native'
import React, { useRef } from 'react'
import CustomSafeAreaView from '@/components/global/CustomSafeView'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { CustomScrollView } from '@/components/global/CustumScrollView';
import VentesCategory from '@/components/dashboard/VentesCategory';
import { servicesData } from '@/utils/dummyData';
import { H3, H4 } from '@/components/ui/typography';
import ServiceCard from '@/components/servicesCards/ServiceCard';
import { navigate } from '@/utils/NavigationUtils';
import RecentSalesSection from '@/components/dashboard/RecentSalesSection';
import TopServicesSection from '@/components/dashboard/TopServicesSection';

const ReserveScreen = () => {
  const insets = useSafeAreaInsets(); // Get safe area insets

  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  return (
    <CustomSafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content" // or "light-content" depending on your theme
        backgroundColor="transparent"
        translucent={true} // Makes the status bar transparent
      />

      <Header showNotice={() => { }} value={scrollOffsetY} />

      <FlatList
        data={servicesData}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          {
            useNativeDriver: false,
          },
        )}
        keyExtractor={(item) => item.id}
        contentContainerClassName="bg-white"
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text className="text-center pb-3 text-black-300 mt-5">No records found</Text>}
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
          <ServiceCard
            title={item.title}
            image={item.photos?.[0] || "https://via.placeholder.com/150"}
            tags={[item.category?.name, item.subcategory?.name].filter(Boolean)}
            description={item.description}
            providerName={`${item.provider.first_name} ${item.provider.last_name}`}
            providerImage={item.provider.profile_picture_url || "https://via.placeholder.com/50"}
            price={`${item.price}€`}
            onChatPress={() => console.log("Chat pressed for", item.title)}
            onReservePress={() => console.log("Reserve pressed for", item.title)}
            onPress={() => navigate("ServiceDetails")}
          />
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