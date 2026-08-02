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
});
