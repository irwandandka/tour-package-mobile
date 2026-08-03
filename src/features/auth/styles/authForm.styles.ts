import { StyleSheet } from "react-native";
import { theme } from "@shared/constants/theme";

/**
 * Was two byte-for-byte identical files (LoginScreen.styles.ts,
 * RegisterScreen.styles.ts) — merged into one shared stylesheet since both
 * screens are visually the same form layout. Colors mapped to theme tokens
 * per docs/color-audit.md; spacing/radii kept as their original literal
 * values (19, 22, 15, ...) rather than force-snapped to the spacing/radii
 * scale, since that would be a visible layout change I can't visually
 * verify in this environment — only the color consolidation is a pure,
 * safe token swap.
 */
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    marginTop: 30,
    color: theme.colors.secondary,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.grey600,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grey700,
  },
  inputFieldWrapper: {
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: 20,
    gap: 9,
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    backgroundColor: theme.colors.grey100,
    paddingVertical: 19,
    paddingHorizontal: 22,
    borderRadius: 15,
  },
  inputFieldPassword: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 11,
    backgroundColor: theme.colors.grey100,
    paddingVertical: 19,
    paddingHorizontal: 22,
    borderRadius: 15,
  },
  rememberMeParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 12,
  },
  rememberMeWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "30%",
    gap: 10,
  },
  forgotPassword: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.bold,
  },
  loginButton: {
    backgroundColor: theme.colors.grey100,
    width: "100%",
    borderRadius: 15,
    paddingVertical: 15,
    marginTop: 30,
  },
  loginButtonActive: {
    backgroundColor: theme.colors.secondary,
    width: "100%",
    borderRadius: 15,
    paddingVertical: 15,
    marginTop: 30,
  },
  loginButtonTextActive: {
    fontSize: theme.typography.fontSize.xl,
    textAlign: "center",
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.white,
  },
  orSignInWith: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grey600,
    textAlign: "center",
    marginVertical: 30,
  },
  loginButtonText: {
    fontSize: theme.typography.fontSize.xl,
    textAlign: "center",
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.grey500,
  },
  loginWithGoogle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: theme.colors.grey200,
    width: "100%",
    paddingVertical: 15,
    borderRadius: 15,
  },
  loginWithFacebook: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    backgroundColor: theme.colors.secondary,
    width: "100%",
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 10,
  },
  signUpWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 9,
  },
  signUpText: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.grey600,
  },
  signUpLink: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.bold,
  },
  backButton: {
    position: "absolute",
    top: 19,
    left: 15,
    backgroundColor: theme.colors.grey500,
    opacity: 0.8,
    padding: 5,
    borderRadius: 21,
  },
});
