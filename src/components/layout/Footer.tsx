import { H2, H3, H4 } from '@/components/ui/typography';
import { Colors } from '@/utils/Constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text } from 'react-native';
import CustomSafeAreaView from '../global/CustomSafeView';

const Footer: React.FC = () => {
    return (
        <CustomSafeAreaView>
            <View className="px-4 py-12 bg-gray-200 blur-2xl">
                <H3 className="mb-8 text-center dark:text-white border-b-0">
                    Pourquoi nous faire confiance
                </H3>

                <View className="gap-8 flex flex-col md:flex-row">
                    <TrustItem
                        Icon={Ionicons} // ✅ Pass the component instead of a string
                        iconName="shield-outline"
                        title="Prestataires vérifiés"
                        description="Tous nos prestataires sont soigneusement sélectionnés et vérifiés"
                    />

                    <TrustItem
                        Icon={Ionicons}
                        iconName="star-outline"
                        title="Service de qualité"
                        description="Des prestations de qualité garanties par nos avis clients"
                    />

                    <TrustItem
                        Icon={Ionicons}
                        iconName="time-outline"
                        title="Réservation simple"
                        description="Réservez en quelques clics, 24h/24 et 7j/7"
                    />
                </View>
            </View>
        </CustomSafeAreaView>
    );
};

const TrustItem = ({
    Icon, // ✅ Now it expects a component
    iconName,
    title,
    description
}: {
    Icon: typeof Ionicons; // ✅ Expecting an Icon component
    iconName: string;
    title: string;
    description: string;
}) => (
    <View className="items-center">
        <View className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray/5">
            <Icon name={iconName as keyof typeof Icon.glyphMap} size={24} color={Colors.primary_dark} className="text-primary dark:text-primary stroke-md" />
        </View>
        <H4 className="mb-2 dark:text-white">{title}</H4>
        <Text className="text-gray-600 dark:text-gray-300 text-center">{description}</Text>
    </View>
);

export default Footer;
