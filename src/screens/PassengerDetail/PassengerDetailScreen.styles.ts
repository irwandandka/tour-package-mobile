import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        padding: 21,
    },
    headerSection: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 13,
        color: '#000',
    },
    card: {
        // height: 330,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        borderWidth: 0.8,
        borderColor: '#e0e0e0',
    },
    cardTopSide: {
        height: 200,
    },
    cardImage: {
        width: '100%',
        height: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        resizeMode: 'cover',
    },
    cardBottomSide: {
        justifyContent: 'center',
    },
    cardTitleWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    cardRatingWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 15,
    },
    cardStarIcon: {
        marginRight: 8,
    },
    cardStarRating: {
        fontSize: 19,
        fontWeight: 'semibold',
        color: '#000000',
    },
    textNights: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#999',
    },

    // Contact Information
    contactInformationTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },
    contactInformationCard: {
        flexDirection: "column",
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    contactInformationWrapper: {
        flexDirection: "column",
        gap: 8,
    },
    groupLabel: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 4,
    },
    inputText: {
        fontSize: 14,
        fontWeight: "400",
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 4,
        padding: 12,
    },
    inputCombo: {
        fontSize: 14,
        fontWeight: "400",
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 4,
        padding: 12,
        backgroundColor: "#fff",
    },
});