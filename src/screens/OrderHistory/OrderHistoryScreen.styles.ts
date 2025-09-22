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
    groupTabStatus: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    itemTabStatus: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    textTabStatus: {
        fontSize: 14,
        fontWeight: '600',
    },
    activeTab: {
        backgroundColor: '#007bff',
    },
    activeTextTab: {
        color: '#fff',
    },
    inactiveTab: {
        backgroundColor: '#f0f0f0',
    },
    inactiveTextTab: {
        color: '#000',
    },
    groupOrderHistory: {
        flexDirection: 'column',
        gap: 12,
        marginTop: 21,
        marginBottom: 30,
    },
    itemOrderHistory: {
        flexDirection: 'column',
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    orderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    orderLabel: {
        fontSize: 19,
        fontWeight: '800',
        color: '#363b42ff',
    },
    orderValue: {
        fontSize: 17,
        fontWeight: '700',
    },
    orderStatusContainer: {
        marginTop: 6,
        alignSelf: 'flex-start',
        paddingVertical: 6,
        paddingHorizontal: 9,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#333',
    },
    orderStatusText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
    },
    groupOrderDate: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 6,
    },
    iconCalendar: {
        fontSize: 21,
        color: '#333',
    },
    orderDate: {
        fontSize: 14,
        fontWeight: '700',
        color: '#555',
    },
    orderPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 12,
    },
    groupButton: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 12,
        paddingHorizontal: 6,
        gap: 12,
    },
    buttonDetails: {
        marginTop: 12,
        width: '50%',
        alignSelf: 'flex-start',
        paddingVertical: 10,
        borderRadius: 15,
        borderColor: '#007bff',
        borderWidth: 2,
    },
    buttonDetailsText: {
        color: '#007bff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonBookAgain: {
        marginTop: 12,
        width: '50%',
        alignSelf: 'flex-start',
        paddingVertical: 12,
        borderRadius: 15,
        backgroundColor: '#007bff',
    },
    buttonBookAgainText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});