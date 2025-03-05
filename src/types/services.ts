export type ServiceFormData = {
  category: string;
  subcategory: string;
  services: string[];
  description: string;
  photos: string[];
  price: string;
  billing_type: string;
  availability: string[];
  service_area: string;
  spoken_languages: string[];
};

export type FetchService = {
  availability: string[];
  category_id: number;
  created_at: string;
  description: string;
  id: string;
  location: string;
  photos: string[];
  price: number;
  provider_id: string;
  subcategory_id: number;
  title: string;
  updated_at: string;
}