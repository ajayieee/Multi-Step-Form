import { z } from "zod";

export const personalInfoschema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "last Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is too short"),
});

export const profesionalInfoschema = z.object({
  company: z.string().min(1, "Combany is required"),
  position: z.string().min(1, "Position is required"),
  experience: z.enum(["0-2", "3-5", "6-10", "10+"]), // enum means you can only enter these values
  industry: z.string().min(1, "Industry is required"),
});

export const billingInfoschema = z.object({
  cardNumber: z
    .string()
    .min(16, "Card must be 16 digits")
    .max(16, "Card must be 16 digits"),
  cardHolder: z.string().min(1, "CardHolder name is required"),
  expiryDate: z.string().min(4, "Invalid expiry date"),
  cvv: z.string().min(3, "Invalid CVV").max(4),
});

export type PersonalInfo = z.infer<typeof personalInfoschema>;
export type ProfessionalInfo = z.infer<typeof profesionalInfoschema>;
export type BillingInfo = z.infer<typeof billingInfoschema>;

export type StepFormData = PersonalInfo | ProfessionalInfo | BillingInfo;
export type AllFormData = PersonalInfo & ProfessionalInfo & BillingInfo;

export interface Step {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}
