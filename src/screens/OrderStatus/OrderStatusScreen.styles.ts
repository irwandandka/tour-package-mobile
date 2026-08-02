import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    statusBox: {
        alignItems: 'center',
        marginBottom: 40,
        padding: 30,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    statusText: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 20,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    messageText: {
        fontSize: 16,
        color: '#6c757d',
        marginTop: 10,
        textAlign: 'center',
    },
    pendingIcon: {
        color: '#007bff',
    },
    successIcon: {
        color: '#28a745',
    },
    failedIcon: {
        color: '#dc3545',
    },
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#007bff',
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;