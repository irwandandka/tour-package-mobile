import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./OrderDetailScreen.styles";

import apiService from "../../services/apiService";

import IonIcon from "react-native-vector-icons/Ionicons";
import { OrderDetail } from "../../types/api";
import i18n from "i18next";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/param";
import { RouteProp, useRoute } from "@react-navigation/native";

type OrderDetailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "OrderDetail"
>;

type OrderDetailRouteProp = RouteProp<RootStackParamList, "OrderDetail">;

export default function OrderDetailScreen() {
  const navigation = useNavigation<OrderDetailNavigationProp>();

  const route = useRoute<OrderDetailRouteProp>();
  const { orderId } = route.params;

  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await apiService.get(`v1/booking/${orderId}`, {
          params: {
            // orderId: orderId,
          },
        });
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchOrderDetail();
  }, []);

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

          <Text style={styles.title}>Booking Detail</Text>

          <View style={{ width: 40 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
