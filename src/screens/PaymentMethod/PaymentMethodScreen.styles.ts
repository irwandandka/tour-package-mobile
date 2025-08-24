import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 15,
    },
    backButton: {
        backgroundColor: "#b4b4b4ff",
        opacity: 0.8,
        padding: 5,
        borderRadius: 21,
        marginBottom: 15,
        alignSelf: 'flex-start',
    },
    // Search Section
    groupSearch: {
        borderRadius: 7,
        backgroundColor: "#fff",
        padding: 16,
        marginBottom: 15,

        // Shadow iOS
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 4,

        // Shadow Android
        elevation: 5,
    },
    searchTitle: {
        fontSize: 18,
        fontWeight: 600,
        color: "#000",
        marginBottom: 5,
    },
    searchSubtitle: {
        fontSize: 14,
        fontWeight: 400,
        color: "#666",
        marginBottom: 12,
    },
    searchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginTop: 8,
    },
    iconSearch: {
        //
    },

    // List Payment Method Section
    groupPaymentMethod: {
        borderRadius: 7,
        backgroundColor: "#fff",
        padding: 16,
        marginBottom: 15,

        // Shadow iOS
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 4,

        // Shadow Android
        elevation: 5,
    },
    listPaymentMethod: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    groupLogoTitle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        gap: 12,
    },
    titlePaymentMethod: {
        fontSize: 16,
        fontWeight: 600,
        color: "#000",
        marginBottom: 5,
    },
    logoPaymentMethod: {
        width: 100,
        height: 50,
        borderRadius: 5,
        marginRight: 12,
        resizeMode: "contain",
    },
    toggleSelect: {
        padding: 10,
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2, // ketebalan ring
        borderColor: "#aaa",
        justifyContent: "center",
        alignItems: "center",
    },
    ringActive: {
        borderColor: "#42CE6D",
        borderWidth: 3, // bisa atur tebal aktif
    },
    // dot: {
    //     width: 12,
    //     height: 12,
    //     borderRadius: 6,
    //     backgroundColor: "#4CAF50",
    // },

    // Total Amount Section
    groupTotalAmount: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 7,
        backgroundColor: "#fff",
        padding: 16,
        marginBottom: 15,

        // Shadow iOS
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 4,

        // Shadow Android
        elevation: 5,
    },
    groupAmount: {
        flexDirection: 'column',
    },
    titleTotalAmount: {
        fontSize: 17,
        fontWeight: 500,
        color: "#000",
    },
    amountTotal: {
        fontSize: 15,
        fontWeight: 600,
        color: "#666",
    },
    buttonChoose: {
        borderRadius: 7,
        backgroundColor: "#42CE6D",
        paddingHorizontal: 21,
        paddingVertical: 15,
        alignItems: "center",
        marginTop: 12,
    },
    textButtonChoose: {
        fontSize: 16,
        fontWeight: 600,
        color: "#fff",
    },
    buttonUnchoosed: {
        borderRadius: 7,
        backgroundColor: "#7f7f7fff",
        paddingHorizontal: 21,
        paddingVertical: 15,
        alignItems: "center",
        marginTop: 12,
    }
});