import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";

import styles from "./OrderStatusScreen.styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation/types";
import { apiService } from "@shared/api";

type OrderStatusProps = NativeStackScreenProps<RootStackParamList, "OrderStatus">;

const TERMINAL_SUCCESS_CODES = ["settlement", "capture"];
const TERMINAL_FAILURE_CODES = ["expire", "cancel", "deny"];
const POLL_INTERVAL_MS = 5000;

type DisplayStatus = "PENDING" | "SUCCESS" | "FAILED";

function toDisplayStatus(statusCode: string | undefined): DisplayStatus {
  if (statusCode && TERMINAL_SUCCESS_CODES.includes(statusCode)) return "SUCCESS";
  if (statusCode && TERMINAL_FAILURE_CODES.includes(statusCode)) return "FAILED";
  return "PENDING";
}

export default function OrderStatusScreen({ route, navigation }: OrderStatusProps) {
  const { transactionId } = route.params;

  const { data: statusCode } = useQuery({
    queryKey: ["orderStatus", transactionId],
    queryFn: async () => {
      const response = await apiService.get<{ status_code: string }>(
        `v1/payment/${transactionId}/status`,
      );
      return response.status_code;
    },
    refetchInterval: (query) => {
      const displayStatus = toDisplayStatus(query.state.data);
      return displayStatus === "PENDING" ? POLL_INTERVAL_MS : false;
    },
  });

  const status = toDisplayStatus(statusCode);
  const message =
    status === "SUCCESS"
      ? "Your payment has been confirmed!"
      : status === "FAILED"
        ? "Your payment has failed or expired."
        : "Waiting for your payment...";

  const renderStatusIcon = () => {
    switch (status) {
      case "SUCCESS":
        return <Icon name="checkmark-circle" size={100} color={styles.successIcon.color} />;
      case "FAILED":
        return <Icon name="close-circle" size={100} color={styles.failedIcon.color} />;
      case "PENDING":
      default:
        return <ActivityIndicator size="large" color={styles.pendingIcon.color} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.statusBox}>
          {renderStatusIcon()}
          <Text style={styles.statusText}>{status}</Text>
          <Text style={styles.messageText}>{message}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
