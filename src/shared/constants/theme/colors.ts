/**
 * Canonical color palette.
 *
 * Derived from a grep audit of every hex literal across src/screens/**\/*.styles.ts(x)
 * (see docs/color-audit.md for the full raw-value -> token mapping used during
 * that audit). Screens still hardcode their own hex values today — they are
 * migrated onto these tokens feature-by-feature, not in one bulk pass, so each
 * screen is only touched once for its full migration.
 */

const brand = {
  primary: "#FF8000",
  secondary: "#3A5694",
  secondaryDark: "#263C54",
  secondaryLight: "#375FA2",
} as const;

const neutral = {
  black: "#000000",
  white: "#FFFFFF",
  grey50: "#F9F9F9",
  grey100: "#F5F6FA",
  grey200: "#F0F0F0",
  grey300: "#E0E0E0",
  grey400: "#CCCCCC",
  grey500: "#999999",
  grey600: "#666666",
  grey700: "#333333",
  grey800: "#212529",
} as const;

const semantic = {
  success: "#42CE6D",
  successBackground: "#EAF7EC",
  error: "#EF4444",
  errorBackground: "#FBEBEE",
  warning: "#FD7E14",
  warningBackground: "#FFF3E8",
  info: "#007BFF",
  infoBackground: "#EBF6FF",
} as const;

export const colors = {
  ...brand,
  ...neutral,
  ...semantic,

  background: neutral.white,
  surface: neutral.grey100,
  border: neutral.grey300,

  textPrimary: neutral.black,
  textSecondary: neutral.grey600,
  textMuted: neutral.grey500,
  textInverse: neutral.white,

  overlay: "rgba(0, 0, 0, 0.5)",
} as const;

export type ThemeColors = typeof colors;
