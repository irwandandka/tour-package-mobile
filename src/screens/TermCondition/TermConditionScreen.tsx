import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

import styles from "./TermConditionScreen.styles";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/param";

type TermConditionNavigationProp = NativeStackNavigationProp<RootStackParamList, "TermCondition">;

export default function TermsAndConditions() {
  const navigation = useNavigation<TermConditionNavigationProp>();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <IonIcon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>1. General Terms</Text>
        <Text style={styles.paragraph}>
          By booking a tour package with us, you acknowledge that you have read, understood, and
          agree to be bound by these Terms and Conditions. These terms apply to all users of our
          services.
        </Text>

        <Text style={styles.sectionTitle}>2. Booking Policy</Text>
        <Text style={styles.paragraph}>
          All bookings are subject to availability and confirmation. A booking will only be
          considered valid once payment has been received and a confirmation email has been sent.
          Customers must provide accurate and complete personal information during the booking
          process.
        </Text>

        <Text style={styles.sectionTitle}>3. Payment Terms</Text>
        <Text style={styles.paragraph}>
          Full payment must be made at the time of booking unless otherwise stated. We accept
          payments through authorized methods listed on our platform. Prices are subject to change
          without prior notice.
        </Text>

        <Text style={styles.sectionTitle}>4. Cancellation & Refunds</Text>
        <Text style={styles.paragraph}>
          Cancellation requests must be submitted in writing. Refund eligibility depends on the
          timing of the cancellation:
          {"\n"}- More than 30 days before departure: 80% refund
          {"\n"}- 15–30 days before departure: 50% refund
          {"\n"}- Less than 15 days: Non-refundable
        </Text>

        <Text style={styles.sectionTitle}>5. Traveler Responsibility</Text>
        <Text style={styles.paragraph}>
          Travelers are responsible for obtaining valid passports, visas, and complying with local
          laws. We are not liable for issues arising due to incomplete travel documents or
          violations of local regulations.
        </Text>

        <Text style={styles.sectionTitle}>6. Liability</Text>
        <Text style={styles.paragraph}>
          We are not liable for delays, cancellations, accidents, or losses caused by third parties,
          natural disasters, or unforeseen circumstances beyond our control. Customers are strongly
          advised to purchase travel insurance.
        </Text>

        <Text style={styles.sectionTitle}>7. Governing Law</Text>
        <Text style={styles.paragraph}>
          These Terms & Conditions shall be governed by and construed in accordance with the laws of
          the Republic of Indonesia. Any disputes shall be resolved under the exclusive jurisdiction
          of the courts in Indonesia.
        </Text>

        <Text style={styles.paragraph}>
          By clicking "I Agree", you acknowledge that you have read and accepted all the terms
          outlined above.
        </Text>
      </ScrollView>

      {/* Button */}
      <TouchableOpacity
        style={styles.agreeButton}
        onPress={() => alert("You agreed to the Terms & Conditions")}
      >
        <Text style={styles.agreeButtonText}>I Agree</Text>
      </TouchableOpacity>
    </View>
  );
}
