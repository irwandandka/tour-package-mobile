import React from "react";
import { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from './PaymentMethodScreen.styles';

export default function PaymentMethodScreen() {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}