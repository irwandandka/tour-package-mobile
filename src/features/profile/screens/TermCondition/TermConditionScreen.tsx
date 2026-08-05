import { useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useTranslation } from "react-i18next";
import IonIcon from "react-native-vector-icons/Ionicons";

import styles from "./TermConditionScreen.styles";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation/types";
import { theme } from "@shared/constants/theme";

type TermConditionNavigationProp = NativeStackNavigationProp<RootStackParamList, "TermCondition">;

const SECTION_COUNT = 7;

/**
 * Legal content — unlike ReviewModal, translation keys were only added to
 * en/translation.json here, not auto-translated into the other 6 languages.
 * A translation error in Terms & Conditions text carries real risk in a
 * way casual UI copy doesn't; relying on i18n's configured fallbackLng
 * ("en") means non-English users still see the (English) terms rather
 * than a machine-translated legal document that hasn't had review.
 */
export default function TermConditionScreen() {
  const navigation = useNavigation<TermConditionNavigationProp>();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <IonIcon name="arrow-back" size={24} color={theme.colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("TermConditionScreen.headerTitle")}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {Array.from({ length: SECTION_COUNT }, (_, i) => i + 1).map((section) => (
          <View key={section}>
            <Text style={styles.sectionTitle}>
              {t(`TermConditionScreen.section${section}Title`)}
            </Text>
            <Text style={styles.paragraph}>{t(`TermConditionScreen.section${section}Body`)}</Text>
          </View>
        ))}

        <Text style={styles.paragraph}>{t("TermConditionScreen.acknowledgement")}</Text>
      </ScrollView>

      <TouchableOpacity
        style={styles.agreeButton}
        onPress={() => Alert.alert(t("TermConditionScreen.agreedMessage"))}
      >
        <Text style={styles.agreeButtonText}>{t("TermConditionScreen.agreeButton")}</Text>
      </TouchableOpacity>
    </View>
  );
}
