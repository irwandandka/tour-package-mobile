import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './OrderStatusScreen.styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/param';
import apiService from '../../services/apiService';

type OrderStatusProps = NativeStackScreenProps<RootStackParamList, 'OrderStatus'>;

type TStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export default function OrderStatusScreen({ route, navigation }: OrderStatusProps) {
    const { transactionId } = route.params;
    const [status, setStatus] = useState<TStatus>('PENDING');
    const [message, setMessage] = useState('Waiting for your payment...');

    const intervalId = useRef<NodeJS.Timeout | null>(null);

    const fetchStatus = async () => {
        try {
            const response = await apiService.get(`v1/payment/${transactionId}/status`);
            console.log('Status response:', response.data);
            const transactionStatus = response.data.status_code;

            console.log('Current status:', transactionStatus);

            if (transactionStatus === 'settlement' || transactionStatus === 'capture') {
                setStatus('SUCCESS');
                setMessage('Your payment has been confirmed!');
                if (intervalId.current) clearInterval(intervalId.current);
            } else if (transactionStatus === 'expire' || transactionStatus === 'cancel' || transactionStatus === 'deny') {
                setStatus('FAILED');
                setMessage('Your payment has failed or expired.');
                if (intervalId.current) clearInterval(intervalId.current);
            }
        } catch (error) {
            console.error('Failed to fetch status:', error);
        }
    };

    useEffect(() => {
        intervalId.current = setInterval(fetchStatus, 5000);

        return () => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
            }
        };
    }, [transactionId]);

    const renderStatusIcon = () => {
        switch (status) {
            case 'SUCCESS':
                return <Icon name="checkmark-circle" size={100} color={styles.successIcon.color} />;
            case 'FAILED':
                return <Icon name="close-circle" size={100} color={styles.failedIcon.color} />;
            case 'PENDING':
            default:
                return <ActivityIndicator size="large" color={styles.pendingIcon.color} />;
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.statusBox}>
                    {renderStatusIcon()}
                    <Text style={styles.statusText}>{status}</Text>
                    <Text style={styles.messageText}>{message}</Text>
                </View>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.buttonText}>Back to Home</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}