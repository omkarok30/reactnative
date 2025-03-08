import { useCategories } from "@/hooks/api/useCategories";
import { useToastStore } from "@/store/useToastStore";
import { Category, Subcategory } from "@/types/database";
import { useEffect } from "react";
import { CategorySelector } from "./CategorySelector";
import { SubcategorySelector } from "./SubcategorySelector";
import { PredefinedServicesSelector } from "./PredefinedServicesSelector";
import { View } from "react-native";
import { Label } from "../ui/label";
import { Text } from "../ui/text";

interface ServiceFiltersProps {
  selectedCategory: Category | null;
  onCategoryChange: (category: Category) => void;
  selectedSubcategory: Subcategory | null;
  onSubcategoryChange: (subcategory: Subcategory) => void;
  selectedServices: string[];
  onServicesChange: (services: string[]) => void;
  type: string;
}

export function ServiceFilters({
  selectedCategory,
  onCategoryChange,
  selectedSubcategory,
  onSubcategoryChange,
  selectedServices,
  onServicesChange,
  type,
}: ServiceFiltersProps) {
  const { data: categories, error, isLoading } = useCategories(type);
  const { showToast } = useToastStore();

  useEffect(() => {
    if (error) {
      console.error("Error loading categories:", error);
      showToast("error", "Erreur", "Impossible de charger les catégories");
    }
  }, [error]);

  if (isLoading) {
    return <View><Text>Chargement des catégories...</Text></View>;
  }

  return (
    <>
      <View className="mb-2">
        <Label className="text-sm font-medium">Catégorie</Label>
        <CategorySelector
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          categories={categories || []}
        />
      </View>

      {selectedCategory && (
        <View className="mb-2">
          <Label className="text-sm font-medium">Sous-catégorie</Label>
          <SubcategorySelector
            categoryId={selectedCategory?.id ?? null}
            selectedSubcategory={selectedSubcategory}
            onSubcategoryChange={onSubcategoryChange}
            type={type}
          />
        </View>
      )}

      {type === 'service' && selectedSubcategory && (
        <><Label className="text-sm font-medium">Services</Label>
          <PredefinedServicesSelector
            selectedSubcategory={selectedSubcategory}
            value={selectedServices}
            onChange={onServicesChange}
          />
        </>
      )}
    </>
  );
}