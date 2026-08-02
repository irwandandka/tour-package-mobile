import { StyleSheet } from "react-native";

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
  title: {
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  backButton: {
    padding: 6,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  menuDivider: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  listGroup: {
    flexDirection: "column",
    gap: 9,
    marginVertical: 21,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 7,
  },
  groupFlag: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  wrapperFlag: {
    padding: 2,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  flagLogo: {
    width: 28,
    height: 28,
    borderRadius: 15,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3c3b3bff",
  },
  listToggleSelect: {
    padding: 8,
  },

  outerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },

  outerCircleSelected: {
    borderColor: "#1609ccff",
  },

  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#1203bcb4",
  },
  listDivider: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.6,
  },
});
