import { z } from "zod";

export const checkoutFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
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
  paymentMethod: z.enum(["apple-pay", "paypal", "card"], {
    message: "Please select a payment method",
  }),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
