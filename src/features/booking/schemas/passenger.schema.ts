import { z } from "zod";
import { emailSchema } from "@shared/utils/validation/schemas";

/**
 * PassengerDetailScreen had zero validation before this — any field
 * (including every passenger's name) could be left blank and submitted.
 * No "validation.*" i18n keys exist yet for these new field-required
 * messages (checked all 7 locale files), unlike emailSchema/passwordSchema
 * which already had keys from before this refactor — using literal English
 * text here rather than inventing new keys with unreviewed translations
 * across 7 languages.
 */
const passengerEntrySchema = z.object({
  title: z.string().min(1, "Title is required"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  type: z.enum(["Adult", "Child", "Infant", "Senior"]).optional(),
  roomName: z.string().optional(),
});

export const passengerDetailSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: emailSchema,
  address: z.string().min(1, "Address is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  passengers: z.array(passengerEntrySchema).min(1, "At least one passenger is required"),
});

export type PassengerDetailFormValues = z.infer<typeof passengerDetailSchema>;
