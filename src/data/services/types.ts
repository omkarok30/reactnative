export type ServiceCategory = {
  id: number;
  name: string;
  description: string;
  subcategories: ServiceSubcategory[];
};

export type ServiceSubcategory = {
  id: number;
  name: string;
  services: string[];
};

export const timeSlots = [
  { id: "all-day", label: "Toute la journée" },
  { id: "6-9", label: "6h - 9h" },
  { id: "9-12", label: "9h - 12h" },
  { id: "12-15", label: "12h - 15h" },
  { id: "15-18", label: "15h - 18h" },
  { id: "18-21", label: "18h - 21h" },
  { id: "21-24", label: "21h - 24h" },
  { id: "all-night", label: "Toute la nuit" }
] as const;