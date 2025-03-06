import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { H3 } from '@/components/ui/typography'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Entypo } from '@expo/vector-icons'
import { Colors } from '@/utils/Constants'
import { goBack } from '@/utils/NavigationUtils'

const SearchFilterScreen = () => {
    return (
        <View className='flex-1 bg-white px-4'>
            <View className='flex-row items-center justify-between mt-4 mb-2'>
                <H3>Filters</H3>
                <TouchableOpacity className='rounded-full' style={{ backgroundColor: Colors.gray }} onPress={()=>goBack()}>
                    <Entypo name="cross" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={{ paddingBottom: '15%' }}
                showsVerticalScrollIndicator={false}>
                <Heading title={'Category'} index={1} />
                <Animated.ScrollView
                    horizontal
                    entering={FadeInDown.delay(1 * 130)
                        .duration(300)
                        .springify()
                        .damping(12)
                        .stiffness(80)}>
                    <View style={{ zIndex: 999, backgroundColor: 'white' }}>
                        <Select defaultValue={{ value: 'apple', label: 'Apple' }}>
                            <SelectTrigger className='w-[250px]'>
                                <SelectValue
                                    className='text-foreground text-sm native:text-lg'
                                    placeholder='Select a fruit'
                                />
                            </SelectTrigger>
                            <SelectContent className='w-[250px] z-50'>
                                <ScrollView className='max-h-32 z-50'>
                                    <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem label='Apple' value='apple'>
                                            Apple
                                        </SelectItem>
                                        <SelectItem label='Banana' value='banana'>
                                            Banana
                                        </SelectItem>
                                        <SelectItem label='Blueberry' value='blueberry'>
                                            Blueberry
                                        </SelectItem>
                                        <SelectItem label='Grapes' value='grapes'>
                                            Grapes
                                        </SelectItem>
                                        <SelectItem label='Pineapple' value='pineapple'>
                                            Pineapple
                                        </SelectItem>
                                        <SelectItem label='Apple 2' value='apple2'>
                                            Apple 2
                                        </SelectItem>
                                        <SelectItem label='Banana 2' value='banana2'>
                                            Banana 2
                                        </SelectItem>
                                        <SelectItem label='Blueberry 2' value='blueberry2'>
                                            Blueberry 2
                                        </SelectItem>
                                        <SelectItem label='Grapes 2' value='grapes2'>
                                            Grapes 2
                                        </SelectItem>
                                        <SelectItem label='Pineapple 2' value='pineapple2'>
                                            Pineapple 2
                                        </SelectItem>
                                        <SelectItem label='Apple 3' value='apple3'>
                                            Apple 3
                                        </SelectItem>
                                        <SelectItem label='Banana 3' value='banana3'>
                                            Banana 3
                                        </SelectItem>
                                        <SelectItem label='Blueberry 3' value='blueberry3'>
                                            Blueberry 3
                                        </SelectItem>
                                        <SelectItem label='Grapes 3' value='grapes3'>
                                            Grapes 3
                                        </SelectItem>
                                        <SelectItem label='Pineapple 3' value='pineapple3'>
                                            Pineapple 3
                                        </SelectItem>
                                    </SelectGroup>
                                </ScrollView>
                            </SelectContent>
                        </Select>
                    </View>
                </Animated.ScrollView>
            </ScrollView>
        </View>
    )
}

const Heading = ({ title, index }: { title: string; index: number }) => {
    return (
        <Animated.View
            entering={FadeInDown.delay(index * 130)
                .duration(300)
                .springify()
                .damping(12)
                .stiffness(80)}>
            <Label nativeID={title} className='font-semibold'>
                {title}
            </Label>
            {/* <View style={styles.line} /> */}
        </Animated.View>
    );
};
export default SearchFilterScreen