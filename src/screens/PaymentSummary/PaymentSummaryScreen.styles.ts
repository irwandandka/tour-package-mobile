import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    opacity: 0.8,
    padding: 15,
    color: "#000",
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
    fontWeight: 800,
    color: "#393939ff",
  },

  groupPanel: {
    borderRadius: 7,
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: 12,
    marginBottom: 15,

    shadowColor: "#000",
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
    fontSize: 18,
    fontWeight: 700,
    color: "#000",
    marginBottom: 12,
  },
  bookingInfoLabel: {
    fontSize: 14,
    fontWeight: 400,
    color: "#666",
  },

  groupRoomDetail: {
    flexDirection: "column",
    gap: 5,
  },
  roomTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "#000",
  },
  roomSequence: {
    fontSize: 14,
    fontWeight: 400,
    color: "#333",
  },
  passengerLabel: {
    fontSize: 14,
    textAlign: "right",
    fontWeight: 400,
    color: "#666",
  },
  groupAmountDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  amountDetail: {
    fontSize: 16,
    fontWeight: 400,
    color: "#666",
  },

  groupPaymentMethod: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  groupPaymentSelected: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  paymentMethodLogo: {
    width: 100,
    height: 50,
    borderRadius: 5,
    marginRight: 21,
    resizeMode: "contain",
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "#000",
    marginBottom: 5,
  },
  textChange: {
    fontSize: 14,
    fontWeight: 400,
    color: "#42CE6D",
    textDecorationLine: "underline",
  },
  buttonPay: {
    backgroundColor: "#42CE6D",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 5,
  },
  groupTextButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  textButtonPay: {
    fontSize: 16,
    fontWeight: 800,
    color: "#fff",
  },
  iconShield: {
    marginLeft: 8,
    color: "#fff",
  },
});
