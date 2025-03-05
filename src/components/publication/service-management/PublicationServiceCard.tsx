import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H3, P } from "@/components/ui/typography";
import { Colors } from "@/utils/Constants";
import { navigate } from "@/utils/NavigationUtils";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Image, View } from "react-native";

interface Item {
    id: string;
    title: string;
    description: string;
    price: number;
    photos: string[];
}

interface PublicationItemCardProps<T extends Item> {
    items: T[];
    onDelete: (id: string) => void;
}

export function PublicationServiceCard<T extends Item>({ items, onDelete }: PublicationItemCardProps<T>) {
    return (
        <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
                <View className="px-4 flex-1 flex-col justify-center items-center h-12">
                    <Ionicons name="alert-circle" color={Colors?.primary_opacity} size={40} />
                    <Text className="text-center pb-3 text-gray-500 mt-2 text-lg">Aucune annonce trouvée</Text>
                </View>
            }
            renderItem={({ item }) => <ItemCard item={item} onDelete={onDelete} />}
        />
    );
}

function ItemCard<T extends Item>({ item, onDelete }: { item: T; onDelete: (id: string) => void }) {
    return (
        <View className="rounded-lg bg-white mb-4">
            {item.photos && item.photos.length > 0 && (
                <Image
                    source={{ uri: item.photos[0] }}
                    alt={item.title}
                    style={{ width: '100%', height: 240, resizeMode: 'contain' }}
                    className="w-full h-32 rounded-md"
                />
            )}
            <View className="flex flex-col gap-2 pt-2 pb-4 overflow-hidden bg-gray-200">
                <View className="px-4">
                    <H3 className="font-medium text-foreground">{item.title}</H3>
                    <P className="text-muted-foreground line-clamp-2">{item.description}</P>
                    <P className="font-medium text-primary">{item.price} €</P>
                </View>

                <View className="flex-row gap-x-4 mt-2 px-4">
                    <Button onPress={() => navigate("")} className=" flex-1">
                        <Text className="text-white">Modifier</Text>
                    </Button>
                    <Button variant="destructive" onPress={() => onDelete(item.id)} className=" flex-1">
                        <Text>Supprimer</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
}
