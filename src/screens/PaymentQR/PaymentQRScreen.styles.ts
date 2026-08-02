import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 30,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: -10,
    top: "50%",
    transform: [{ translateY: -17.5 }],
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212529",
  },
  qrContainer: {
    marginBottom: 30,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  qrImage: {
    width: 250,
    height: 250,
  },
  loadingText: {
    fontSize: 16,
    color: "#6c757d",
    padding: 20,
  },
  instructionContainer: {
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 30,
    alignItems: "flex-start",
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    width: "100%",
    color: "#343a40",
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#343a40",
  },
  instructionStep: {
    fontSize: 16,
    color: "#495057",
    marginBottom: 8,
    lineHeight: 24,
  },
  doneButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  doneButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
