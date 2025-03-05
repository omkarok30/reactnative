import { supabase } from "@/integrations/supabase/client";
import { useToastStore } from "@/store/useToastStore";
import { Subcategory } from "@/types/database";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface SubcategorySelectorProps {
    categoryId: number | null;
    selectedSubcategory: Subcategory | null;
    onSubcategoryChange: (subcategory: Subcategory) => void;
    type: string;
}

export function SubcategorySelector({
    categoryId,
    selectedSubcategory,
    onSubcategoryChange,
    type,
}: SubcategorySelectorProps) {
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const { showToast } = useToastStore();

    useEffect(() => {
        const fetchSubcategories = async () => {
            if (!categoryId) {
                setSubcategories([]);
                return;
            }

            try {
                const tableName =
                    type === "service" ? "subcategories_services" : "subcategories_ventes";
                // console.log(`Fetching subcategories from table: ${tableName}`);

                const { data, error } = await supabase
                    .from(tableName)
                    .select("*")
                    .eq("category_id", categoryId)
                    .order("id");

                if (error) {
                    // console.error("Error fetching subcategories:", error);
                    showToast("error", "Erreur", "Impossible de charger les sous-catégories");
                    return;
                }

                // console.log("Fetched subcategories for category", categoryId, ":", data);
                setSubcategories(data);
            } catch (error) {
                console.error("Error in fetchSubcategories:", error);
                showToast("error", "Erreur", "Une erreur est survenue");
            }
        };

        fetchSubcategories();
    }, [categoryId, type]);

    if (!categoryId) return null;
    
    return (
        <Select
            value={
                selectedSubcategory
                    ? { value: selectedSubcategory.id.toString(), label: selectedSubcategory.name }
                    : undefined
            }
            onValueChange={(option) => {
                const subcategory = subcategories.find((sub) => sub.id.toString() === option?.value);
                if (subcategory) onSubcategoryChange(subcategory);
            }}
        >
            <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une sous-catégorie" />
            </SelectTrigger>
            <SelectContent className="bg-white">
                {subcategories.length > 0 ? (
                    subcategories.map((subcategory) => (
                        <SelectItem
                            key={subcategory.id}
                            value={subcategory.id.toString()}
                            label={subcategory.name} // Required by docs
                            className="py-3 text-foreground hover:bg-accent focus:bg-accent cursor-pointer"
                        >
                            {subcategory.name}
                        </SelectItem>
                    ))
                ) : (
                    <SelectItem value="Aucune sous-catégorie disponible" label="Aucune sous-catégorie disponible" disabled className="py-3 text-gray-500">
                        Aucune sous-catégorie disponible
                    </SelectItem>
                )}
            </SelectContent>
        </Select>
    );
}
