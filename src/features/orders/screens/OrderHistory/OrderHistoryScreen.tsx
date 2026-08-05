import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./OrderHistoryScreen.styles";

import { apiService, ApiResponse } from "@shared/api";
import { getApiErrorMessage, formatCurrency } from "@shared/utils";
import { theme } from "@shared/constants/theme";
import { EmptyState } from "@shared/components";
import { OrderHistory } from "@shared/types";
import { StatusBadge } from "../../components/StatusBadge";

import IonIcon from "react-native-vector-icons/Ionicons";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation/types";

type OrderHistoryNavigationProp = NativeStackNavigationProp<RootStackParamList, "OrderHistory">;

const statusFilters = [
  { label: "All", value: "all" },
  { label: "Settlement", value: "settlement" },
  { label: "Entry", value: "entry" },
  { label: "Cancelled", value: "canceled" },
];

export default function OrderHistoryScreen() {
  const navigation = useNavigation<OrderHistoryNavigationProp>();

  const [statusActive, setStatusActive] = useState<string>("all");
  const [orderHistories, setOrderHistories] = useState<OrderHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.get<ApiResponse<OrderHistory[]>>("v1/booking/history", {
          status: statusActive === "all" ? undefined : statusActive,
        });
        setOrderHistories(response.data);
      } catch (error) {
        console.error("Failed to load order history:", getApiErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderHistory();
  }, [statusActive]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <IonIcon name="arrow-back" size={24} color={theme.colors.black} />
        </TouchableOpacity>

        <Text style={styles.title}>Booking History</Text>

        <View style={{ width: 40 }} />
      </View>

      <View style={styles.groupTabStatus}>
        {statusFilters.map((filter) => (
          <TouchableOpacity
            key={filter.value}
            style={[
              styles.itemTabStatus,
              statusActive === filter.value ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => setStatusActive(filter.value)}
          >
            <Text
              style={[
                styles.textTabStatus,
                statusActive === filter.value ? styles.activeTextTab : styles.inactiveTextTab,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 50 }} />
      ) : orderHistories.length === 0 ? (
        <EmptyState
          title="No order history yet"
          description="Try changing the filter or create a new booking."
        />
      ) : (
        <FlatList
          data={orderHistories}
          keyExtractor={(order) => order.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item: order }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("OrderDetail", { orderId: order.id })}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.productTitle} numberOfLines={1}>
                  {order.product}
                </Text>
                <StatusBadge status={order.status} />
              </View>

              <View style={styles.dateContainer}>
                <IonIcon name="calendar-outline" style={styles.iconCalendar} />
                <Text style={styles.orderDate}>{order.booking_date}</Text>
              </View>

              <Text style={styles.orderPrice}>{formatCurrency(order.total_amount)}</Text>

              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => navigation.navigate("Product", { slug: order.slug })}
                >
                  <Text style={styles.secondaryButtonText}>Book Again</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={() => navigation.navigate("OrderDetail", { orderId: order.id })}
                >
                  <Text style={styles.primaryButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}
