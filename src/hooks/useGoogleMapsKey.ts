import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToastStore } from "@/store/useToastStore";

interface GoogleMapsKeyResult {
  apiKey: string | null;
  isLoading: boolean;
}

export function useGoogleMapsKey(): GoogleMapsKeyResult {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToastStore();

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        console.log("Fetching Google Maps API key from Supabase...");

        const { data, error } = await supabase
          .from("secrets")
          .select("value")
          .eq("key", "GOOGLE_MAPS_API_KEY")
          .single();

        if (error) {
          console.error("Error fetching Google Maps API key:", error);
          showToast("error", "Erreur", "Impossible de charger l'autocomplétion des adresses");
          return;
        }

        if (data?.value) {
          console.log("Successfully fetched Google Maps API key");
          setApiKey(data.value);
        } else {
          console.error("No Google Maps API key found in secrets");
          showToast("error", "Erreur", "Clé API Google Maps non configurée");
        }
      } catch (error) {
        console.error("Error in fetchApiKey:", error);
        showToast("error", "Erreur", "Erreur lors de la récupération de la clé API");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiKey();
  }, [showToast]);

  // Memoize the result to avoid unnecessary re-renders
  return useMemo(() => ({ apiKey, isLoading }), [apiKey, isLoading]);
}
