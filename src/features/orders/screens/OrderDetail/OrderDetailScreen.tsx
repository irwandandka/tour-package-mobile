import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import Toast from "react-native-toast-message";
import styles from "./OrderDetailScreen.styles";

import { apiService, ApiResponse } from "@shared/api";
import { getApiErrorMessage, formatCurrency } from "@shared/utils";
import { theme } from "@shared/constants/theme";
import { OrderDetail, TransactionDetail } from "@shared/types";
import { StatusBadge } from "../../components/StatusBadge";
import { ReviewModal } from "../../components/ReviewModal";

import IonIcon from "react-native-vector-icons/Ionicons";

import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation/types";

function formatParticipants(details: TransactionDetail[] | undefined): string {
  if (!details || details.length === 0) return "No participant data";

  const detail = details[0];
  const parts: string[] = [];
  if (detail.quantity_adult > 0) parts.push(`${detail.quantity_adult} Adult`);
  if (detail.quantity_child > 0) parts.push(`${detail.quantity_child} Child`);
  if (detail.quantity_infant > 0) parts.push(`${detail.quantity_infant} Infant`);
  if (detail.quantity_senior > 0) parts.push(`${detail.quantity_senior} Senior`);

  return parts.length > 0 ? parts.join(", ") : "N/A";
}

type OrderDetailNavigationProp = NativeStackNavigationProp<RootStackParamList, "OrderDetail">;
type OrderDetailRouteProp = RouteProp<RootStackParamList, "OrderDetail">;

export default function OrderDetailScreen() {
  const navigation = useNavigation<OrderDetailNavigationProp>();
  const route = useRoute<OrderDetailRouteProp>();
  const { orderId } = route.params;

  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isReviewModalVisible, setReviewModalVisible] = useState(false);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.get<ApiResponse<OrderDetail>>(`v1/booking/${orderId}`, {
          lang: "EN",
          currency: "IDR",
        });
        setOrderDetail(response.data);
      } catch (error) {
        console.error("Failed to load order detail:", getApiErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  const handleCancelOrder = async () => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this booking? This action cannot be undone.",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          onPress: async () => {
            setIsCancelling(true);
            try {
              await apiService.post(`v1/booking/${orderId}/cancel`);

              setOrderDetail((prevDetails) =>
                prevDetails ? { ...prevDetails, status: "cancelled" } : null,
              );

              Toast.show({
                type: "success",
                text1: "Success",
                text2: "Your booking has been successfully cancelled.",
              });
            } catch (error) {
              Toast.show({ type: "error", text1: "Failed", text2: getApiErrorMessage(error) });
            } finally {
              setIsCancelling(false);
            }
          },
          style: "destructive",
        },
      ],
    );
  };

  const handleReviewSubmitted = () => {
    setReviewModalVisible(false);
    Toast.show({
      type: "success",
      text1: "Thank You!",
      text2: "Your review has been successfully submitted.",
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  if (!orderDetail) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>Booking Detail Not Found</Text>
      </SafeAreaView>
    );
  }

  const isCancellable = !["completed", "cancelled"].includes(orderDetail.status.toLowerCase());
  const isVoucherActive = orderDetail.status.toLowerCase() !== "cancelled";
  const canReview = orderDetail.status.toLowerCase() === "settlement";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <IonIcon name="arrow-back" size={24} color={theme.colors.black} />
        </TouchableOpacity>
        <Text style={styles.title}>Booking Detail</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Booking Status</Text>
            <StatusBadge status={orderDetail.status} />
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tour Code</Text>
            <Text style={styles.infoValue}>{orderDetail.code}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Booking Date</Text>
            <Text style={styles.infoValue}>{orderDetail.booking_date}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tour Detail</Text>
          <View style={styles.serviceContainer}>
            {orderDetail.transaction_details?.[0]?.product_detail_image && (
              <Image
                source={{ uri: orderDetail.transaction_details[0].product_detail_image }}
                style={styles.serviceImage}
              />
            )}
            <View style={styles.serviceTextContainer}>
              <Text style={styles.serviceName}>{orderDetail.product}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tour Schedule</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tour Date</Text>
            <Text style={styles.infoValue}>{orderDetail.from_date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Participants</Text>
            <Text style={styles.infoValue}>
              {formatParticipants(orderDetail.transaction_details)}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Details</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Payment Method</Text>
            <Text style={styles.infoValue}>{orderDetail.payment_method}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.totalLabel}>Total Payment</Text>
            <Text style={styles.totalValue}>{formatCurrency(orderDetail.total_amount)}</Text>
          </View>
        </View>

        <View style={styles.actionContainer}>
          {isCancellable && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelOrder}
              disabled={isCancelling}
            >
              {isCancelling ? (
                <ActivityIndicator size="small" color={theme.colors.error} />
              ) : (
                <>
                  <IonIcon name="close-circle-outline" size={20} color={theme.colors.error} />
                  <Text style={styles.cancelButtonText}>Cancel Booking</Text>
                </>
              )}
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.primaryButton, !isVoucherActive && styles.disabledButton]}
            disabled={!isVoucherActive}
            onPress={async () => {
              const eticketUrl = orderDetail?.eticket?.url;
              if (isVoucherActive && eticketUrl) {
                try {
                  const supported = await Linking.canOpenURL(eticketUrl);
                  if (supported) {
                    await Linking.openURL(eticketUrl);
                  } else {
                    Toast.show({
                      type: "error",
                      text1: "Error",
                      text2: `Unable to open this URL: ${eticketUrl}`,
                    });
                  }
                } catch {
                  Toast.show({ type: "error", text1: "Error", text2: "Failed to open E-Voucher." });
                }
              }
            }}
          >
            <IonIcon
              name="document-text-outline"
              size={20}
              color={isVoucherActive ? theme.colors.white : theme.colors.grey700}
            />
            <Text style={[styles.primaryButtonText, !isVoucherActive && styles.disabledButtonText]}>
              View E-Voucher
            </Text>
          </TouchableOpacity>
          {canReview && (
            <TouchableOpacity
              style={styles.reviewButton}
              onPress={() => setReviewModalVisible(true)}
            >
              <IonIcon name="star-outline" size={20} color={theme.colors.primary} />
              <Text style={styles.reviewButtonText}>Write a Review</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <ReviewModal
        visible={isReviewModalVisible}
        onClose={() => setReviewModalVisible(false)}
        onSubmit={handleReviewSubmitted}
        orderId={orderId}
      />
    </SafeAreaView>
  );
}
