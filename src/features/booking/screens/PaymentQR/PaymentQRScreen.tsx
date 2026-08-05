import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import FeatherIcon from "react-native-vector-icons/Feather";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation/types";
import { theme } from "@shared/constants/theme";
import { formatCurrency } from "@shared/utils";
import styles from "./PaymentQRScreen.styles";

type PaymentQrScreenProps = NativeStackScreenProps<RootStackParamList, "PaymentQr">;

/**
 * Reachable (registered in RootNavigator since Phase 5) but not yet
 * navigated to from anywhere — PaymentSummaryScreen always assumes a
 * GoPay-style deep link response. See Phase 9's PaymentSummary commit for
 * why: no evidence anywhere in the codebase of what field/shape the
 * backend returns for a QR-based payment, so branching to this screen
 * wasn't added without guessing at that contract.
 */
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
            <FeatherIcon name="chevron-left" size={35} color={theme.colors.grey700} />
          </TouchableOpacity>
          <Text style={styles.title}>Scan to Pay</Text>
        </View>

        <View style={styles.qrContainer}>
          {qrData ? (
            <Image style={styles.qrImage} source={{ uri: qrData }} contentFit="contain" />
          ) : (
            <Text style={styles.loadingText}>Loading QR Code...</Text>
          )}
        </View>

        <View style={styles.instructionContainer}>
          <Text style={styles.amount}>
            Total Amount: {formatCurrency(Number(transaction?.total_amount) || 0)}
          </Text>
          <Text style={styles.instructionTitle}>How to Pay:</Text>
          <Text style={styles.instructionStep}>1. Open your GoJek / GoPay app.</Text>
          <Text style={styles.instructionStep}>
            2. Tap the &apos;Pay&apos; or &apos;Scan&apos; button.
          </Text>
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
