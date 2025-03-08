import { View, Text, ScrollView, TouchableOpacity, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Label } from './ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';
import { Category, Subcategory } from '@/types/database';
import { ServiceFilters } from './form-selectors/ServiceFilters';
import { SortByFilter } from './form-selectors/SortByFilter';
import { TimeSlotFilter } from './form-selectors/TimeSlotFilter';
import { LocationAutocomplete } from './LocationAutocomplete';
import { Button } from './ui/button';
import { FlatList } from 'react-native-gesture-handler';
import { useFilterStore } from '@/store/useFilterStore';
import { Ionicons } from '@expo/vector-icons';
import { goBack, navigate } from '@/utils/NavigationUtils';
import CustomSafeAreaView from './global/CustomSafeView';

const FilterPanels = () => {
    const { setFilters, resetFilters, setShowResults } = useFilterStore()
    const [selectedType, setSelectedType] = useState<string>("service");
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<string>("");
    const [timeSlot, setTimeSlot] = useState<string>("");
    const [location, setLocation] = useState("");

    function handleFilterSearch() {
        const filters = {
            type: selectedType,
            category: selectedCategory || null,
            subcategory: selectedSubcategory || null,
            services: selectedServices,
            sortBy,
            timeSlot,
            location,
            showResults: true,
        };
        setFilters(filters)
        setShowResults(true)
        goBack()
    }
    useEffect(() => {
        return () => {
            resetFilters(); // Clear filters when user leaves the screen
        };
    }, []);
    return (
        // <CustomSafeAreaView style={{ flex: 1 }}>
        <View className='flex-1 p-4 relative'>

            <View className='h-1 w-3 bg-black my-auto rounded-full' style={{ backgroundColor: 'black', width: 40, position: 'absolute', top: 4, right: "50%", transform: [{ translateX: "-20%" }] }} />
            {/* <TouchableOpacity variant='ghost' size='icon' className='absolute top-5 right-5 rounded-full bg-gray-600' onPress={() => navigate('Search')}>
                <Ionicons name="close-circle" size={24} color="red" />
            </TouchableOpacity> */}
            <FlatList
                data={[]}
                renderItem={null}
                contentContainerStyle={{ paddingBottom: '15%', marginTop: 20 }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <>
                        <View className='mb-3'>
                            <Label nativeID="type" className='font-semibold'>
                                Type
                            </Label>
                            <Select defaultValue={{ value: "services", label: 'Services' }} className='w-full' onValueChange={(option) => {
                                if (option?.value) setSelectedType(option.value)
                            }}>
                                <SelectTrigger className='w-[250px]'>
                                    <SelectValue
                                        className='text-foreground text-sm native:text-lg'
                                        placeholder='Sélectionnez un type'
                                    />
                                </SelectTrigger>
                                <SelectContent className='w-[250px] z-50'>
                                    <SelectGroup>
                                        <SelectLabel>Select Type</SelectLabel>
                                        <SelectItem label='Service' value='service'>
                                            Service
                                        </SelectItem>
                                        <SelectItem label='Vente' value='vente'>
                                            Vente
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </View>

                        <View className='mb-3'>
                            <ServiceFilters
                                selectedCategory={selectedCategory}
                                onCategoryChange={setSelectedCategory}
                                selectedSubcategory={selectedSubcategory}
                                onSubcategoryChange={setSelectedSubcategory}
                                selectedServices={selectedServices}
                                onServicesChange={setSelectedServices}
                                type={selectedType}
                            />
                        </View>

                        <SortByFilter value={sortBy} onChange={setSortBy} />
                        <TimeSlotFilter value={timeSlot} onChange={setTimeSlot} />

                        <View className='my-5'>
                            <Label nativeID="ville" className='font-semibold'>
                                Ville
                            </Label>
                            <LocationAutocomplete
                                value={location}
                                onChange={setLocation}
                                onLocationSelect={(data) => {
                                    console.log("Location selected:", data);
                                    setLocation(data.name);
                                }}
                            />
                        </View>

                        <Button onPress={() => handleFilterSearch()}>
                            <Text className='text-sm font-semibold text-white'>Rechercher</Text>
                        </Button>
                    </>
                }
            />
        </View>
        // </CustomSafeAreaView>
    )
}

export default FilterPanels