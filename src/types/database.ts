export type Category = {
  id: number;
  name: string;
  created_at: string;
  type_id: number;
};

export type Subcategory = {
  id: number;
  category_id: number;
  name: string;
  created_at: string;
};

export type PredefinedService = {
  id: number;
  subcategory_id: number;
  name: string;
  created_at: string;
};