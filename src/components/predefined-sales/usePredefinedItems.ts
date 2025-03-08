import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Subcategory } from "@/types/database";
import { PredefinedItem } from "@/types/sales";
import { useToastStore } from "@/store/useToastStore";

export const usePredefinedItems = (selectedSubcategory: Subcategory | null) => {
  const [items, setItems] = useState<PredefinedItem[]>([]);
  const { showToast } = useToastStore();

  useEffect(() => {
    const fetchItems = async () => {
      if (!selectedSubcategory) {
        setItems([]);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("predefined_items")
          .select("*")
          .eq("subcategory_id", selectedSubcategory.id)
          .order("name");

        if (error) {
          console.error("Error fetching predefined items:", error);
          showToast("error", "Erreur", "Impossible de charger les articles prédéfinis");
          return;
        }

        console.log("Fetched predefined items for subcategory", selectedSubcategory.id, ":", data);
        setItems(data);
      } catch (error) {
        console.error("Error in fetchItems:", error);
        showToast("error", "Erreur", "Une erreur est survenue");
      }
    };

    fetchItems();
  }, [selectedSubcategory]);

  return items;
};