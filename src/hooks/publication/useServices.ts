import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToastStore } from "@/store/useToastStore";
import { useEffect } from "react";

interface Service {
    id: string;
    title: string;
    description: string;
    price: number;
    photos: string[];
}

export function useServices(id: string | null) {
    const { showToast } = useToastStore();
    const queryClient = useQueryClient();

    // Fetch services query
    const fetchServices = async (id: string | null) => {
        if (!id) return [];

        const { data, error } = await supabase
            .from("services")
            .select("*")
            .eq("provider_id", id)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching services:", error);
            throw error;
        }

        return data || [];
    };

    // Query hook
    const { data: services = [], isLoading: loading, error } = useQuery<Service[]>({
        queryKey: ["user-services", id],
        queryFn: () => fetchServices(id), // ✅ Pass id explicitly
        enabled: !!id, // Only run query if id exists
    });

    // Handle query error
    useEffect(() => {
        if (error) {
            showToast("error", "Erreur", "Impossible de charger vos services");
        }
    }, [error]);

    // Delete service mutation
    const deleteServiceMutation = useMutation({
        mutationFn: async (serviceId: string) => {
            const { error } = await supabase
                .from("services")
                .delete()
                .eq("id", serviceId);

            if (error) throw error;
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["user-services", id] });

            showToast("success", "Succès", "Service supprimé avec succès");
        },
        onError: (error) => {
            console.error("Error deleting service:", error);
            showToast("error", "Erreur", "Impossible de supprimer le service");
        },
    });

    // Handle delete function
    const handleDelete = (serviceId: string) => {
        deleteServiceMutation.mutate(serviceId);
    };

    // Function to manually revalidate the query
    const revalidateServices = () => {
        queryClient.invalidateQueries({ queryKey: ["user-services", id] });
    };

    return {
        services,
        loading,
        handleDelete,
        revalidateServices
    };
}
