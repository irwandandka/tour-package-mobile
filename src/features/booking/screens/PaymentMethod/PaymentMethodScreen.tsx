import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";

import styles from "./PaymentMethodScreen.styles";

import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation/types";

import { apiService, ApiResponse } from "@shared/api";
import { getApiErrorMessage, formatCurrency } from "@shared/utils";
import { theme } from "@shared/constants/theme";
import { Transaction, PaymentMethod } from "@shared/types";
import { useBookingStore } from "../../store/bookingStore";

import Toast from "react-native-toast-message";

import FeatherIcon from "react-native-vector-icons/Feather";

type PaymentMethodNavigationProp = NativeStackNavigationProp<RootStackParamList, "PaymentMethod">;
type PaymentMethodRouteProp = RouteProp<RootStackParamList, "PaymentMethod">;

export default function PaymentMethodScreen() {
  const navigation = useNavigation<PaymentMethodNavigationProp>();
  const route = useRoute<PaymentMethodRouteProp>();
  const { t } = useTranslation();

  const { transactionId } = route.params;

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedPaymentMethodId = useBookingStore((state) => state.selectedPaymentMethodId);
  const setSelectedPaymentMethodId = useBookingStore((state) => state.setSelectedPaymentMethodId);

  useEffect(() => {
    const getTransaction = async () => {
      try {
        const response = await apiService.get<ApiResponse<Transaction>>(
          `v1/booking/${transactionId}`,
          { lang: "EN", currency: "IDR" },
        );
        setTransaction(response.data);
      } catch (error) {
        Toast.show({ type: "error", text1: "Error", text2: getApiErrorMessage(error) });
      }
    };

    const getPaymentMethods = async () => {
      try {
        const response = await apiService.get<ApiResponse<PaymentMethod[]>>("v1/payment/list", {
          lang: "EN",
        });
        setPaymentMethods(response.data);
      } catch (error) {
        Toast.show({ type: "error", text1: "Error", text2: getApiErrorMessage(error) });
      }
    };

    getPaymentMethods();
    getTransaction();
  }, [transactionId]);

  const handlePaymentMethodChoosed = async () => {
    if (!selectedPaymentMethodId || !transaction?.id) return;

    setIsProcessing(true);
    try {
      const body = {
        payment_method: selectedPaymentMethodId,
        transaction_id: transaction.id,
      };

      await apiService.post("v1/payment/set-payment-method", body);

      navigation.navigate("PaymentSummary", {
        transactionId: transaction.id,
        paymentMethodId: selectedPaymentMethodId,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: getApiErrorMessage(error, "Gagal memproses pembayaran."),
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-left" size={27} color={theme.colors.white} />
          </TouchableOpacity>
          <View style={styles.groupSearch}>
            <Text style={styles.searchTitle}>{t("PaymentMethodScreen.title")}</Text>

            <Text style={styles.searchSubtitle}>{t("PaymentMethodScreen.searchSubtitle")}</Text>

            <View style={styles.searchContainer}>
              <TextInput placeholder="Search" placeholderTextColor={theme.colors.grey500} />
              <FeatherIcon name="search" size={20} color={theme.colors.grey600} />
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
                  onPress={() => setSelectedPaymentMethodId(method.id)}
                >
                  <View
                    style={[
                      styles.ring,
                      method.id === selectedPaymentMethodId && styles.ringActive,
                    ]}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {transaction && (
            <View style={styles.groupTotalAmount}>
              <Text style={styles.titleTotalAmount}>{t("PaymentMethodScreen.totalAmount")}</Text>
              <Text style={styles.amountTotal}>{formatCurrency(transaction.total_amount)}</Text>
            </View>
          )}

          <TouchableOpacity
            style={
              selectedPaymentMethodId && !isProcessing
                ? styles.buttonChoose
                : styles.buttonUnchoosed
            }
            onPress={handlePaymentMethodChoosed}
            disabled={!selectedPaymentMethodId || isProcessing}
          >
            {isProcessing ? (
              <ActivityIndicator size="small" color={theme.colors.white} />
            ) : (
              <Text style={styles.textButtonChoose}>{t("PaymentMethodScreen.choose")}</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
