import { View, Text } from 'react-native'
import React from 'react'
import { H3, P } from '@/components/ui/typography'
import { Label } from '@/components/ui/label'
import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { SaleFormData } from '@/types/sales'
import { CategorySelector } from '@/components/form-selectors/CategorySelector'
import { useCategoryStore } from '@/store/useCategoryStore'
import { SubcategorySelector } from '@/components/form-selectors/SubcategorySelector'
import { PredefinedServicesSelector } from '@/components/form-selectors/PredefinedServicesSelector'
import { PredefinedItemsSelector } from '@/components/form-selectors/PredefinedItemsSelector'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Keyboard } from 'react-native'
import { Textarea } from '@/components/ui/textarea'

export type PropsType = {
  control: Control<SaleFormData>;
  setValue: UseFormSetValue<SaleFormData>;
  errors?: FieldErrors<SaleFormData>
}

const SalesStepOne = ({ control, setValue, errors }: PropsType) => {

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

  return (
    <View className="space-y-2">
      <H3 className="font-semibold text-center">Détails de l'article</H3>
      <P className="text-muted-foreground text-sm text-center">
        Commencez par choisir une catégorie et décrire votre article
      </P>

      <View className="mb-3 mt-6">
        <Label nativeID="title">Titre de l'annonce</Label>
        <Controller
          control={control}
          name="title"
          aria-labelledby="title"
          render={({ field }) => (
            <Input
              id="title"
              aria-labelledby="title"
              value={field.value}
              onChangeText={(text) => setValue("title", text)}
            />
          )}
        />
      </View>
      {/* Category Selector */}
      <View className="mb-3">
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
          <Label nativeID="items">Articles proposés</Label>
          <Controller
            control={control}
            name="items"
            aria-labelledby="items"
            render={({ field }) => (
              <PredefinedItemsSelector
                selectedSubcategory={selectedSubcategory}
                value={selectedServices}
                onChange={(services: string[]) => {
                  setSelectedServices(services);
                  setValue("items", services, { shouldValidate: true, shouldDirty: true });
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
  )
}

export default SalesStepOne