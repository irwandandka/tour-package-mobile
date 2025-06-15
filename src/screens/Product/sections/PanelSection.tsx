import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../ProductScreen.styles";

interface PanelSectionProps {
  activePanel: string;
  setActivePanel: (panel: string) => void;
}

export default function PanelSection({ activePanel, setActivePanel }: PanelSectionProps) {
    return (
        <View style={styles.panelSection}>
            <TouchableOpacity onPress={() => setActivePanel("general")}>
                <Text
                style={[
                    styles.panelText,
                    activePanel === "general" && styles.panelTextActive,
                ]}
                >
                General
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActivePanel("itineraries")}>
                <Text
                style={[
                    styles.panelText,
                    activePanel === "itineraries" && styles.panelTextActive,
                ]}
                >
                Itineraries
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActivePanel("reviews")}>
                <Text
                style={[
                    styles.panelText,
                    activePanel === "reviews" && styles.panelTextActive,
                ]}
                >
                Reviews
                </Text>
            </TouchableOpacity>
        </View>
    );
}