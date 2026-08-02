import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  groupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 31,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    padding: 8,
  },
  saveButton: {
    padding: 8,
  },
  groupProfile: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginBottom: 31,
  },
  groupImage: {
    position: "relative",
  },
  imageProfile: {
    width: 150,
    height: 150,
    borderRadius: 90,
    padding: 7,

    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,

    elevation: 5,
  },
  uploadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 90,
  },
  wrapperIcon: {
    borderColor: "#888888ff",
    borderWidth: 2,
    borderRadius: 50,
    padding: 6,
    backgroundColor: "#fff",
  },
  iconAddPhoto: {
    position: "absolute",
    bottom: 11,
    right: 11,
  },

  groupInformation: {
    flexDirection: "column",
    gap: 15,
    marginTop: 21,
  },
  titleInformation: {
    fontSize: 16,
    fontWeight: "bold",
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  phoneContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
    overflow: "hidden",
  },
  countryCode: {
    width: 100,
    height: 50,
  },
  phoneInput: {
    flex: 1,
    padding: 12,
  },
});
