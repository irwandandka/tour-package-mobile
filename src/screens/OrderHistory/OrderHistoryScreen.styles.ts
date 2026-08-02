import { StyleSheet } from "react-native";

const COLORS = {
    primary: '#FF8000',
    white: '#FFFFFF',
    black: '#000000',
    lightGray: '#F5F5F5',
    gray: '#8A8A8A',
    darkGray: '#333333',
};

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: COLORS.white,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.darkGray,
    },
    backButton: {
        padding: 6,
    },
    groupTabStatus: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: COLORS.white,
    },
    itemTabStatus: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    textTabStatus: {
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    activeTab: { backgroundColor: COLORS.primary },
    activeTextTab: { color: COLORS.white },
    inactiveTab: { backgroundColor: COLORS.lightGray },
    inactiveTextTab: { color: COLORS.darkGray },
    
    listContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        gap: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.darkGray,
        flex: 1,
        marginRight: 8,
    },
    statusBadge: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderWidth: 1,
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    iconCalendar: {
        fontSize: 16,
        color: COLORS.gray,
    },
    orderDate: {
        fontSize: 14,
        color: COLORS.gray,
        fontWeight: '500',
    },
    orderPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.darkGray,
        textAlign: 'left',
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: COLORS.lightGray,
        paddingTop: 12,
        marginTop: 4,
    },
    secondaryButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryButtonText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 14,
    },
    primaryButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 14,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.gray,
        marginTop: 16,
    },
    emptySubtext: {
        fontSize: 14,
        color: COLORS.gray,
        marginTop: 8,
    }
});