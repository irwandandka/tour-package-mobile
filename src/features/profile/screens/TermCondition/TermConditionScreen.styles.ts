import { StyleSheet } from "react-native";
import { theme } from "@shared/constants/theme";

/** Dropped the unused `title` key — only `headerTitle` is actually rendered. */
export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    marginBottom: 21,
  },
  backButton: {
    padding: 6,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.xl,
    marginTop: theme.spacing.xxxl,
    fontWeight: theme.typography.fontWeight.bold,
    textAlign: "center",
    flex: 1,
  },

  scrollContent: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.grey700,
  },

  agreeButton: {
    backgroundColor: theme.colors.warning,
    margin: 16,
    paddingVertical: 14,
    borderRadius: theme.radii.sm,
    alignItems: "center",
  },
  agreeButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
