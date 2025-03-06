import { supabase } from "@/integrations/supabase/client";
import { useToastStore } from "@/store/useToastStore";
import { Category } from "@/types/database";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export function useCategories(type: string) {
  const { showToast } = useToastStore();

  const fetchCategories = useCallback(async () => {
    console.log("Fetching categories for type:", type);

    const tableName = type === "service" ? "categories_services" : "categories_ventes";
    console.log(`Using table: ${tableName}`);

    const { data, error } = await supabase.from(tableName).select("*").order("id");

    if (error) {
      console.error("Error fetching categories:", error);
      throw new Error(error.message); // React Query will catch this
    }

    console.log("Fetched categories:", data);
    return data as Category[];
  }, [type]); // ✅ Memoized for better performance

  const query = useQuery({
    queryKey: ["categories", type],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
    retry: 2,
    enabled: !!type, // Only run query if type exists
  });

  if (query.error) {
    showToast("error", "Erreur", "Une erreur est survenue lors du chargement des catégories");
  }

  return query;
}
