import { ScrollView } from "react-native";
import { SelectContent, SelectItem } from "../ui/select";
import { PredefinedService } from "@/types/database";


interface AnnonceListProps {
  services: PredefinedService[];
  selectedServices: string[];
}

export function AnnonceList({ services, selectedServices }: AnnonceListProps) {
  return (
    <SelectContent className="bg-background border border-border">
      <ScrollView className='max-h-32'>
        {services.map((service) => (
          <SelectItem
            key={service.id}
            value={service.name}
            label={service.name}
            className="py-2 text-foreground hover:bg-accent focus:bg-accent cursor-pointer"
          >
            {service.name}
          </SelectItem>
        ))}
      </ScrollView>
    </SelectContent>
  );
}