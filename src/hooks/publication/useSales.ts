import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToastStore } from "@/store/useToastStore";

interface Sale {
    id: string;
    title: string;
    description: string;
    price: number;
    photos: string[];
}

export function useSales(id: string | null) {
    const { showToast } = useToastStore();
    const queryClient = useQueryClient();

    // Fetch sales query
    const fetchSales = async (id: string | null) => {
        if (!id) return [];

        const { data, error } = await supabase
            .from('sales')
            .select('*')
            .eq('seller_id', id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching sales:', error);
            throw error;
        }

        return data || [];
    };

    // Query hook
    const { data: sales = [], isLoading: loading, error } = useQuery<Sale[]>({
        queryKey: ['user-sales', id],
        queryFn: () => fetchSales(id), // ✅ Pass id explicitly
        enabled: !!id, // Only run query if id exists
    });


    // Handle query error
    useEffect(() => {
        if (error) {
            showToast("error", "Erreur", "Impossible de charger vos services");
        }
    }, [error]);

    // Delete sale mutation
    const deleteSaleMutation = useMutation({
        mutationFn: async (saleId: string) => {
            const { error } = await supabase
                .from('sales')
                .delete()
                .eq('id', saleId);

            if (error) throw error;
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['user-sales'] });

            showToast("success", "Succès", "Annonce supprimée avec succès");
        },
        onError: (error) => {
            console.error('Error deleting sale:', error);
            showToast("error", "Erreur", "Impossible de supprimer l'annonce");
        }
    });

    // Handle delete function
    const handleDelete = (saleId: string) => {
        deleteSaleMutation.mutate(saleId);
    };

    return {
        sales,
        loading,
        handleDelete
    };
}