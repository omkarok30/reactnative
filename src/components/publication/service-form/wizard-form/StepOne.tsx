import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Control, Controller, useForm, UseFormSetValue } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CategorySelector } from "@/components/form-selectors/CategorySelector";
import { SubcategorySelector } from "@/components/form-selectors/SubcategorySelector";
import { PredefinedServicesSelector } from "@/components/form-selectors/PredefinedServicesSelector";
import { H3, H4, P } from "@/components/ui/typography";
import { supabase } from "@/integrations/supabase/client";
import { Category, Subcategory } from "@/types/database";
import Toast from "react-native-toast-message";
import { ServiceFormData } from "@/types/services";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Keyboard } from "react-native";
import { useCategoryStore } from "@/store/useCategoryStore";

type PropsType = {
  control: Control<ServiceFormData>;
  setValue: UseFormSetValue<ServiceFormData>;
}

export default function StepOne({ control, setValue }: PropsType) {
  const {
    categories,
    subcategories,
    selectedCategory,
    selectedSubcategory,
    selectedServices,
    setSelectedCategory,
    setSelectedSubcategory,
    setSelectedServices,
    setCategories,
    setSubcategories
  } = useCategoryStore();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase.from("categories_services").select("*").order("id");
        if (error) {
          // If an error occurs while fetching categories, show an error message
          Toast.show({ text1: "Erreur", text2: "Impossible de charger les catégories", type: "destructive" });
          return;
        }
        setCategories(data as Category[]); // Set the categories in state
      } catch (error) {
        // Catch any other errors
        Toast.show({ text1: "Erreur", text2: "Une erreur est survenue", type: "destructive" });
      }
    };
    fetchCategories();
  }, []);

  return (
    <View className="space-y-2">
      <H3 className="font-semibold text-center">Détails du service</H3>
      <P className="text-muted-foreground text-sm text-center">
        Commencez par choisir une catégorie et vos services proposés
      </P>

      {/* Category Selector */}
      <View className="mb-3 mt-6">
        <Label nativeID="category">Catégorie</Label>
        <Controller
          control={control}
          name="category"
          aria-labelledby="category"
          render={({ field }) => (
            <CategorySelector
              selectedCategory={selectedCategory}
              onCategoryChange={(category) => {
                setSelectedCategory(category);
                setSelectedSubcategory(null); // Reset subcategory
                setSelectedServices([]); // Reset services
                setValue("category", category.id.toString(), { shouldValidate: true, shouldDirty: true });
                setValue("services", []); // Clear services
              }}
              categories={categories}
            />
          )}
        />
      </View>

      {/* Subcategory Selector */}
      {selectedCategory && (
        <View className="mb-3">
          <Label nativeID="subcategory">Sous-catégorie</Label>
          <Controller
            control={control}
            name="subcategory"
            aria-labelledby="subcategory"
            render={({ field }) => (
              <SubcategorySelector
                categoryId={selectedCategory.id || Number(selectedCategory)}
                selectedSubcategory={selectedSubcategory}
                onSubcategoryChange={(subcategory) => {
                  setSelectedSubcategory(subcategory);
                  setSelectedServices([]); // Reset services
                  setValue("subcategory", subcategory.id.toString(), { shouldValidate: true, shouldDirty: true });
                  setValue("services", []); // Clear services
                }}
                type="service"
              />
            )}
          />
        </View>
      )}

      {/* Predefined Services Selector */}
      {selectedSubcategory && (
        <View className="mb-3">
          <Label nativeID="services">Services proposés</Label>
          <Controller
            control={control}
            name="services"
            aria-labelledby="services"
            render={({ field }) => (
              <PredefinedServicesSelector
                selectedSubcategory={selectedSubcategory}
                value={selectedServices}
                onChange={(services: string[]) => {
                  setSelectedServices(services);
                  setValue("services", services, { shouldValidate: true, shouldDirty: true });
                }}
                setValue={setValue}
              />
            )}
          />
        </View>
      )}

      {/* Description Textarea */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="mb-3">
          <Label nativeID="description">Description détaillée</Label>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <Textarea
                id="description"
                aria-labelledby="description"
                value={field.value}
                onChangeText={(text) => setValue("description", text)}
                placeholder="Décrivez votre service en détail"
                multiline
                className="border p-2 rounded-md min-h-[120px] bg-accent/50 dark:bg-accent/10 placeholder:text-muted-foreground"
              />
            )}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
