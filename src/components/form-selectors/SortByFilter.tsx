import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { View } from "react-native";
import { Label } from "../ui/label";

const sortOptions = [
  { id: "price-asc", label: "Prix croissant" },
  { id: "price-desc", label: "Prix décroissant" },
  { id: "rating", label: "Meilleure note" },
  { id: "distance", label: "Plus proche" },
  { id: "newest", label: "Plus récent" },
];

interface SortByFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function SortByFilter({ value, onChange }: SortByFilterProps) {
  return (
    <View className="space-y-2">
      <Label className="text-sm font-medium">Trier par</Label>
      <Select onValueChange={(option) => {
        if (option?.value) {
          onChange(option?.value);
        }
      }}>
        <SelectTrigger>
          <SelectValue placeholder="Choisir un tri" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-[#1A1F2C] border border-gray-200 dark:border-gray-700">
          {sortOptions.map((option) => (
            <SelectItem
              key={option.id}
              value={option.id}
              label={option.label}
              className="py-3 px-4 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer focus:bg-gray-100 dark:focus:bg-white/10"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </View>
  );
}