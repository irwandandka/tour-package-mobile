import { StyleSheet } from "react-native";

const COLORS = {
  primary: "#FF8000",
  white: "#FFFFFF",
  darkGray: "#333333",
  gray: "#8A8A8A",
  lightGray: "#F5F5F5",
  red: "#dc3545",
};

export default StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  star: {
    marginHorizontal: 5,
  },
  commentInput: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    textAlignVertical: "top",
    marginBottom: 24,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 8,
  },
  cancelButtonText: {
    color: COLORS.gray,
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginLeft: 8,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#BDBDBD",
  },
});
