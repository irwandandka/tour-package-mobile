import { z } from "zod";

/**
 * Zod replacement for src/utils/validation.ts's `validateInput`. Error
 * messages are i18n translation keys, not literal text — the old function
 * took a `t` function and returned already-translated strings, which baked
 * the current language into the validation result. These schemas stay
 * language-agnostic; the consuming form calls t(issue.message) at render
 * time, so switching language doesn't require re-validating.
 *
 * Not wired into LoginScreen/RegisterScreen yet — that's a Phase 7 change
 * alongside their React Hook Form migration, which is what actually
 * consumes these.
 */
export const emailSchema = z
  .string()
  .trim()
  .min(1, "validation.email_required")
  .pipe(z.email("validation.email_invalid"));

export const passwordSchema = z
  .string()
  .min(1, "validation.password_required")
  .min(6, "validation.password_length");

/**
 * NOTE: "validation.name_required"/"validation.name_length" don't exist in
 * any locale file yet (checked all 7) even though RegisterScreen already
 * calls validateInput("name", ...) today — a real pre-existing bug where an
 * empty/short name shows the raw key as text instead of a message. Locale
 * content is added when RegisterScreen's i18n gets wired in Phase 7, not
 * here.
 */
export const nameSchema = z
  .string()
  .min(1, "validation.name_required")
  .min(2, "validation.name_length");
