import { useEffect, useState } from "react";
import { ScrollView, Text, Image, View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

import styles from "./LanguageScreen.styles";

import { apiService, ApiResponse } from "@shared/api";
import { getApiErrorMessage } from "@shared/utils";
import { theme } from "@shared/constants/theme";
import { Language } from "@shared/types";
import { useSettingsStore } from "@store/settingsStore";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation/types";

import IonIcon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

type LanguageNavigationProp = NativeStackNavigationProp<RootStackParamList, "Language">;

export default function LanguageScreen() {
  const navigation = useNavigation<LanguageNavigationProp>();
  const { t } = useTranslation();

  const [languages, setLanguages] = useState<Language[]>([]);
  const selectedLanguage = useSettingsStore((state) => state.language);
  const setLanguage = useSettingsStore((state) => state.setLanguage);

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const response = await apiService.get<ApiResponse<Language[]>>("v1/base/languages");
        setLanguages(response.data);
      } catch (error) {
        console.error("Failed to load languages:", getApiErrorMessage(error));
      }
    };

    fetchLanguage();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <IonIcon name="arrow-back" size={24} color={theme.colors.black} />
          </TouchableOpacity>

          <Text style={styles.title}>{t("HomeScreen.navbar.language")}</Text>

          <View style={{ width: 40 }} />
        </View>

        <View style={styles.menuDivider} />

        <View style={styles.listGroup}>
          {languages.map((language) => {
            const isSelected = selectedLanguage === language.code;

            return (
              <View key={language.code}>
                <View style={styles.listItem}>
                  <View style={styles.groupFlag}>
                    <View style={styles.wrapperFlag}>
                      <Image source={{ uri: language.logo }} style={styles.flagLogo} />
                    </View>
                    <Text style={styles.listTitle}>{language.name}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.listToggleSelect}
                    onPress={() => setLanguage(language.code)}
                  >
                    <View style={[styles.outerCircle, isSelected && styles.outerCircleSelected]}>
                      {isSelected && <View style={styles.innerCircle} />}
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.listDivider} />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
