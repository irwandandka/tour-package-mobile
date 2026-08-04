import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import styles from "../ProductScreen.styles";

interface PanelSectionProps {
  activePanel: string;
  setActivePanel: (panel: "general" | "itineraries" | "reviews") => void;
}

export default function PanelSection({ activePanel, setActivePanel }: PanelSectionProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.panelSection}>
      <TouchableOpacity onPress={() => setActivePanel("general")}>
        <Text style={[styles.panelText, activePanel === "general" && styles.panelTextActive]}>
          {t("ProductPage.navbar.general")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActivePanel("itineraries")}>
        <Text style={[styles.panelText, activePanel === "itineraries" && styles.panelTextActive]}>
          {t("ProductPage.navbar.itinerary")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActivePanel("reviews")}>
        <Text style={[styles.panelText, activePanel === "reviews" && styles.panelTextActive]}>
          {t("ProductPage.navbar.reviews")}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
