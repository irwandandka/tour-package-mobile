import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./PaymentSummaryScreen.styles";

import IonIcon from "react-native-vector-icons/Ionicons";
import FeatherIcon from "react-native-vector-icons/Feather";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/param";

import apiService from "../../services/apiService";

import { PaymentMethod, Room, Transaction } from "../../types/api";

import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

type PaymentSummaryProps = NativeStackScreenProps<RootStackParamList, "PaymentSummary">;

export default function PaymentSummaryScreen({ route, navigation }: PaymentSummaryProps) {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { transactionId } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionResponse = await apiService.get(`v1/booking/${transactionId}`);
        setTransaction(transactionResponse.data);

        const paymentJson = await AsyncStorage.getItem("selectedPayment");
        if (paymentJson) {
          setSelectedPayment(JSON.parse(paymentJson));
        }

        const roomsJson = await AsyncStorage.getItem("rooms");
        if (roomsJson) {
          setRooms(JSON.parse(roomsJson));
        }
      } catch (error: any) {
        Toast.show({
          type: "error",
          text1: "Error fetching data",
          text2: error.message,
        });
      }
    };

    fetchData();
  }, [transactionId]);

  const handlePayment = async () => {
    if (!selectedPayment || !transaction) return;

    setIsLoading(true);

    try {
      const body = {
        payment_method: selectedPayment.id,
      };

      const response = await apiService.post(`v1/payment/${transactionId}`, body);
      const data = response.data;

      if (data && data.deep_link_url) {
        const supported = await Linking.canOpenURL(data.deep_link_url);
        if (supported) {
          await Linking.openURL(data.deep_link_url);
          navigation.navigate("OrderStatus", { transactionId: transaction.id });
        } else {
          Toast.show({
            type: "error",
            text1: "Cannot open GoPay",
            text2: "Please make sure the GoJek app is installed.",
          });
        }
      } else {
        throw new Error("Deep link URL not provided by server.");
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Payment initiation failed.";
      Toast.show({ type: "error", text1: "Error", text2: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.groupTitle}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <FeatherIcon name="chevron-left" size={35} />
            </TouchableOpacity>
            <Text style={styles.title}>Payment Confirmation</Text>
          </View>

          {/* Booking Information Panel */}
          <View style={styles.groupPanel}>
            <Text style={styles.bookingInfoTitle}>Booking Information</Text>
            <View style={styles.groupBookingInfo}>
              <Text style={styles.bookingInfoLabel}>Booking Code</Text>
              <Text style={styles.bookingInfoLabel}>{transaction?.code}</Text>
            </View>
            <View style={styles.groupBookingInfo}>
              <Text style={styles.bookingInfoLabel}>Customer Name</Text>
              <Text style={styles.bookingInfoLabel}>{transaction?.customer_name}</Text>
            </View>
            <View style={styles.groupBookingInfo}>
              <Text style={styles.bookingInfoLabel}>From Date</Text>
              <Text style={styles.bookingInfoLabel}>{transaction?.from_date}</Text>
            </View>
            <View style={styles.groupBookingInfo}>
              <Text style={styles.bookingInfoLabel}>To Date</Text>
              <Text style={styles.bookingInfoLabel}>{transaction?.to_date}</Text>
            </View>
          </View>

          {/* Room & Amount Details Panel */}
          <View style={styles.groupPanel}>
            {rooms.map((room, index) => (
              <View key={index} style={styles.groupRoomDetail}>
                <Text style={styles.roomTitle}>{room.roomName}</Text>
                <Text style={styles.roomSequence}>Room #{index + 1}</Text>
                {room.adult > 0 && (
                  <Text style={styles.passengerLabel}>
                    {room.adult} Adult x IDR {(Number(room.priceAdult) || 0).toFixed(2)}
                  </Text>
                )}
                {room.child > 0 && (
                  <Text style={styles.passengerLabel}>
                    {room.child} Child x IDR {(Number(room.priceChild) || 0).toFixed(2)}
                  </Text>
                )}
                {room.infant > 0 && (
                  <Text style={styles.passengerLabel}>
                    {room.infant} Infant x IDR {(Number(room.priceInfant) || 0).toFixed(2)}
                  </Text>
                )}
                {room.senior > 0 && (
                  <Text style={styles.passengerLabel}>
                    {room.senior} Senior x IDR {(Number(room.priceSenior) || 0).toFixed(2)}
                  </Text>
                )}
              </View>
            ))}
            <View style={{ height: 1, backgroundColor: "#eee", marginVertical: 10 }} />
            <View style={styles.groupAmountDetail}>
              <Text style={styles.amountDetail}>Subtotal Amount</Text>
              <Text style={styles.amountDetail}>
                IDR {(Number(transaction?.total_amount) || 0).toFixed(2)}
              </Text>
            </View>
            <View style={styles.groupAmountDetail}>
              <Text style={styles.amountDetail}>Grand Total</Text>
              <Text style={styles.amountDetail}>
                IDR {(Number(transaction?.total_amount) || 0).toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Payment Method Panel */}
          <View style={styles.groupPanel}>
            <View style={styles.groupPaymentMethod}>
              <Text style={styles.roomTitle}>Payment Method</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.textChange}>Change</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.groupPaymentSelected}>
              <Image source={{ uri: selectedPayment?.logo }} style={styles.paymentMethodLogo} />
              <Text style={styles.paymentMethodTitle}>{selectedPayment?.name}</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.buttonPay,
                (isLoading || !selectedPayment) && { backgroundColor: "#ccc" },
              ]}
              onPress={handlePayment}
              disabled={isLoading || !selectedPayment || !transaction}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <View style={styles.groupTextButton}>
                  <Text style={styles.textButtonPay}>Pay</Text>
                  <IonIcon style={styles.iconShield} name="shield-checkmark-outline" size={23} />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
