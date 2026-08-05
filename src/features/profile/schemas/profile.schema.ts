import { z } from "zod";
import { emailSchema } from "@shared/utils/validation/schemas";

/**
 * ProfileScreen had zero validation before this, same as PassengerDetail
 * did before Phase 9. No "validation.*" i18n keys exist for these new
 * field-required messages — literal English text, matching the same call
 * made for passenger.schema.ts.
 */
export const profileSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  username: z.string().min(1, "Username is required"),
  email: emailSchema,
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().optional(),
  birth_date: z.string().optional(),
  gender: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
