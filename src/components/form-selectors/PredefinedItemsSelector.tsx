import { Subcategory } from "@/types/database";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PredefinedItem, SaleFormData } from "@/types/sales";
import { UseFormSetValue } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { usePredefinedItems } from "../predefined-sales/usePredefinedItems";
import { useSelectedItems } from "../predefined-sales/useSelectedItems";
import { SelectedItems } from "../predefined-sales/SelectedItems";

interface PredefinedServicesSelectorProps {
  selectedSubcategory: Subcategory | null;
  value: string[];
  onChange: (value: string[]) => void;
  setValue: UseFormSetValue<SaleFormData>
}

export function PredefinedItemsSelector({
  selectedSubcategory,
  value,
  onChange, setValue
}: PredefinedServicesSelectorProps) {
  const items = usePredefinedItems(selectedSubcategory);
  const selectedItemsData = useSelectedItems(items, value);

  const handleSelect = (selectedItemName: string) => {
    const updatedItems = value.includes(selectedItemName)
      ? value.filter(name => name !== selectedItemName)
      : [...value, selectedItemName];

    setValue("items", updatedItems, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });

    onChange(updatedItems);
    console.log("Selected items:", updatedItems);
  };

  const removeItem = (itemName: string) => {
    const updatedItems = value.filter(name => name !== itemName);
    setValue("items", updatedItems, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    onChange(updatedItems);
  };

  if (!selectedSubcategory) return null;

  return (
    <View className="space-y-4">
      <Select // value={value.length > 0 ? { value: value[0], label: value[0] } : undefined}
        onValueChange={(option) => {
          if (option?.value) {
            handleSelect(option?.value);
          }
        }}>
        <SelectTrigger className="w-full bg-background">
          <SelectValue placeholder="Sélectionnez vos items" />
        </SelectTrigger>
        <SelectContent className="bg-background border border-border">
          <ScrollView className="max-h-32">
            {items.map((item: PredefinedItem) => (
              <SelectItem
                key={item.id}
                value={item.name}
                label={item.name}
                className="py-2 text-foreground hover:bg-accent focus:bg-accent cursor-pointer"
              >
                {item.name}
              </SelectItem>
            ))}
          </ScrollView>
        </SelectContent>
      </Select>

      <SelectedItems
        selectedItems={selectedItemsData}
        onRemove={removeItem}
      />
    </View>
  );
}