import { useEffect, useRef } from "react";
import { Animated, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { theme } from "@shared/constants/theme";

interface LoadingSkeletonProps {
  width?: number | `${number}%`;
  height?: number | `${number}%`;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

/** Generalizes src/components/SkeletonBox.tsx (still used by the unmigrated HomeScreen). */
export function LoadingSkeleton({
  width = 120,
  height = 150,
  borderRadius = theme.radii.sm,
  style,
}: LoadingSkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View style={[styles.skeleton, { opacity, width, height, borderRadius }, style]} />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: theme.colors.grey300,
  },
});
