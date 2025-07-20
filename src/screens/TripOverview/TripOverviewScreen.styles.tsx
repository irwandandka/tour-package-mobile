import { StyleSheet } from 'react-native';

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

    // Room Section
    roomSection: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    titleRoomSection: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    roomCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#e0e0e0',
        marginBottom: 15,
    },
    roomCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 0.5,
        borderColor: '#e0e0e0',
    },
    roomCardHeaderButtonAdd: {
        backgroundColor: '#f29d38',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        color: '#fff',
        fontWeight: 'bold',
    },
    roomCardButtonAddTitle: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    roomCardHeaderTitle: {
        fontSize: 18,
        fontWeight: 'semibold',
        color: '#333',
    },
    roomCardHeaderAllotment: {
        fontSize: 14,
        color: '#666',
    },
    roomCardBody: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 15,
        gap: 25,
    },
    roomCardBodyImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 15,
    },
    roomTitleWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    roomCardBodyTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    roomCardInputGrouping: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 15,
    },
    roomCardBodyInputWrapper: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    roomCardBodyInputTitle: {
        fontSize: 14,
        color: '#666',
    },
    roomInputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d9d9d9',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    roomInputButtonDecrement: {
        // backgroundColor: '#f0f0f0',
        padding: 5,
        borderRadius: 21,
    },
    roomInputTextDecrement: {
        fontSize: 17,
        color: '#000',
        textAlign: 'center',
        width: 25,
        height: 25,
        lineHeight: 25,
    },
    roomInputButtonIncrement: {
        // backgroundColor: '#f0f0f0',
        padding: 5,
        borderRadius: 21,
    },
    roomInputTextIncrement: {
        fontSize: 17,
        color: '#000',
        textAlign: 'center',
        width: 25,
        height: 25,
        lineHeight: 25,
    },
    inputValue: {
        width: 30,
        textAlign: 'center',
        fontSize: 16,
        color: '#000',
    },

    // Travel Summary Section
    travelSummaryCard: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#e0e0e0',
        padding: 15,
        marginBottom: 20,
    },
    travelSummaryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    dateSummaryGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    dateSummaryIcon: {
        // width: 24,
        // height: 24,
    },
    dateSummaryTextGroup: {
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 5,
    },
    dateSummaryText: {
        fontSize: 12,
        color: '#333',
    },
    dateSummaryString: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'semibold',
    },
    dateSummaryDayName: {
        fontSize: 12,
        fontWeight: 'semibold',
        color: '#777',
    },
});