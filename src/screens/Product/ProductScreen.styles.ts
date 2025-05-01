import { StyleSheet } from "react-native";

export default StyleSheet.create({
    imageContainer: {
        position: "relative",
    },
    image: {
        width: "100%",
        height: 350,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    backButton: {
        position: "absolute",
        top: 19,
        left: 15,
        backgroundColor: "#999999",
        opacity: 0.8,
        padding: 5,
        borderRadius: 21,
    },
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    locationParent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 5,
    },
    locationTitle: {
        fontSize: 16,
        color: "#666",
    },
    panelSection: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 29,
        marginTop: 32,
    },
    panelText: {
        fontSize: 21,
        fontWeight: "bold",
        color: "black",
    },
    panelTextActive: {
        color: "#F29D38", // contoh saat aktif
    },
    // General Style
    generalSection: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 11,
    },
    ratingDurationContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
        gap: 29,
    },
    generalSubSection: {
        flexDirection: 'column',
        width: '21%',
        height: 70,
        justifyContent: 'space-between',
    },
    generalSubSectionIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 9,
    },
    generalSubSectionText: {
        fontSize: 23,
        color: "black",
    },
    generalSectionText: {
        fontSize: 19,
        color: "#666",
        textAlign: "right",
        fontWeight: "bold",
        marginTop: 5,
    },
    generalDurationText: {
        fontSize: 19,
        width: '65%',
        color: "black",
        fontWeight: "500",
        textAlign: "right",
    },
    generalSubSectionDuration: {
        flexDirection: 'column',
        width: '27%',
        justifyContent: 'space-between',
    },
    generalDescriptionSection: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 13,
        marginTop: 20,
    },
    generalDescriptionTitle: {
        fontSize: 21,
        fontWeight: "bold",
        color: 'black',
    },
    generalDescriptionText: {
        fontSize: 15,
        textAlign: 'justify',
    },
    generalDescriptionReadMore: {
        fontSize: 15,
        color: "#EF4444",
        fontWeight: "700",
    },
    buttonBookNow: {
        backgroundColor: "#3A5694",
        borderRadius: 13,
        paddingVertical: 21,
        marginTop: 15,
    },
    buttonBookNowText: {
        fontSize: 21,
        color: "#FFFFFF",
        fontWeight: "bold",
        textAlign: "center",
    },
    // End General Style

    // Review Style
    reviewSection: {
        flexDirection: 'column',
        marginTop: 20,
        gap: 21,
    },
    reviewCard: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 11,
        paddingVertical: 15,
        paddingHorizontal: 13,
        backgroundColor: "#F5F5F5",
        borderRadius: 13,
        shadowColor: 'black',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    reviewRatingAndDateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reviewCardRatingGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 5,
    },
    reviewCardDate: {
        fontSize: 15,
        color: "#666",
        fontWeight: "700",
    },
    reviewCardDescription: {
        fontSize: 15,
        color: "black",
        textAlign: 'justify',
    },
    reviewCardAvatarAndNameContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 13,
    },
    reviewCardAvatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    reviewCardNameEmailContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 2,
    },
    reviewCardName: {
        fontSize: 19,
        fontWeight: "700",
        color: "black",
    },
    reviewCardEmail: {
        fontSize: 15,
        color: "#666",
        fontWeight: "600",
    }
    // End Review Style
});