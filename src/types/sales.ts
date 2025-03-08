export type SaleFormData = {
  title: string;
  category: string;
  subcategory: string;
  items: string[];
  description: string;
  photos: string[];
  price: string;
  condition: string;
  location: string;
};
export interface SelectedItem {
  name: string;
}

export interface PredefinedItem {
  id: number;
  subcategory_id: number | null;
  name: string;
  created_at: string;
}