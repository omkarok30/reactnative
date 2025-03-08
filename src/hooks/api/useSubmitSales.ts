import { useToastStore } from '@/store/useToastStore';
import { useMutation } from '@tanstack/react-query';
import { SalesFormSchema } from '@/models/SalesFormSchema';
import { supabase } from '@/integrations/supabase/client';

export const useSubmitSales = (id?: string) => {
    const { showToast } = useToastStore();

    return useMutation({
        mutationFn: async (values: SalesFormSchema) => {
            const { data: userData, error: userError } = await supabase.auth.getUser();
            if (userError) throw userError;

            if (!userData.user) {
                throw new Error("Vous devez être connecté pour publier une annonce");
            }

            const saleData = {
                seller_id: userData.user.id,
                title: values.title,
                description: values.description,
                price: parseFloat(values.price),
                condition: values.condition,
                location: values.location,
                photos: values.photos || [],
                category_id: parseInt(values.category),
                subcategory_id: parseInt(values.subcategory),
                items: values.items || [],
                updated_at: new Date().toISOString()
            };

            if (id) {
                const { error } = await supabase.from("sales").update(saleData).eq("id", id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from("sales").insert(saleData);
                if (error) throw error;
            }
        },
        onSuccess: () => {
            showToast("success", "Succès", id ? "Votre annonce a été modifiée avec succès" : "Votre annonce a été publiée avec succès");
        },
        onError: (error: any) => {
            console.error("Error submitting service:", error);
            showToast("error", "Erreur", error.message || "Une erreur est survenue lors de la publication de l'annonce");
        },
    });
}

export default useSubmitSales