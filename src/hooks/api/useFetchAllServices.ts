import { supabase } from "@/integrations/supabase/client";
import { useToastStore } from "@/store/useToastStore";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const fetchServices = async () => {
    const { data, error } = await supabase
        .from("services")
        .select(`
            *,
            category:categories_services(name),
            subcategory:subcategories_services(name),
            provider:profiles(*)
          `).limit(6);

    if (error) {
        throw new Error(error.message); // Ensure errors are thrown properly
    }

    return data || [];
};

export const useFetchAllServices = () => {
    const { showToast } = useToastStore();

    return useQuery({
        queryKey: ["services"],
        queryFn: fetchServices,
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
        retry: 2, // Retry twice on failure
        onError: (error: Error) => {
            showToast("error", "Erreur", error.message); // Display error toast
        },
    } as UseQueryOptions);
};
