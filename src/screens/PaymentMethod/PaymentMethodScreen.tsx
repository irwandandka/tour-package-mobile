import React, { useEffect } from "react";

import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./PaymentMethodScreen.styles";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/param";
import { RouteProp, useRoute } from "@react-navigation/native";

import apiService from "../../services/apiService";

import { Transaction, PaymentMethod } from "../../types/api";

import Toast from "react-native-toast-message";

import FeatherIcon from "react-native-vector-icons/Feather";
import IonIcon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

type PaymentMethodNavigationProp = NativeStackNavigationProp<RootStackParamList, "PaymentMethod">;

type PaymentMethodRouteProp = RouteProp<RootStackParamList, "PaymentMethod">;

export default function PaymentMethodScreen() {
  const navigation = useNavigation<PaymentMethodNavigationProp>();

  const route = useRoute<PaymentMethodRouteProp>();

  const { transactionId } = route.params;

  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const getTransaction = async () => {
      try {
        const response = await apiService.get(`v1/booking/${transactionId}`, {
          params: {
            lang: "EN",
            currency: "IDR",
          },
        });

        setTransaction(response.data);
      } catch (error: any) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message,
        });
      }
    };

    const getPaymentMethods = async () => {
      try {
        const response = await apiService.get(`v1/payment/list`, {
          params: {
            lang: "EN",
          },
        });

        setPaymentMethods(response.data);
      } catch (error: any) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.message,
        });
      }
    };

    getPaymentMethods();
    getTransaction();
  }, [transactionId]);

  const handlePaymentMethodSelected = async (id: string) => {
    try {
      setSelectedPayment(id);

      const selectedPayment = paymentMethods.find((method) => method.id === id);
      await AsyncStorage.setItem("selectedPayment", JSON.stringify(selectedPayment));
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
  };

  const handlePaymentMethodChoosed = async () => {
    if (!selectedPayment || !transaction?.id) return;

    setIsProcessing(true);
    try {
      const body = {
        payment_method: selectedPayment,
        transaction_id: transaction.id,
      };

      const response = await apiService.post(`v1/payment/set-payment-method`, body);

      navigation.navigate("PaymentSummary", {
        transactionId: transaction.id,
        paymentMethodId: selectedPayment,
      });
    } catch (error: any) {
      if (error.response) {
        console.error("Data:", error.response.data);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.response.data.message || "Gagal memproses pembayaran.",
        });
      } else {
        console.error("Error message:", error.message);
        Toast.show({ type: "error", text1: "Error", text2: "Terjadi masalah koneksi." });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (value: number) => {
    if (typeof value !== "number") {
      return "0.00";
    }
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-left" size={27} color={"#FFFFFF"} />
          </TouchableOpacity>
          <View style={styles.groupSearch}>
            <Text style={styles.searchTitle}>Payment Method</Text>

            <Text style={styles.searchSubtitle}>search your payment method</Text>

            <View style={styles.searchContainer}>
              <TextInput placeholder="Search" placeholderTextColor="#999" />
              <FeatherIcon name="search" size={20} color="#666" style={styles.iconSearch} />
            </View>
          </View>

          <View style={styles.groupPaymentMethod}>
            {paymentMethods.map((method) => (
              <View key={method.id} style={styles.listPaymentMethod}>
                <View style={styles.groupLogoTitle}>
                  <Image source={{ uri: method.logo }} style={styles.logoPaymentMethod} />
                  <Text style={styles.titlePaymentMethod}>{method.name}</Text>
                </View>
                <TouchableOpacity
                  style={styles.toggleSelect}
                  onPress={() => handlePaymentMethodSelected(method.id)}
                >
                  <View style={[styles.ring, method.id === selectedPayment && styles.ringActive]} />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={selectedPayment && !isProcessing ? styles.buttonChoose : styles.buttonUnchoosed}
            onPress={handlePaymentMethodChoosed}
            disabled={!selectedPayment || isProcessing}
          >
            {isProcessing ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.textButtonChoose}>Choose</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
