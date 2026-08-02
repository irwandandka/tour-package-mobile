import { colors } from "./colors";
import { spacing } from "./spacing";
import { typography } from "./typography";
import { radii } from "./radii";
import { shadows } from "./shadows";

export const theme = {
  colors,
  spacing,
  typography,
  radii,
  shadows,
} as const;

export type Theme = typeof theme;

export { colors } from "./colors";
export { spacing } from "./spacing";
export { typography, fontSize, fontWeight, lineHeight } from "./typography";
export { radii } from "./radii";
export { shadows, shadow } from "./shadows";
