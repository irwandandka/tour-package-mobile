import { Platform } from "react-native";
import { colors } from "./colors";

type Elevation = "sm" | "md" | "lg";

const elevationMap: Record<Elevation, number> = {
  sm: 2,
  md: 4,
  lg: 8,
};

export function shadow(level: Elevation) {
  const elevation = elevationMap[level];

  return Platform.select({
    ios: {
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: elevation / 2 },
      shadowOpacity: 0.1,
      shadowRadius: elevation,
    },
    android: { elevation },
    default: {},
  });
}

export const shadows = {
  sm: shadow("sm"),
  md: shadow("md"),
  lg: shadow("lg"),
} as const;

export type ThemeShadows = typeof shadows;
