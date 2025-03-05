import { useMutation } from "@tanstack/react-query";
import { ServiceFormData } from "@/types/services";
import { supabase } from "@/integrations/supabase/client";
import { useToastStore } from "@/store/useToastStore";

export const useSubmitService = (id?: string) => {
    const { showToast } = useToastStore();

    return useMutation({
        mutationFn: async (values: ServiceFormData) => {
            const { data: userData, error: userError } = await supabase.auth.getUser();
            if (userError) throw userError;

            if (!userData.user) {
                throw new Error("Vous devez être connecté pour publier une annonce");
            }

            const serviceData = {
                provider_id: userData.user.id,
                title: values.services.join(", "),
                description: values.description,
                price: parseFloat(values.price),
                category_id: parseInt(values.category),
                subcategory_id: parseInt(values.subcategory),
                availability: values.availability,
                photos: values.photos,
                location: values.service_area,
                updated_at: new Date().toISOString(),
            };

            if (id) {
                const { error } = await supabase.from("services").update(serviceData).eq("id", id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from("services").insert(serviceData);
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
};
