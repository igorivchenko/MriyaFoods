import { z } from "zod";

export const cooperationFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),
  phone: z.string().optional().or(z.literal("")),
  messenger: z.string().optional().or(z.literal("")),
  message: z.string().optional().or(z.literal("")),
});

export type CooperationFormValues = z.infer<typeof cooperationFormSchema>;
