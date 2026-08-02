import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./OrderDetailScreen.styles";

import apiService from "../../services/apiService";

import IonIcon from "react-native-vector-icons/Ionicons";
import { OrderDetail, TransactionDetail } from "../../types/api";

import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/param";
import ReviewModal from "../ReviewModal/ReviewModal";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatParticipants = (details: TransactionDetail[] | undefined): string => {
  if (!details || details.length === 0) return "Tidak ada data peserta";

  const detail = details[0];
  const parts = [];
  if (detail.quantity_adult > 0) parts.push(`${detail.quantity_adult} Dewasa`);
  if (detail.quantity_child > 0) parts.push(`${detail.quantity_child} Anak`);
  if (detail.quantity_infant > 0) parts.push(`${detail.quantity_infant} Bayi`);
  if (detail.quantity_senior > 0) parts.push(`${detail.quantity_senior} Lansia`);

  return parts.length > 0 ? parts.join(", ") : "N/A";
};

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
        const response = await apiService.get(`v1/booking/${orderId}`, {
          params: {
            lang: "EN",
            currency: "IDR",
          },
        });

        setOrderDetail(response.data);
      } catch (error: any) {
        if (error.response) {
          console.error("Data:", error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
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
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes, Cancel",
          onPress: async () => {
            setIsCancelling(true);
            try {
              await apiService.post(`v1/booking/${orderId}/cancel`);

              setOrderDetail((prevDetails) => {
                if (!prevDetails) return null;
                return { ...prevDetails, status: "cancelled" };
              });

              Alert.alert("Success", "Your booking has been successfully cancelled.");
            } catch (error: any) {
              console.error("Failed to cancel order:", error);
              Alert.alert("Failed", "An error occurred while trying to cancel the booking.");
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
    Alert.alert("Thank You!", "Your review has been successfully submitted.");
  };

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return {
          badge: styles.statusBadgeCompleted,
          text: styles.statusTextCompleted,
        };
      case "processed":
        return {
          badge: styles.statusBadgeProcessed,
          text: styles.statusTextProcessed,
        };
      case "cancelled":
        return {
          badge: styles.statusBadgeCancelled,
          text: styles.statusTextCancelled,
        };
      default:
        return {
          badge: styles.statusBadgePending,
          text: styles.statusTextPending,
        };
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#FF8000" />
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

  const statusStyle = getStatusStyle(orderDetail.status);
  const mainImage = orderDetail.transaction_details?.[0]?.product_detail_image;

  const isCancellable =
    orderDetail && !["completed", "cancelled"].includes(orderDetail.status.toLowerCase());
  const isVoucherActive = orderDetail && orderDetail.status.toLowerCase() !== "cancelled";

  const canReview = orderDetail && orderDetail.status.toLowerCase() === "settlement";

  return (
    <SafeAreaView style={styles.container}>
      {/* Header SELALU ditampilkan di luar kondisi */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <IonIcon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Detail Booking</Text>
        <View style={{ width: 24 }} />
      </View>

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#FF8000" />
        </View>
      ) : !orderDetail ? (
        <View style={styles.centered}>
          <Text>Booking Detail Not Found</Text>
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Booking Status</Text>
                <View style={[styles.statusBadge, getStatusStyle(orderDetail.status).badge]}>
                  <Text style={[styles.statusText, getStatusStyle(orderDetail.status).text]}>
                    {orderDetail.status}
                  </Text>
                </View>
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
                    source={{
                      uri: orderDetail.transaction_details?.[0]?.product_detail_image,
                    }}
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
                    <ActivityIndicator size="small" color="#dc3545" />
                  ) : (
                    <>
                      <IonIcon name="close-circle-outline" size={20} color="#dc3545" />
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
                        Alert.alert("Error", `Tidak bisa membuka URL ini: ${eticketUrl}`);
                      }
                    } catch (error) {
                      Alert.alert("Error", "Gagal membuka E-Voucher.");
                    }
                  }
                }}
              >
                {/* ... Icon dan Text tetap sama ... */}
                <IonIcon
                  name="document-text-outline"
                  size={20}
                  color={isVoucherActive ? "#FFF" : "#333333"}
                />
                <Text
                  style={[styles.primaryButtonText, !isVoucherActive && styles.disabledButtonText]}
                >
                  Lihat E-Voucher
                </Text>
              </TouchableOpacity>
              {canReview && (
                <TouchableOpacity
                  style={styles.reviewButton}
                  onPress={() => setReviewModalVisible(true)}
                >
                  <IonIcon name="star-outline" size={20} color="#FF8000" />
                  <Text style={styles.reviewButtonText}>Tulis Ulasan</Text>
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
        </>
      )}
    </SafeAreaView>
  );
}
