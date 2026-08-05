import { StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "@shared/constants/theme";
import { useNetworkStatus } from "@shared/hooks";

export function OfflineBanner() {
  const isConnected = useNetworkStatus();
  const insets = useSafeAreaInsets();

  if (isConnected) return null;

  return (
    <Text style={[styles.banner, { paddingTop: insets.top + theme.spacing.xs }]}>
      No internet connection
    </Text>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: theme.colors.error,
    color: theme.colors.white,
    textAlign: "center",
    paddingBottom: theme.spacing.xs,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  },
});
