
import CustomSafeAreaView from "@/components/global/CustomSafeView";
import { PageHeader } from "@/components/layout/PageHeader";
import ServiceList from "@/components/publication/service-management/PublicationServiceList";
import { H4 } from "@/components/ui/typography"
import { View } from "react-native";

const MyPublications = () => {
    return (
        <CustomSafeAreaView style={{ flex: 1 }}>
            <PageHeader title="Mes annonces de services" backUrl />
            <View className="mt-4 px-4 flex-1">
                <H4 className="text-black-300 font-bold">My Publications</H4>
                <ServiceList />
            </View>
        </CustomSafeAreaView>
    )
}

export default MyPublications