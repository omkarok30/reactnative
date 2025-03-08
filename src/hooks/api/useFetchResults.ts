import { supabase } from "@/integrations/supabase/client";
import { useToastStore } from "@/store/useToastStore";
import { useEffect, useState } from "react";

export const useFetchResults = (filters: any) => {

    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToastStore();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                setLoading(true);
                console.log("Starting search with filters:", filters);

                let query;

                // Build the appropriate query based on type
                if (filters.type === "service") {
                    console.log("Searching for services...");
                    query = supabase
                        .from("services")
                        .select(`
              *,
              category:categories_services!services_category_id_fkey_new(name),
              subcategory:subcategories_services!services_subcategory_id_fkey(name),
              provider:profiles(*)
            `);
                } else {
                    console.log("Searching for sales...");
                    query = supabase
                        .from("sales")
                        .select(`
              *,
              category:categories_ventes(name),
              subcategory:subcategories_ventes(name),
              seller:profiles(*)
            `);
                }

                // Apply filters if they exist
                if (filters.category?.id) {
                    query = query.eq("category_id", filters.category.id);
                    console.log("Applied category filter:", filters.category.id);
                }

                if (filters.subcategory?.id) {
                    query = query.eq("subcategory_id", filters.subcategory.id);
                    console.log("Applied subcategory filter:", filters.subcategory.id);
                }

                if (filters.location) {
                    query = query.eq("location", filters.location);
                    console.log("Applied location filter:", filters.location);
                }

                // Apply sorting
                switch (filters.sortBy) {
                    case "price-asc":
                        query = query.order("price", { ascending: true });
                        break;
                    case "price-desc":
                        query = query.order("price", { ascending: false });
                        break;
                    case "rating":
                        query = query.order("rating", { ascending: false });
                        break;
                    case "newest":
                        query = query.order("created_at", { ascending: false });
                        break;
                    default:
                        query = query.order("created_at", { ascending: false });
                }

                console.log("Executing query...");
                const { data, error } = await query;

                if (error) {
                    console.error("Database query error:", error);
                    showToast("error", "Erreur de recherche", "Impossible de récupérer les résultats");
                    setResults([]);
                    return;
                }

                console.log("Query successful, raw results:", data);

                if (!data || data.length === 0) {
                    console.log("No results found");
                    setResults([]);
                    return;
                }

                // Remove duplicates based on id
                const uniqueResults = Array.from(new Map(data.map(item => [item.id, item])).values());
                console.log("Processed results count:", uniqueResults.length);
                setResults(uniqueResults);
            } catch (error) {
                console.error("Unexpected error in fetchResults:", error);
                showToast("error", "Erreur", "Une erreur inattendue est survenue");
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        if (filters) fetchResults();
    }, [filters]);

    return {
        loading, results
    }
};
