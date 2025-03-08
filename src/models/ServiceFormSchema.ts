import { z } from "zod";

export const serviceFormSchema = z.object({
    category: z.string().min(1, "Category is required"),
    subcategory: z.string().min(1, "Subcategory is required"),
    services: z.array(z.string()).min(1, "At least one service must be selected"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    photos: z.array(z.string().url("Invalid URL format")).max(3, "You can upload up to 3 photos"),
    price: z.string().min(1, "Price is required"),
    billing_type: z.string().min(1, "Billing type is required"),
    availability: z.array(z.string()).min(1, "Select at least one availability option"),
    service_area: z.string().min(1, "Service area is required"),
    spoken_languages: z.array(z.string()).min(1, "Select at least one language"),
});

export type ServiceFormSchema = z.infer<typeof serviceFormSchema>;

