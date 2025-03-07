// // import { Input } from '@components/ui/input';
// // import { Colors } from '@utils/Constants';
// // import { navigate } from '@utils/NavigationUtils';
// // import { screenWidth } from '@utils/Scaling';
// // import React, { useEffect, useState } from 'react';
// // import { View, Text, TextInput, FlatList, Image, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

// // import Icon from "react-native-vector-icons/Ionicons";
// const contactsData = [
//   {
//     id: '1',
//     name: 'John Doe',
//     avatar: require("@assets/images/avatar.png"),
//     lastMessage: 'Hey, how are you?',
//     lastMessagetTime: '10:30 AM',
//     messageInQueue: '1',
//     time: '10:30 AM',
//     isOnline: true,
//   },
//   {
//     id: '2',
//     name: 'Jane Smith',
//     avatar: require("@assets/images/avatar.png"),
//     lastMessage: 'Let’s catch up later!',
//     lastMessagetTime: 'Yesterday',
//     messageInQueue: '4',
//     time: 'Yesterday',
//     isOnline: false,
//   },
//   {
//     id: '3',
//     name: 'Bob Johnson',
//     avatar: require("@assets/images/avatar.png"),
//     lastMessage: 'Hi, how are you?',
//     lastMessagetTime: '9:30 AM',
//     messageInQueue: '0',
//     time: '9:30 AM',
//     isOnline: true,
//   }
// ];

// import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView, StatusBar, StyleSheet } from 'react-native'
// import React, { useState } from 'react'
// import ScreenComponent from '@/components/global/ScreenComponent'
// import { PageHeader } from '@/components/layout/PageHeader'
// import CustomSafeAreaView from '@/components/global/CustomSafeView'
// import { navigate } from '@/utils/NavigationUtils';
// import { screenWidth } from '@/utils/Scaling';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { Input } from '@/components/ui/input';
// import SearchBar from '@/components/layout/SearchBar';

// const MessageScreen = () => {
//   const [search, setSearch] = useState("");
//   const [filterUser, setFilterUser] = useState(contactsData);

//   const handleSearch = (text: string) => {
//     setSearch(text);

//     const filteredData = contactsData.filter((contact) =>
//       contact.name.toLowerCase().includes(text.toLowerCase())
//     );

//     setFilterUser(filteredData)
//   };

//   const renderItem = ({ item, index }: any) => (
//     <TouchableOpacity key={item.id} onPress={() => navigate("Chat", { userName: item.name })} style={[styles.userContainer, index % 2 === 0 ? styles.oddBackground : null]}>
//       <View style={styles.userImageContainer}>
//         {item.isOnline && item.isOnline === true && (<View style={styles.onlineIndicator} />)}

//         <Image source={item.avatar} resizeMode='contain' style={styles.userImage} />
//       </View>

//       <View style={{ flexDirection: 'row', width: screenWidth - 104 }}>
//         <View style={styles.userInfoContainer}>
//           <Text style={styles.userName}>{item.name}</Text>
//         </View>

//         <View style={{
//           position: 'absolute',
//           right: 4,
//           alignItems: 'center'
//         }}>
//           <Text style={styles.lastMessageTime}>{item.time}</Text>
//           <View>


//             <TouchableOpacity style={{
//               width: 20,
//               height: 20,
//               borderRadius: 10,
//               backgroundColor: item.messageInQueue ? Colors.primary : 'transparent',
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginTop: 12
//             }}>
//               <Text style={styles.messageInQueue}>{item.messageInQueue}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View >
//     </TouchableOpacity >)

//   const renderContent = () => {
//     return (
//       <View>
//         <View style={styles.searchBar}>

//           <SearchBar />
//         </View>

//         <View>
//           <FlatList
//             data={filterUser}
//             showsVerticalScrollIndicator={false}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id.toString()}
//           />
//         </View>
//       </View>
//     )
//   }

//   return (
//     <SafeAreaView style={styles.area} >
//       {/* <StatusBar hidden /> */}
//       <View style={styles.container} >
//         {renderContent()}
//       </View >
//     </SafeAreaView >
//   )
// }

