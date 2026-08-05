import { StyleSheet } from "react-native";
import { theme } from "@shared/constants/theme";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    opacity: 0.8,
    padding: 15,
    color: theme.colors.black,
    borderRadius: 21,
    alignSelf: "flex-start",
  },
  groupTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  title: {
    fontSize: 21,
    fontWeight: "800",
    color: theme.colors.grey700,
  },

  groupPanel: {
    borderRadius: theme.radii.xs,
    backgroundColor: theme.colors.white,
    padding: 16,
    marginHorizontal: theme.spacing.md,
    marginBottom: 15,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  groupBookingInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  bookingInfoTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.black,
    marginBottom: theme.spacing.md,
  },
  bookingInfoLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.grey600,
  },

  groupRoomDetail: {
    flexDirection: "column",
    gap: 5,
  },
  roomTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.black,
  },
  roomSequence: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.grey700,
  },
  passengerLabel: {
    fontSize: theme.typography.fontSize.sm,
    textAlign: "right",
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.grey600,
  },
  groupAmountDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  amountDetail: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.grey600,
  },

  groupPaymentMethod: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  groupPaymentSelected: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  paymentMethodLogo: {
    width: 100,
    height: 50,
    borderRadius: theme.radii.xs,
    marginRight: 21,
    resizeMode: "contain",
  },
  paymentMethodTitle: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.black,
    marginBottom: 5,
  },
  textChange: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.success,
    textDecorationLine: "underline",
  },
  buttonPay: {
    backgroundColor: theme.colors.success,
    padding: theme.spacing.md,
    borderRadius: theme.radii.sm,
    alignItems: "center",
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonPayDisabled: {
    backgroundColor: theme.colors.grey400,
  },
  groupTextButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  textButtonPay: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: "800",
    color: theme.colors.white,
  },
  iconShield: {
    marginLeft: theme.spacing.sm,
    color: theme.colors.white,
  },
});
