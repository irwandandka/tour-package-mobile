import { Dimensions, StyleSheet } from "react-native";
import { theme } from "@shared/constants/theme";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingTop: 40,
    alignItems: "center",
  },
  imageContainer: {
    width: width * 0.8,
    height: 400,
    borderRadius: theme.radii.md,
    overflow: "hidden",
    marginTop: 43,
  },
  textContainer: {
    marginVertical: 42,
    marginHorizontal: theme.spacing.xxxl,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 27,
    textAlign: "center",
    fontWeight: theme.typography.fontWeight.bold,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.md,
    textAlign: "center",
    color: theme.colors.grey600,
    marginTop: theme.spacing.sm,
  },
  button: {
    marginTop: theme.spacing.xl,
    paddingVertical: 19,
    paddingHorizontal: 50,
    borderRadius: 11,
    backgroundColor: theme.colors.secondary,
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: 21,
    textAlign: "center",
  },
});