// const styles = StyleSheet.create({
//   area: {
//     flex: 1,
//     backgroundColor: Colors.backgroundSecondary,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: Colors.backgroundSecondary,
//     paddingTop: StatusBar.currentHeight,
//   },
//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     backgroundColor: Colors.secondary,
//     width: screenWidth - 32,
//     height: 50,
//     marginVertical: 22,
//   },
//   searchInput: {
//     flex: 1,
//     height: "100%",
//     fontSize: 16,
//     color: Colors.backgroundLight,
//     marginHorizontal: 12,
//   },
//   userContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomColor: Colors.border,
//     borderBottomWidth: 1
//   },
//   userImageContainer: {
//     paddingVertical: 15,
//     marginRight: 22,
//   },
//   onlineIndicator: {
//     height: 14,
//     width: 14,
//     borderRadius: 7,
//     backgroundColor: Colors.primary,
//     position: 'absolute',
//     top: 14,
//     right: 2,
//     zIndex: 999,
//     borderWidth: 2,
//     borderColor: Colors.border
//   },
//   userImage: {
//     height: 50,
//     width: 50,
//     borderRadius: 25,
//   },
//   userInfoContainer: {
//     flexDirection: 'column',
//   },
//   oddBackground: {
//     backgroundColor: Colors.backgroundLight,
//   },
//   userName: {
//     fontSize: 14,
//     fontFamily: 'semiBold',
//     color: Colors.primary_dark,
//     marginBottom: 4
//   },
//   lastMessageTime: { fontSize: 12, color: Colors.primary_light },
//   messageInQueue: {
//     fontSize: 12,
//     fontFamily: 'regular',
//     color: "white",
//   }
// });

// export default MessageScreen

import { View, Text, SafeAreaView, StatusBar, FlatList, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import ScreenComponent from '@/components/global/ScreenComponent'
import CustomSafeAreaView from '@/components/global/CustomSafeView'
import SearchBar from '@/components/layout/SearchBar'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Input } from '@/components/ui/input'
import { conversations } from '@/utils/dummyData'
import ConversationsList from '@/components/messages/ConversationsList'
import useDebounce from '@/hooks/useDebounce'
import { Colors } from '@/utils/Constants'
import { useAuthStore } from '@/store/useAuthStore'
import { useConversationFetching } from '@/hooks/conversations/useConversationFetching'
import { Conversation } from '@/types/conversations'
import CategoryListLoader from '@/components/loaders/CategoryListLoader'

const MessageScreen = () => {
  const user = useAuthStore(state => state.user); // ✅ Get user from Zustand
  const { data: conversations, isLoading } = useConversationFetching(user?.id);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 300); // Debounce to optimize filtering 

  const filteredConversations = conversations ? conversations?.filter((conversation) =>
    conversation.participants.some((participant: any) =>
      `${participant?.first_name} ${participant?.last_name}`
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    )
  ) : [];

  // console.log("filteredConversations", JSON.stringify(filteredConversations));
  return (
    <CustomSafeAreaView>
      <PageHeader title='Messages' />
      <View className='px-4 bg-gray-100 mb-4'>
        <View className="flex-row items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-1 mt-4">
          <View className="flex-1 flex flex-row items-center justify-start z-50 ">
            <Ionicons name="search" size={(20)} className="text-gray-600" />
            <Input
              value={search}
              onChangeText={(value: string) => setSearch(value)}
              placeholder="Search contact..."
              className="placeholder:text-gray-400 ml-2 flex-1 border-0 text-sm"
            />
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {(filteredConversations && filteredConversations.length === 0) && (
          <View className="flex-1 items-center justify-center">
            <Ionicons name="chatbox-ellipses-outline" size={48} color={Colors.border} className="text-gray-500 dark:text-gray-500" />
            <Text className="text-gray-500 dark:text-gray-400 text-center font-semibold mt-3">
              {search
                ? "Aucune conversation ne correspond à votre recherche"
                : "Aucune conversation pour le moment"}
            </Text>
          </View>
        )
        }
        {user && <ConversationsList conversations={filteredConversations} isLoading={isLoading} currentUserId={user?.id} />}
      </View>

    </CustomSafeAreaView>
  )
}

export default MessageScreen