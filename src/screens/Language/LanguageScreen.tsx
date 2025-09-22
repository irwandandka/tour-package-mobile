import React, { useState } from "react";
import { useEffect } from "react";

import styles from "./LanguageScreen.styles";
import { ScrollView, Text, Image, View } from "react-native";
import { TouchableOpacity } from "react-native";

import apiService from "../../services/apiService";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/param";

import IonIcon from "react-native-vector-icons/Ionicons";
import { Language } from "../../types/api";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import i18n from "i18next";

type LanguageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Language"
>;

export default function LanguageScreen() {
  const navigation = useNavigation<LanguageNavigationProp>();

  const [languages, setLanguages] = useState<Language[]>([]);

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const response = await apiService.get("v1/base/languages");

        setLanguages(response.data);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchLanguage();

    const getLanguage = async () => {
      const language = await AsyncStorage.getItem("lang");
      setSelectedLanguage(language);
    };

    getLanguage();
  }, []);

  const handleSelectedLanguage = (code: string) => {
    setSelectedLanguage(code);

    AsyncStorage.setItem("lang", code);
    i18n.changeLanguage(code);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <IonIcon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          <Text style={styles.title}>Booking History</Text>

          <View style={{ width: 40 }} />
        </View>

        <View style={styles.menuDivider} />

        <View style={styles.listGroup}>
          {languages.map((language) => {
            const isSelected = selectedLanguage === language.code;

            return (
              <View id={language.code}>
                <View style={styles.listItem}>
                  <View style={styles.groupFlag}>
                    <View style={styles.wrapperFlag}>
                      <Image
                        source={{ uri: language.logo }}
                        style={styles.flagLogo}
                      />
                    </View>
                    <Text style={styles.listTitle}>{language.name}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.listToggleSelect}
                    onPress={() => handleSelectedLanguage(language.code)}
                  >
                    <View
                      style={[
                        styles.outerCircle,
                        isSelected && styles.outerCircleSelected,
                      ]}
                    >
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
