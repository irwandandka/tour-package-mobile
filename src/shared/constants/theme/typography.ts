/**
 * Type scale. Existing screens use ad hoc fontSize values from 10-32 and mix
 * valid RN fontWeight values ("400"-"800", "bold", "normal") with invalid
 * ones ("regular", "semibold" are not valid React Native fontWeight values
 * and silently no-op at runtime) — found in HomeScreen, PassengerDetailScreen,
 * and TripOverviewScreen's style files during the Phase 1 audit. Those get
 * fixed when each screen migrates onto this scale (Phase 8/9), not here.
 */

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  display: 32,
} as const;

export const fontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const lineHeight = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
} as const;

export const typography = { fontSize, fontWeight, lineHeight } as const;

export type ThemeTypography = typeof typography;
