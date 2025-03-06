import { View, TouchableOpacity, Text } from "react-native";
import React, { FC } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { navigate } from "@/utils/NavigationUtils";

interface Props {
  filter?: boolean; // Optional prop to show/hide filter options
  placeholder?: string; // Optional prop to set the search bar placeholder text
}

const SearchBar: FC<Props> = ({ filter, placeholder = "Search for anything" }) => {
  return (
    <TouchableOpacity
      onPress={() => navigate("Search")}
      activeOpacity={0.7}
      className="h-12 flex-row items-center justify-between bg-gray-100 border border-gray-300 rounded-lg px-4 mt-2 w-[86%]"
    >
      <View className="flex-1 flex-row items-center">
        <Ionicons name="search" size={20} className="text-gray-600" />
        <Text className="text-md text-gray-400 ml-2"> {placeholder} </Text>
      </View>

      {/* Divider & Filter Button */}
      <View className="w-[1px] h-6 bg-gray-300 mx-2" />
      <Ionicons name="options-outline" size={20} className="text-gray-600" />
    </TouchableOpacity>
  );
};

export default SearchBar;