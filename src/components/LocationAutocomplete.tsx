import { useGoogleMapsKey } from "@/hooks/useGoogleMapsKey";
import { useServiceFormStore } from "@/store/useServiceFormStore"; 
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
    const googleRef = useRef<GooglePlacesAutocompleteRef>(null)
    const location = useServiceFormStore((state) => state.formData.service_area);
    const { apiKey, isLoading: isKeyLoading } = useGoogleMapsKey();
    const [searchText, setSearchText] = useState(value || location);

    useEffect(() => {
      googleRef?.current?.setAddressText(location);
    }, [location]);

    return (
      <View className="relative">
        {isKeyLoading && (
          <ActivityIndicator size="large" color="#C69F4A" className="absolute z-50 w-full bg-white h-full" />
        )}
        {apiKey && (
          <GooglePlacesAutocomplete
            ref={googleRef} // ✅ Forward the ref
            placeholder="Entrez une adresse"
            fetchDetails
            debounce={300}
            preProcess={() => location}
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
                backgroundColor: '#FFF',
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 8,
                padding: 2,
                fontSize: 14,
              },
              listView: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd", borderRadius: 8 },
            }}
          />
        )}
      </View>
    );
  }
);
