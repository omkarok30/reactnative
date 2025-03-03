import { View, TouchableOpacity, TextInput } from "react-native";
import React, { FC, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  filter?: boolean; // Optional prop to show/hide filter options
  placeholder?: string; // Optional prop to set the search bar placeholder text
}
const SearchBar: FC = ({ filter, placeholder = "Search for anything" }: Props) => {
  const [search, setSearch] = useState<string>("");
  return (
    <View className="flex-row items-center justify-between bg-gray-100 border border-gray-300 rounded-lg px-4 py-1 mt-2">
      <View className="flex-1 flex flex-row items-center justify-start z-50 ">
        <Ionicons name="search" size={(20)} className="text-gray-600" />
        <TextInput
          value={search}
          onChangeText={(value: string) => setSearch(value)}
          placeholder={placeholder}
          className="text-md text-black-300 ml-2 flex-1 "
        />
      </View>

      {/* Divider */}
      {/* {filter && */}
      <><View className="w-[1px] h-6 bg-gray-300 mx-2" />

        <TouchableOpacity>
          <Ionicons name="options-outline" size={(20)} className="text-gray-600" />
        </TouchableOpacity></>
      {/* // } */}
    </View>
  );
};

export default SearchBar;
