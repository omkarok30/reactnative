// import {
//     Dimensions,
//     FlatList,
//     Image,
//     Platform,
//     ScrollView,
//     TouchableOpacity,
//     View
// } from "react-native";
// import React, { FC } from "react";
// import { goBack } from "@utils/NavigationUtils";
// import Icon from "react-native-vector-icons/Ionicons";
// import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
// import { Text } from "@components/ui/text";

// export const facilities = [
//     {
//         title: "Laundry",
//         icon: "https://via.placeholder.com/50", // Placeholder icon
//     },
//     {
//         title: "Car Parking",
//         icon: "https://via.placeholder.com/50",
//     },
//     {
//         title: "Sports Center",
//         icon: "https://via.placeholder.com/50",
//     },
//     {
//         title: "Cutlery",
//         icon: "https://via.placeholder.com/50",
//     },
//     {
//         title: "Gym",
//         icon: "https://via.placeholder.com/50",
//     },
//     {
//         title: "Swimming Pool",
//         icon: "https://via.placeholder.com/50",
//     },
//     {
//         title: "WiFi",
//         icon: "https://via.placeholder.com/50",
//     },
//     {
//         title: "Pet Center",
//         icon: "https://via.placeholder.com/50",
//     },
// ];


// export const gallery = [
//     {
//         id: 1,
//         image: "https://via.placeholder.com/400", // Placeholder image
//     },
//     {
//         id: 2,
//         image: "https://via.placeholder.com/400",
//     },
//     {
//         id: 3,
//         image: "https://via.placeholder.com/400",
//     },
//     {
//         id: 4,
//         image: "https://via.placeholder.com/400",
//     },
//     {
//         id: 5,
//         image: "https://via.placeholder.com/400",
//     },
//     {
//         id: 6,
//         image: "https://via.placeholder.com/400",
//     },
// ];


// const imageUrl = "https://via.placeholder.com/800"; // Dummy image

// const ServiceDetails: FC = () => {
//     const windowHeight = Dimensions.get("window").height;

//     return (
//         <View>
//             <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-32 bg-white">
//                 <View className="relative w-full" style={{ height: windowHeight / 2 }}>
//                     <Image source={{ uri: imageUrl }} className="size-full" resizeMode="cover" />
//                     {/* <Image source={require("@assets/images/white-gradient.png")} className="absolute top-0 w-full z-40" /> */}

//                     <View
//                         className="z-50 absolute inset-x-7"
//                         style={{ top: Platform.OS === "ios" ? 70 : 20 }}
//                     >
//                         <View className="flex flex-row items-center w-full justify-between">
//                             <TouchableOpacity
//                                 onPress={() => goBack()}
//                                 className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
//                             >
//                                 <Icon name="arrow-back-outline" size={24} color="#000" />
//                             </TouchableOpacity>

//                             <View className="flex flex-row items-center gap-3">
//                                 <Icon name="heart-outline" size={24} color="#191D31" />
//                                 <Icon name="send-outline" size={24} color="#191D31" />
//                             </View>
//                         </View>
//                     </View>
//                 </View>

//                 <View className="px-5 mt-7 flex gap-2">
//                     <Text className="text-2xl font-rubik-extrabold">Aide-ménagère</Text>

//                     <View className="flex flex-row items-center gap-3">
//                         <View className="flex flex-row items-center px-4 py-2 bg-primary-100 rounded-full">
//                             <Text className="text-xs font-rubik-bold text-primary-300">
//                                 Services Domestiques
//                             </Text>
//                         </View>

//                         <View className="flex flex-row items-center gap-2">
//                             <Icon name="star-outline" size={20} color="#FFD700" />
//                             <Text className="text-black-200 text-sm mt-1 font-rubik-medium">4 (256 reviews)</Text>
//                         </View>
//                     </View>

//                     <View className="w-full border-t border-primary-200 pt-7 mt-5">
//                         <Text className="text-black-300 text-xl font-rubik-bold">Facilities</Text>

//                         {facilities.length > 0 && (
//                             <View className="flex flex-row flex-wrap items-start justify-start mt-2 gap-5">
//                                 {facilities.map((item, index) => (
//                                     <View key={index} className="flex flex-1 flex-col items-center min-w-16 max-w-20">
//                                         <View className="size-14 bg-primary-100 rounded-full flex items-center justify-center">
//                                             <Image source={{ uri: item.icon }} className="size-6" />
//                                         </View>

//                                         <Text numberOfLines={1} ellipsizeMode="tail" className="text-black-300 text-sm text-center font-rubik mt-1.5">
//                                             {item.title}
//                                         </Text>
//                                     </View>
//                                 ))}
//                             </View>
//                         )}
//                     </View>

//                     {gallery.length > 0 && (
//                         <View className="mt-7">
//                             <Text className="text-black-300 text-xl font-rubik-bold">Gallery</Text>
//                             <FlatList
//                                 contentContainerStyle={{ paddingRight: 20 }}
//                                 data={gallery}
//                                 keyExtractor={(item) => String(item.id)}
//                                 horizontal
//                                 showsHorizontalScrollIndicator={false}
//                                 renderItem={({ item }) => (
//                                     <Image
//                                         source={typeof item.image === "string" ? { uri: item.image } : item.image}
//                                         className="size-40 rounded-xl"
//                                     />
//                                 )}
//                                 contentContainerClassName="flex gap-4 mt-3"
//                             />
//                         </View>
//                     )}
//                 </View>
//             </ScrollView>

//             <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200 p-7">
//                 <View className="flex flex-row items-center justify-between gap-10">
//                     <View className="flex flex-col items-start">
//                         <Text className="text-black-200 text-xs font-rubik-medium">Price</Text>
//                         <Text numberOfLines={1} className="text-primary-300 text-start text-2xl font-rubik-bold">
//                             $60
//                         </Text>
//                     </View>

//                     <TouchableOpacity className="flex-1 flex flex-row items-center justify-center bg-primary-300 py-3 rounded-full shadow-md shadow-zinc-400">
//                         <Text className="text-white text-lg text-center font-rubik-bold">Book Now</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </View>
//     );
// };

// export default ServiceDetails;
import { View, Text } from 'react-native'
import React from 'react'

const ServiceDetails = () => {
  return (
    <View>
      <Text>ServiceDetails</Text>
    </View>
  )
}

export default ServiceDetails