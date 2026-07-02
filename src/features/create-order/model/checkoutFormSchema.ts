import { z } from "zod";

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name cannot be longer than 50 characters" }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name cannot be longer than 50 characters" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  email: z
    .string()
    .min(1, { message: "E-mail is required" })
    .email({ message: "Invalid email address" }),
  country: z.string().min(1, { message: "Country/Region is required" }),
  city: z.string().min(1, { message: "Town/City is required" }),
  street: z.string().min(1, { message: "Street is required" }),
  postcode: z.string().min(1, { message: "Postcode is required" }),
  packagingType: z.string().optional().or(z.literal("")),
  shippingOption: z.string().optional().or(z.literal("")),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
