import { Dimensions, StyleSheet } from "react-native";
import { theme } from "@shared/constants/theme";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  menuContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: screenWidth * 0.8,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.xl,
    elevation: 5,
    zIndex: 999,
    height: screenHeight,
  },
  menuBarClose: {
    position: "absolute",
    top: 40,
    right: theme.spacing.xl,
    zIndex: 1000,
  },
  menuProfileParent: {
    flexDirection: "column",
    gap: theme.spacing.xs,
    marginTop: 40,
    marginBottom: theme.spacing.xl,
  },
  menuBarAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 3,
  },
  menuUserName: {
    fontSize: 17,
    fontWeight: theme.typography.fontWeight.bold,
  },
  menuUserEmail: {
    fontSize: 15,
    color: theme.colors.grey600,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  menuDivider: {
    borderBottomColor: theme.colors.grey400,
    borderBottomWidth: 1,
  },
  menuParent: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: screenHeight * 0.7,
  },
  menuItemParent: {
    flexDirection: "column",
    gap: 21,
    marginTop: 23,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 19,
  },
  menuText: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
  },
});
