import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { View } from "react-native";
import { Label } from "../ui/label";

const timeSlots = [
  { id: "today", label: "Aujourd'hui" },
  { id: "this-week", label: "Cette semaine" },
  { id: "weekend", label: "Week-end" },
  { id: "next-week", label: "Semaine prochaine" },
];

interface TimeSlotFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function TimeSlotFilter({ value, onChange }: TimeSlotFilterProps) {
  return (
    <View className="mt-2">
      <Label className="text-sm font-medium">Disponibilité</Label>
      <Select onValueChange={(option) => {
        if (option?.value) {
          onChange(option?.value);
        }
      }}>
        <SelectTrigger className="w-full bg-gray-50 dark:bg-white/10 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 min-h-[52px] px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/20">
          <SelectValue placeholder="Choisir un créneau" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-[#1A1F2C] border border-gray-200 dark:border-gray-700">
          {timeSlots.map((slot) => (
            <SelectItem
              key={slot.id}
              value={slot.id}
              label={slot.label}
              className="py-3 px-4 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer focus:bg-gray-100 dark:focus:bg-white/10"
            >
              {slot.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </View>
  );
}