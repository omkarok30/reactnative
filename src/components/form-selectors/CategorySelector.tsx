import { Category } from "@/types/database";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface CategorySelectorProps {
  selectedCategory: Category | null;
  onCategoryChange: (category: Category) => void;
  categories: Category[];
}

export function CategorySelector({
  selectedCategory,
  onCategoryChange,
  categories,
}: CategorySelectorProps) {
  return (
    <Select
      value={selectedCategory ? { value: selectedCategory.id.toString(), label: selectedCategory.name } : undefined}
      onValueChange={(option) => {
        const category = categories.find((c) => c.id.toString() === option?.value);
        if (category) onCategoryChange(category);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Sélectionnez une catégorie" />
      </SelectTrigger>
      <SelectContent className="bg-white max-w-fit text-sm">
        {categories?.length > 0 ? (
          categories?.map((category) => (
            <SelectItem
              key={category.id}
              value={category.id.toString()} // Ensure value is a string
              label={category.name} // Required by docs
              className="py-3 text-foreground hover:bg-accent focus:bg-accent cursor-pointer"
            >
              {category.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="Aucune catégorie disponible" label="Aucune catégorie disponible" disabled className="py-3 text-gray-500">
            Aucune catégorie disponible
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
