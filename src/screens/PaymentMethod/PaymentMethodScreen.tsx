import React, { useEffect } from "react";

// Hooks
import { useState } from "react";
import { 
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Styles
import styles from './PaymentMethodScreen.styles';

// Navigation
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/param";
import { RouteProp, useRoute } from "@react-navigation/native";

// Services
import apiService from "../../services/apiService";

// interface
import { Transaction, PaymentMethod } from "../../types/api";

// Toast
import Toast from "react-native-toast-message";

// Icons
import FeatherIcon from "react-native-vector-icons/Feather";
import IonIcon from "react-native-vector-icons/Ionicons";

type PaymentMethodNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "PaymentMethod"
>;

type PaymentMethodRouteProp = RouteProp<RootStackParamList, "PaymentMethod">;

export default function PaymentMethodScreen() {

    const navigation = useNavigation<PaymentMethodNavigationProp>();
    
    const route = useRoute<PaymentMethodRouteProp>();

    const { transactionId } = route.params;

    // transaction state
    const [transaction, setTransaction] = useState<Transaction | null>(null);

    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

    useEffect(() => {
        const getTransaction = async () => {
            try {
                const response = await apiService.get(`v1/booking/${transactionId}`, {
                    params: {
                        lang: 'EN',
                        currency: 'SGD',
                    }
                });

                setTransaction(response.data);
            } catch (error: any) {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: error.message,
                });
            }
        }

        const getPaymentMethods = async () => {
            try {
                const response = await apiService.get(`v1/payment/list`, {
                    params: {
                        lang: 'EN',
                    }
                });

                setPaymentMethods(response.data);
            } catch (error: any) {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: error.message,
                });
            }
        }

        getPaymentMethods();
        getTransaction();
    }, [transactionId]);

    const handlePaymentMethodSelected = async (id: string) => {
        try {
            setSelectedPayment(id);
        } catch (error: any) {
            console.error(error);
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.message,
            });
        }
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <FeatherIcon name="chevron-left" size={27} color={"#FFFFFF"} />
                    </TouchableOpacity>
                    <View style={styles.groupSearch}>
                        <Text style={styles.searchTitle}>
                            Payment Method
                        </Text>

                        <Text style={styles.searchSubtitle}>
                            search your payment method
                        </Text>

                        <View style={styles.searchContainer}>
                            <TextInput
                                placeholder="Search"
                                placeholderTextColor="#999"
                            />
                            <FeatherIcon name="search" size={20} color="#666" style={styles.iconSearch} />
                        </View>
                    </View>

                    <View style={styles.groupPaymentMethod}>
                        {paymentMethods.map((method) => (
                            <View key={method.id} style={styles.listPaymentMethod}>
                                <View style={styles.groupLogoTitle}>
                                    <Image source={{ uri: method.logo }} style={styles.logoPaymentMethod} />
                                    <Text style={styles.titlePaymentMethod}>{method.name}</Text>
                                </View>
                                <TouchableOpacity 
                                    style={styles.toggleSelect} 
                                    onPress={() => handlePaymentMethodSelected(method.id)}
                                >
                                    <View style={[styles.ring, method.id === selectedPayment && styles.ringActive]} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                    <View style={styles.groupTotalAmount}>
                        <View style={styles.groupAmount}>
                            <Text style={styles.titleTotalAmount}>Total Amount</Text>
                            <Text style={styles.amountTotal}>SGD {transaction?.total_amount}</Text>
                        </View>
                        <TouchableOpacity style={selectedPayment ? styles.buttonChoose : styles.buttonUnchoosed}>
                            <Text style={styles.textButtonChoose}>Choose</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}