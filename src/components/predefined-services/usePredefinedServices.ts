import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Subcategory } from "@/types/database";
import { PredefinedService } from "@/types/database";
import { useToastStore } from "@/store/useToastStore";

export const usePredefinedServices = (selectedSubcategory: Subcategory | null) => {
  const [services, setServices] = useState<PredefinedService[]>([]);
  const { showToast } = useToastStore();

  useEffect(() => {
    const fetchServices = async () => {
      if (!selectedSubcategory) {
        setServices([]);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("predefined_services")
          .select("*")
          .eq("subcategory_id", selectedSubcategory.id)
          .order("name");

        if (error) {
          console.error("Error fetching predefined services:", error);
          showToast("error", "Erreur", "Impossible de charger les services prédéfinis");
          return;
        }

        console.log("Fetched predefined services for subcategory", selectedSubcategory.id, ":", data);
        setServices(data);
      } catch (error) {
        console.error("Error in fetchServices:", error);
        showToast("error", "Erreur", "Une erreur est survenue");
      }
    };

    fetchServices();
  }, [selectedSubcategory]);

  return services;
};