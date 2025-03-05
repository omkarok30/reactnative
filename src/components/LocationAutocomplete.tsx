import useDebounce from "@/hooks/useDebounce";
import { useGoogleMapsKey } from "@/hooks/useGoogleMapsKey";
import React, { useEffect, useRef, useState, forwardRef } from "react";
import { View, ActivityIndicator } from "react-native";
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from "react-native-google-places-autocomplete";

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onLocationSelect?: (placeData: {
    place_id: string;
    name: string;
    latitude?: number;
    longitude?: number;
    country_code?: string;
  }) => void;
}

// ✅ Wrap with forwardRef
export const LocationAutocomplete = forwardRef<GooglePlacesAutocompleteRef, LocationAutocompleteProps>(
  ({ value, onChange, onLocationSelect }, ref) => {
    const { apiKey, isLoading: isKeyLoading } = useGoogleMapsKey();
    const [searchText, setSearchText] = useState(value);
    const debouncedSearchText = useDebounce(searchText, 500); // 500ms delay

    return (
      <View>
        {isKeyLoading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          apiKey && (
            <GooglePlacesAutocomplete
              ref={ref} // ✅ Forward the ref
              placeholder="Entrez une adresse"
              fetchDetails
              query={{
                key: apiKey,
                language: "fr",
                types: "geocode",
              }}
              textInputProps={{
                value: searchText,
                onChangeText: setSearchText, // Update local state
                editable: !isKeyLoading,
              }}
              onPress={(data, details = null) => {
                if (!details?.geometry?.location) return;

                const placeData = {
                  place_id: data.place_id,
                  name: details.formatted_address || data.description || "",
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  country_code: details.address_components?.find((component) =>
                    component.types.includes("country")
                  )?.short_name,
                };

                onChange(placeData.name);
                onLocationSelect?.(placeData);
              }}
              styles={{
                textInput: {
                  backgroundColor: "#fff",
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderRadius: 8,
                  padding: 10,
                  fontSize: 16,
                },
                listView: { backgroundColor: "#fff" },
              }}
            />
          )
        )}
      </View>
    );
  }
);
