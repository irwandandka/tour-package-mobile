import { StyleSheet, Text, View } from "react-native";
import { getStatusColor } from "@shared/utils";
import { theme } from "@shared/constants/theme";

interface StatusBadgeProps {
  status: string;
}

/**
 * Consolidates OrderHistoryScreen's and OrderDetailScreen's separate,
 * diverging getStatusStyle() implementations (different status
 * vocabularies checked, different color values for the same concept) into
 * one component driven by the shared getStatusColor (Phase 4) — both
 * screens now render an identical badge for the same status string.
 */
export function StatusBadge({ status }: StatusBadgeProps) {
  const color = getStatusColor(status);

  return (
    <View style={[styles.badge, { backgroundColor: color.background, borderColor: color.border }]}>
      <Text style={[styles.text, { color: color.text }]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: theme.radii.pill,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 12,
    fontWeight: theme.typography.fontWeight.bold,
    textTransform: "capitalize",
  },
});
