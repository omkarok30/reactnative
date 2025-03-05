// import { z } from "zod";

import { z } from "zod";

// // Step 1: Category, Subcategory, Services, Description
// export const ServiceFormStepOneSchema = z.object({
//     category: z.string().min(1, "Category is required"),
//     subcategory: z.string().min(1, "Subcategory is required"),
//     services: z.array(z.string()).min(1, "At least one service must be selected"),
//     description: z.string().min(10, "Description must be at least 10 characters long"),
// });

// // Step 2: Photos, Service Area, Spoken Languages
// export const ServiceFormStepTwoSchema = z.object({
//     photos: z.array(z.string()).max(3, "You can upload up to 3 photos"),
//     service_area: z.string().min(1, "Service area is required"),
//     spoken_languages: z.array(z.string()).min(1, "Select at least one language"),
// });

// // Step 3: Billing Type, Price, Availability
// export const ServiceFormStepThreeSchema = z.object({
//     billing_type: z.enum(["hourly", "fixed"], {
//         errorMap: () => ({ message: "Billing type must be 'hourly' or 'fixed'" }),
//     }),
//     price: z.string().min(1, "Price is required"),
//     availability: z.array(z.string()).min(1, "Select at least one availability option"),
// });

// // Final Schema (for validation before submission in the parent)
// export const ServiceFormSchema = ServiceFormStepOneSchema
//     .merge(ServiceFormStepTwoSchema)
//     .merge(ServiceFormStepThreeSchema);

// export type ServiceFormStepOneType = z.infer<typeof ServiceFormStepOneSchema>;
// export type ServiceFormStepTwoType = z.infer<typeof ServiceFormStepTwoSchema>;
// export type ServiceFormStepThreeType = z.infer<typeof ServiceFormStepThreeSchema>;
// export type ServiceFormSchemaType = z.infer<typeof ServiceFormSchema>;

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

