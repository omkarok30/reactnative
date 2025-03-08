import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomSafeAreaView from '@/components/global/CustomSafeView'
import { PageHeader } from '@/components/layout/PageHeader'
import ServiceCard from '@/components/servicesCards/ServiceCard'
import { H4 } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '@/utils/Constants'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { navigate } from '@/utils/NavigationUtils'
import { useAuthStore } from '@/store/useAuthStore'
import { useFetchAllServices } from '@/hooks/api/useFetchAllServices'
import CardSkeleton from '@/components/loaders/CardSkeleton'
import NoResults from '@/components/NoResults'

const PublishScreen = () => {
    const user = useAuthStore(state => state?.user);
    const { data = [], isLoading, isError } = useFetchAllServices();
    const servicesData = Array.isArray(data) && user ? data.filter((item) => item.provider_id !== user.id) : []
    const [view, setView] = useState<"default" | "choose">("default");
    return (
        <CustomSafeAreaView style={{ flex: 1 }}>
            <PageHeader title='Que souhaitez-vous publier ?' />
            <View className="flex-1">
                <View className="px-4 py-6 shadow-md">
                    {view === "default" ? (
                        <View className='flex-row items-center flex-wrap gap-x-4'>
                            <Button variant="outline" className="flex-row flex-1 gap-1 items-center" onPress={() => navigate("MyPublication")}>
                                <Ionicons name="list" size={21} color={Colors.primary} />
                                <Text className="text-foreground font-semibold text-sm">Mes annonces</Text>
                            </Button>
                            <Button variant="outline" className="flex-row flex-1 gap-1 items-center" onPress={() => setView("choose")}>
                                <Ionicons name="add-circle-outline" size={21} color={Colors.primary} />
                                <Text className="text-foreground font-semibold text-sm">Nouvelle annonce</Text>
                            </Button>
                        </View>
                    ) : (
                        <View className="flex flex-col gap-4">
                            {/* Back Button */}
                            <Button onPress={() => setView("default")} variant="outline" size='icon' className="flex-row gap-1 items-center w-32">
                                <MaterialCommunityIcons name="arrow-left-thin" size={24} color={Colors.primary} />
                                <Text className="text-foreground font-semibold text-sm">Retour</Text>
                            </Button>

                            {/* Two Options in Row */}
                            <View className="flex-row gap-4">
                                {/* Proposer un service */}
                                <TouchableOpacity className="flex-1 bg-white px-1 py-2 rounded-lg shadow-md items-center border-2 border-primary" onPress={() => navigate("Addservice", { id: user?.id ?? undefined })}>
                                    <MaterialCommunityIcons name="hammer-wrench" size={24} color={Colors.primary} />
                                    <Text className="text-foreground font-semibold text-sm mt-2">Proposer un service</Text>
                                </TouchableOpacity>

                                {/* Publier une vente */}
                                <TouchableOpacity className="flex-1 bg-white px-1 py-2 rounded-lg shadow-md items-center border-2 border-primary" onPress={() => navigate("Addsale", { id: user?.id ?? undefined })}>
                                    <MaterialCommunityIcons name="shopping" size={24} color={Colors.primary} />
                                    <Text className="text-foreground font-semibold text-sm mt-2">Publier une vente</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>

                <FlatList
                    data={servicesData}
                    keyExtractor={(item) => item?.id}
                    contentContainerStyle={{ paddingBottom: 60 }}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Text className="text-center pb-3 text-black-300 mt-5">No records found</Text>}
                    horizontal={false}
                    renderItem={({ item }) => (
                        <>
                            {isLoading ? <CardSkeleton /> :
                                (!servicesData) ? (
                                    <NoResults />
                                ) : (<ServiceCard
                                    title={item?.title}
                                    image={item?.photos?.[0] || "https://via.placeholder.com/150"}
                                    tags={[item?.category?.name, item?.subcategory?.name].filter(Boolean)}
                                    description={item?.description}
                                    providerName={`${item?.provider?.first_name} ${item?.provider?.last_name}`}
                                    providerImage={item?.provider?.profile_picture_url || "https://via.placeholder.com/50"}
                                    price={`${item?.price}€`}
                                    onChatPress={() => console.log("Chat pressed for", item?.title)}
                                    onReservePress={() => console.log("Reserve pressed for", item?.title)}
                                />)}
                        </>

                    )}
                    ListHeaderComponent={
                        <View className="my-5 px-4">
                            <View className="flex flex-row items-center justify-between">
                                <H4 className="text-black-300 font-bold">
                                    Toutes les annonces
                                </H4>
                            </View>
                        </View>
                    }
                />
            </View>
        </CustomSafeAreaView >
    )
}

export default PublishScreen