import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./OrderHistoryScreen.styles";

import apiService from "../../services/apiService";

import IonIcon from "react-native-vector-icons/Ionicons";
import { Language, OrderHistory } from "../../types/api";
import i18n from "i18next";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/param";

type OrderHistoryNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "OrderHistory"
>;

export default function OrderHistoryScreen() {
  const navigation = useNavigation<OrderHistoryNavigationProp>();

  const status = ["all", "completed", "upcoming", "canceled"];

  const [statusActive, setStatusActive] = useState<string>("all");

  const [orderHistories, setOrderHistories] = useState<OrderHistory[]>([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await apiService.get("v1/booking/history", {
          params: {
            status: statusActive === "all" ? undefined : statusActive,
          },
        });

        setOrderHistories(response.data);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchOrderHistory();
  }, [statusActive]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <IonIcon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          <Text style={styles.title}>Booking History</Text>

          <View style={{ width: 40 }} />
        </View>

        <View style={styles.groupTabStatus}>
          {status.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.itemTabStatus,
                statusActive === item ? styles.activeTab : styles.inactiveTab,
              ]}
              onPress={() => setStatusActive(item)}
            >
              <Text
                style={[
                  styles.textTabStatus,
                  statusActive === item
                    ? styles.activeTextTab
                    : styles.inactiveTextTab,
                ]}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.groupOrderHistory}>
          {orderHistories.map((order) => (
            <View key={order.id} style={styles.itemOrderHistory}>
              <View style={styles.orderRow}>
                <Text style={styles.orderLabel}>{order.product}</Text>
                <View style={styles.orderStatusContainer}>
                  <Text style={styles.orderValue}>
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Text>
                </View>
              </View>
              <View style={styles.groupOrderDate}>
                <IonIcon name="calendar" style={styles.iconCalendar} />
                <Text style={styles.orderDate}>{order.booking_date}</Text>
              </View>
              <Text style={styles.orderPrice}>
                SGD {order.total_amount.toFixed(2)}
              </Text>

              <View style={styles.groupButton}>
                <TouchableOpacity
                  style={styles.buttonDetails}
                  // onPress={() => navigation.navigate('OrderDetail', { id: order.id })}
                >
                  <Text style={styles.buttonDetailsText}>View Details</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonBookAgain}
                  // onPress={() => navigation.navigate('Booking', { productId: order.product_id })}
                >
                  <Text style={styles.buttonBookAgainText}>Book Again</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
