import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

type SkeletonBoxProps = {
  width?: number;
  height?: number;
  borderRadius?: number;
  marginRight?: number;
};

const SkeletonBox: React.FC<SkeletonBoxProps> = ({
  width = 120,
  height = 150,
  borderRadius = 10,
  marginRight = 16,
}) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          opacity,
          width,
          height,
          borderRadius,
          marginRight,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#e0e0e0",
  },
});

export default SkeletonBox;
