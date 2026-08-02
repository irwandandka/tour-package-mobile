import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/param";
import styles from "./PaymentQRScreen.styles";

type PaymentQrScreenProps = NativeStackScreenProps<RootStackParamList, "PaymentQr">;

export default function PaymentQrScreen({ route, navigation }: PaymentQrScreenProps) {
  const { qrData, transaction } = route.params;

  const handleGoBack = () => navigation.goBack();

  const handleCheckStatus = () => {
    if (transaction?.id) {
      navigation.navigate("OrderStatus", { transactionId: transaction.id });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <FeatherIcon name="chevron-left" size={35} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Scan to Pay</Text>
        </View>

        <View style={styles.qrContainer}>
          {qrData ? (
            <Image style={styles.qrImage} source={{ uri: qrData }} resizeMode="contain" />
          ) : (
            <Text style={styles.loadingText}>Loading QR Code...</Text>
          )}
        </View>

        <View style={styles.instructionContainer}>
          <Text style={styles.amount}>
            Total Amount: IDR {(Number(transaction?.total_amount) || 0).toFixed(2)}
          </Text>
          <Text style={styles.instructionTitle}>How to Pay:</Text>
          <Text style={styles.instructionStep}>1. Open your GoJek / GoPay app.</Text>
          <Text style={styles.instructionStep}>2. Tap the 'Pay' or 'Scan' button.</Text>
          <Text style={styles.instructionStep}>3. Scan the QR code shown above.</Text>
          <Text style={styles.instructionStep}>4. Confirm the payment details in the app.</Text>
        </View>

        <TouchableOpacity style={styles.doneButton} onPress={handleCheckStatus}>
          <Text style={styles.doneButtonText}>I Have Paid, Check Status</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
