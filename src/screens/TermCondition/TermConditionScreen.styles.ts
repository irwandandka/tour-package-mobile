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
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        flex: 1,
    },

    scrollContent: {
        flex: 1,
        padding: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 16,
        marginBottom: 8,
    },
    paragraph: {
        fontSize: 15,
        lineHeight: 22,
        color: "#333",
    },

    agreeButton: {
        backgroundColor: "#007BFF",
        margin: 16,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    agreeButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});