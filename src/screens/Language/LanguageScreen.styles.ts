import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        height: 50, // kasih tinggi biar posisi relatif jelas
    },
    title: {
        position: "absolute",
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
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
        flexDirection: 'column',
        gap: 9,
        marginVertical: 21,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 7,
    },
    groupFlag: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
    },
    wrapperFlag: {
        padding: 2, // kasih ruang biar shadow kelihatan
        borderRadius: 20, 
        backgroundColor: '#fff', // wajib biar shadow/elevation muncul di Android
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
        fontWeight: '600',
        color: '#3c3b3bff',
    },
    listToggleSelect: {
        padding: 8,
    },

    outerCircle: {
        width: 24,
        height: 24,
        borderRadius: 12, // bulat
        borderWidth: 2,
        borderColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
    },

    outerCircleSelected: {
        borderColor: "#1609ccff", // warna aktif
    },

    innerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#1203bcb4", // warna isi lingkaran saat aktif
    },
    listDivider: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 0.6,
    }
});