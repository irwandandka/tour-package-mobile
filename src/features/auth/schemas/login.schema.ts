import { z } from "zod";
import { emailSchema, passwordSchema } from "@shared/utils/validation/schemas";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;
