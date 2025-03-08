import { z } from "zod";

export const saleFormSchema = z.object({
    title: z.string().min(1, "Le titre est requis"),
    category: z.string().min(1, "La catégorie est requise"),
    subcategory: z.string().min(1, "La sous-catégorie est requise"),
    description: z.string().min(1, "La description est requise"),
    photos: z.array(z.string()).min(1, "Au moins une photo est requise"),
    price: z.string().min(1, "Le prix est requis"),
    condition: z.string().min(1, "L'état est requis"),
    location: z.string().min(1, "La localisation est requise"),
    items: z.array(z.string())
});

export type SalesFormSchema = z.infer<typeof saleFormSchema>;