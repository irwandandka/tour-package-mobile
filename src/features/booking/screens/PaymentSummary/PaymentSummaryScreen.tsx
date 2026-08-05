import { useEffect, useState } from "react";
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
import { useTranslation } from "react-i18next";

import styles from "./PaymentSummaryScreen.styles";

import IonIcon from "react-native-vector-icons/Ionicons";
import FeatherIcon from "react-native-vector-icons/Feather";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation/types";

import { apiService, ApiResponse } from "@shared/api";
import { getApiErrorMessage, formatCurrency } from "@shared/utils";
import { theme } from "@shared/constants/theme";
import { PaymentMethod, Transaction } from "@shared/types";
import { useBookingStore } from "../../store/bookingStore";

import Toast from "react-native-toast-message";

type PaymentSummaryProps = NativeStackScreenProps<RootStackParamList, "PaymentSummary">;

export default function PaymentSummaryScreen({ route, navigation }: PaymentSummaryProps) {
  const { t } = useTranslation();
  const { transactionId } = route.params;

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const rooms = useBookingStore((state) => state.rooms);
  const selectedPaymentMethodId = useBookingStore((state) => state.selectedPaymentMethodId);
  const resetBooking = useBookingStore((state) => state.reset);

  const selectedPayment =
    paymentMethods.find((method) => method.id === selectedPaymentMethodId) ?? null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionResponse, paymentMethodsResponse] = await Promise.all([
          apiService.get<ApiResponse<Transaction>>(`v1/booking/${transactionId}`),
          apiService.get<ApiResponse<PaymentMethod[]>>("v1/payment/list", { lang: "EN" }),
        ]);

        setTransaction(transactionResponse.data);
        setPaymentMethods(paymentMethodsResponse.data);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error fetching data",
          text2: getApiErrorMessage(error),
        });
      }
    };

    fetchData();
  }, [transactionId]);

  const handlePayment = async () => {
    if (!selectedPayment || !transaction) return;

    setIsLoading(true);

    try {
      const body = { payment_method: selectedPayment.id };

      const response = await apiService.post<ApiResponse<{ deep_link_url?: string }>>(
        `v1/payment/${transactionId}`,
        body,
      );

      const deepLinkUrl = response.data?.deep_link_url;

      if (deepLinkUrl) {
        const supported = await Linking.canOpenURL(deepLinkUrl);
        if (supported) {
          await Linking.openURL(deepLinkUrl);
          resetBooking();
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
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: getApiErrorMessage(error, "Payment initiation failed."),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.groupTitle}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <FeatherIcon name="chevron-left" size={35} color={theme.colors.black} />
            </TouchableOpacity>
            <Text style={styles.title}>{t("PaymentSummaryScreen.title")}</Text>
          </View>

          <View style={styles.groupPanel}>
            <Text style={styles.bookingInfoTitle}>
              {t("PaymentSummaryScreen.bookingInformation")}
            </Text>
            <View style={styles.groupBookingInfo}>
              <Text style={styles.bookingInfoLabel}>{t("PaymentSummaryScreen.bookingCode")}</Text>
              <Text style={styles.bookingInfoLabel}>{transaction?.code}</Text>
            </View>
            <View style={styles.groupBookingInfo}>
              <Text style={styles.bookingInfoLabel}>{t("PaymentSummaryScreen.customerName")}</Text>
              <Text style={styles.bookingInfoLabel}>{transaction?.customer_name}</Text>
            </View>
            <View style={styles.groupBookingInfo}>
              <Text style={styles.bookingInfoLabel}>{t("PaymentSummaryScreen.fromDate")}</Text>
              <Text style={styles.bookingInfoLabel}>{transaction?.from_date}</Text>
            </View>
            <View style={styles.groupBookingInfo}>
              <Text style={styles.bookingInfoLabel}>{t("PaymentSummaryScreen.toDate")}</Text>
              <Text style={styles.bookingInfoLabel}>{transaction?.to_date}</Text>
            </View>
          </View>

          <View style={styles.groupPanel}>
            {rooms.map((room, index) => (
              <View key={room.id} style={styles.groupRoomDetail}>
                <Text style={styles.roomTitle}>{room.roomName}</Text>
                <Text style={styles.roomSequence}>Room #{index + 1}</Text>
                {room.adult > 0 && (
                  <Text style={styles.passengerLabel}>
                    {room.adult} {t("PaymentSummaryScreen.adult")} x{" "}
                    {formatCurrency(room.priceAdult)}
                  </Text>
                )}
                {room.child > 0 && (
                  <Text style={styles.passengerLabel}>
                    {room.child} {t("PaymentSummaryScreen.child")} x{" "}
                    {formatCurrency(room.priceChild)}
                  </Text>
                )}
                {room.infant > 0 && (
                  <Text style={styles.passengerLabel}>
                    {room.infant} {t("PaymentSummaryScreen.infant")} x{" "}
                    {formatCurrency(room.priceInfant)}
                  </Text>
                )}
                {room.senior > 0 && (
                  <Text style={styles.passengerLabel}>
                    {room.senior} {t("PaymentSummaryScreen.senior")} x{" "}
                    {formatCurrency(room.priceSenior)}
                  </Text>
                )}
              </View>
            ))}
            <View
              style={{ height: 1, backgroundColor: theme.colors.grey200, marginVertical: 10 }}
            />
            <View style={styles.groupAmountDetail}>
              <Text style={styles.amountDetail}>{t("PaymentSummaryScreen.subtotalAmount")}</Text>
              <Text style={styles.amountDetail}>
                {formatCurrency(transaction?.total_amount ?? 0)}
              </Text>
            </View>
            <View style={styles.groupAmountDetail}>
              <Text style={styles.amountDetail}>{t("PaymentSummaryScreen.grandTotal")}</Text>
              <Text style={styles.amountDetail}>
                {formatCurrency(transaction?.total_amount ?? 0)}
              </Text>
            </View>
          </View>

          <View style={styles.groupPanel}>
            <View style={styles.groupPaymentMethod}>
              <Text style={styles.roomTitle}>{t("PaymentSummaryScreen.paymentMethod")}</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.textChange}>{t("PaymentSummaryScreen.change")}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.groupPaymentSelected}>
              <Image source={{ uri: selectedPayment?.logo }} style={styles.paymentMethodLogo} />
              <Text style={styles.paymentMethodTitle}>{selectedPayment?.name}</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.buttonPay,
                (isLoading || !selectedPayment) && styles.buttonPayDisabled,
              ]}
              onPress={handlePayment}
              disabled={isLoading || !selectedPayment || !transaction}
            >
              {isLoading ? (
                <ActivityIndicator color={theme.colors.white} />
              ) : (
                <View style={styles.groupTextButton}>
                  <Text style={styles.textButtonPay}>{t("PaymentSummaryScreen.pay")}</Text>
                  <IonIcon
                    style={styles.iconShield}
                    name="shield-checkmark-outline"
                    size={23}
                    color={theme.colors.white}
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
