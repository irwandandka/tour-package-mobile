import React, { useEffect, useState } from "react";
import { ScrollView, Text, Image, Linking, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// style
import styles from './PaymentSummaryScreen.styles';

// Icon
import IonIcon from "react-native-vector-icons/Ionicons";
import FeatherIcon from "react-native-vector-icons/Feather";

// Navigation
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/param";
import { RouteProp, useRoute } from "@react-navigation/native";

// Services
import apiService from "../../services/apiService";

// interfaces
import { PaymentMethod, Room, Transaction } from "../../types/api";

// Toast
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

type PaymentMethodNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "PaymentMethod"
>;

type PaymentMethodRouteProp = RouteProp<RootStackParamList, "PaymentMethod">;

export default function PaymentSummaryScreen() {
    const navigation = useNavigation<PaymentMethodNavigationProp>();
    const route = useRoute<PaymentMethodRouteProp>();

    const [transaction, setTransaction] = useState<Transaction | null>(null);

    const { transactionId } = route.params;

    const [rooms, setRooms] = useState<Room[]>([]);

    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const response = await apiService.get(`v1/booking/${transactionId}`, {
                    params: {
                        lang: 'EN',
                        currency: 'SGD',
                    }
                });
                setTransaction(response.data);
            } catch (error: any) {
                Toast.show({
                    type: "error",
                    text1: "Error fetching transaction",
                    text2: error.message,
                });
            }
        };

        const fetchRooms = async () => {
            const rooms = await AsyncStorage.getItem('rooms');
            return rooms ? JSON.parse(rooms) : [];
        }

        const fetchSelectedPayment = async () => {
            const selectedPayment = await AsyncStorage.getItem('selectedPayment');
            return selectedPayment ? JSON.parse(selectedPayment) : null;
        };

        fetchTransaction();
        fetchRooms().then(setRooms);
        fetchSelectedPayment().then(setSelectedPayment);
    }, [transactionId]);

    const handlePayment = async () => {
        try {
            const response = await apiService.post(`v1/payment/gopay/${transactionId}`);

            Toast.show({
                type: "success",
                text1: "Payment Successful",
                text2: "Your payment has been processed successfully.",
            });

            const data = response;
            if (data.gopay_url) {
                const supported = await Linking.canOpenURL(data.gopay_url);
                if (supported) {
                    await Linking.openURL(data.gopay_url); // ini bakal buka aplikasi GoPay
                } else {
                    Toast.show({
                    type: "error",
                    text1: "Cannot open GoPay",
                    text2: "Please install GoPay app or try another method.",
                    });
                }
            }
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Error Bang",
                text2: error.message,
            });
        }
    };


    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.groupTitle}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <FeatherIcon name="chevron-left" size={35} />
                        </TouchableOpacity>
                        <Text style={styles.title}>
                            Payment Confirmation
                        </Text>
                    </View>
                    <View style={styles.groupPanel}>
                        <Text style={styles.bookingInfoTitle}>
                            Booking Information
                        </Text>

                        <View style={styles.groupBookingInfo}>
                            <Text style={styles.bookingInfoLabel}>
                                Booking Code
                            </Text>
                            <Text style={styles.bookingInfoLabel}>
                                {transaction?.code}
                            </Text>
                        </View>

                        <View style={styles.groupBookingInfo}>
                            <Text style={styles.bookingInfoLabel}>
                                Customer Name
                            </Text>
                            <Text style={styles.bookingInfoLabel}>
                                {transaction?.customer_name}
                            </Text>
                        </View>

                        <View style={styles.groupBookingInfo}>
                            <Text style={styles.bookingInfoLabel}>
                                From Date
                            </Text>
                            <Text style={styles.bookingInfoLabel}>
                                {transaction?.from_date}
                            </Text>
                        </View>

                        <View style={styles.groupBookingInfo}>
                            <Text style={styles.bookingInfoLabel}>
                                To Date
                            </Text>
                            <Text style={styles.bookingInfoLabel}>
                                {transaction?.to_date}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.groupPanel}>
                        {rooms.length > 0 && rooms.map((room, index) => (
                            <View key={index} style={styles.groupRoomDetail}>
                                <Text style={styles.roomTitle}>
                                    {room.roomName}
                                </Text>
                                <Text style={styles.roomSequence}>
                                    Room #{index + 1}
                                </Text>
                                {room.adult && (
                                    <Text style={styles.passengerLabel}>
                                        {room.adult} Adult x IDR {(Number(room.priceAdult) || 0).toFixed(2)}
                                    </Text>
                                )}
                                {room.child && (
                                    <Text style={styles.passengerLabel}>
                                        {room.child} Child x IDR {(Number(room.priceChild) || 0).toFixed(2)}
                                    </Text>
                                )}
                                {room.infant && (
                                    <Text style={styles.passengerLabel}>
                                        {room.infant} Infant x IDR {(Number(room.priceInfant) || 0).toFixed(2)}
                                    </Text>
                                )}
                                {room.senior && (
                                    <Text style={styles.passengerLabel}>
                                        {room.senior} Senior x IDR {(Number(room.priceSenior) || 0).toFixed(2)}
                                    </Text>
                                )}
                            </View>
                        ))}

                        <View style={{ height: 1, backgroundColor: '#eee', marginVertical: 10 }} />
                        
                        <View style={styles.groupAmountDetail}>
                            <Text style={styles.amountDetail}>
                                Subtotal Amount
                            </Text>
                            <Text style={styles.amountDetail}>
                                IDR {(Number(transaction?.total_amount) || 0).toFixed(2)}
                            </Text>
                        </View>

                        <View style={styles.groupAmountDetail}>
                            <Text style={styles.amountDetail}>
                                Grand Total
                            </Text>
                            <Text style={styles.amountDetail}>
                                IDR {(Number(transaction?.total_amount) || 0).toFixed(2)}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.groupPanel}>
                        <View style={styles.groupPaymentMethod}>
                            <Text style={styles.roomTitle}>
                                Payment Method
                            </Text>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}>
                                <Text style={styles.textChange}>
                                    Change
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.groupPaymentSelected}>
                            <Image source={{ uri: selectedPayment?.logo }} style={styles.paymentMethodLogo} />
                            <Text style={styles.paymentMethodTitle}>{selectedPayment?.name}</Text>
                        </View>

                        <TouchableOpacity 
                            style={styles.buttonPay}
                            onPress={handlePayment}
                            disabled={!selectedPayment}
                        >
                            <View style={styles.groupTextButton}>
                                <Text style={styles.textButtonPay}>
                                    Pay
                                </Text>
                                <IonIcon style={styles.iconShield} name="shield-checkmark-outline" size={23} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}