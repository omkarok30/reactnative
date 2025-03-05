import { useQuery } from '@tanstack/react-query';
import { useToastStore } from '@/store/useToastStore';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { goBack, navigate } from '@/utils/NavigationUtils';
import { supabase } from '@/integrations/supabase/client';
import { FetchService } from '@/types/services';


export function useFetchService(id: string | null, reset: any) {
    const { showToast } = useToastStore();
    const navigation = useNavigation();

    // Fetch data using useQuery
    const { data: service, error, isLoading } = useQuery<FetchService | null, Error>({
        queryKey: ['service', id],
        queryFn: async (): Promise<FetchService | null> => {
            if (!id) return null;

            const { data: service, error } = await supabase
                .from('services')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            return service;
        },
        enabled: !!id, // Only run query if id exists
    });

    // Handle success in useEffect
    useEffect(() => {
        if (service) {
            // console.log('Fetched service for editing:', service);
            reset({
                category: service.category_id.toString(),
                subcategory: service.subcategory_id.toString(),
                services: [service.title],
                description: service.description,
                price: service.price.toString(),
                billing_type: 'hourly',
                availability: service.availability,
                photos: service.photos,
                service_area: service.location,
                spoken_languages: [],
            });

            showToast('success', 'Service chargé avec succès');
        }
    }, [service, reset, showToast]);

    // Handle error in useEffect
    useEffect(() => {
        if (error) {
            // console.error('Error fetching service:', error);
            showToast('error', 'Erreur', 'Impossible de charger le service');
            goBack();
        }
    }, [error, showToast, navigation]);

    return { service, isLoading, error };
}
