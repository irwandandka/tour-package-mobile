import { z } from "zod";
import { emailSchema, passwordSchema, nameSchema } from "@shared/utils/validation/schemas";

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
