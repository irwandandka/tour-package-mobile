import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import styles from "./AvailableDateScreen.styles";
import FeatherIcon from "react-native-vector-icons/Feather";
import DropDownPicker from "react-native-dropdown-picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation/types";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { apiService, ApiResponse } from "@shared/api";
import { getApiErrorMessage } from "@shared/utils";
import { theme } from "@shared/constants/theme";
import { AvailablePeriod, AvailableDate, ProductDetail } from "@shared/types";

type AvailableDateNavigationProp = NativeStackNavigationProp<RootStackParamList, "AvailableDate">;
type AvailableDateRouteProp = RouteProp<RootStackParamList, "AvailableDate">;

export default function AvailableDateScreen() {
  const navigation = useNavigation<AvailableDateNavigationProp>();
  const route = useRoute<AvailableDateRouteProp>();
  const { t } = useTranslation();

  const { slug } = route.params;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  const [availablePeriods, setAvailablePeriods] = useState<AvailablePeriod[]>([]);
  const [availableDates, setAvailableDates] = useState<AvailableDate[]>([]);
  const [productName, setProductName] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductName = async () => {
      try {
        const response = await apiService.get<ApiResponse<ProductDetail>>(`v1/product/${slug}`, {
          lang: "EN",
        });
        setProductName(response.data.name);
      } catch (error) {
        console.error("Failed to load product name:", getApiErrorMessage(error));
      }
    };

    fetchProductName();
  }, [slug]);

  useEffect(() => {
    const fetchAvailablePeriod = async () => {
      try {
        const response = await apiService.get<ApiResponse<{ id: string; name: string }[]>>(
          `v1/product/${slug}/available-period`,
          { lang: "EN", currency: "IDR" },
        );

        const formattedPeriods: AvailablePeriod[] = (response.data ?? []).map((item) => ({
          label: item.name,
          value: item.id,
        }));

        setAvailablePeriods(formattedPeriods);
      } catch (error) {
        console.error("Failed to load available periods:", getApiErrorMessage(error));
      }
    };

    fetchAvailablePeriod();
  }, [slug]);

  useEffect(() => {
    if (!value || !slug) return;

    const fetchAvailableDates = async () => {
      try {
        const response = await apiService.get<ApiResponse<AvailableDate[]>>(
          `v1/product/${slug}/available-date`,
          { period: value, lang: "EN", currency: "IDR" },
        );

        setAvailableDates(response.data ?? []);
      } catch (error) {
        console.error("Failed to load available dates:", getApiErrorMessage(error));
      }
    };

    fetchAvailableDates();
  }, [slug, value]);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-left" size={27} color={theme.colors.white} />
          </TouchableOpacity>
          <Text style={styles.title}>{t("AvailableDateScreen.title")}</Text>
          <Text style={styles.subtitle}>{t("AvailableDateScreen.subtitle")}</Text>
        </View>
        <View style={styles.selectMonthContainer}>
          <Text style={styles.selectMonthText}>{t("AvailableDateScreen.selectMonth")}:</Text>
          <View style={{ flex: 1, zIndex: 1000 }}>
            <DropDownPicker
              open={open}
              value={value}
              items={availablePeriods}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setAvailablePeriods}
              placeholder={t("AvailableDateScreen.placeholderSelectMonth")}
              style={styles.selectMonthInput}
              dropDownContainerStyle={{ zIndex: 1000 }}
            />
          </View>
        </View>

        <ScrollView nestedScrollEnabled horizontal={false} showsVerticalScrollIndicator={false}>
          <View style={styles.availableDateContainer}>
            <View style={styles.availableDateHeader}>
              <View style={styles.headerCol}>
                <Text style={styles.availableDateHeaderText}>
                  {t("AvailableDateScreen.departure")}
                </Text>
              </View>
              <View style={styles.headerCol}>
                <Text style={styles.availableDateHeaderText}>
                  {t("AvailableDateScreen.return")}
                </Text>
              </View>
              <View style={styles.headerCol}>
                <Text style={styles.availableDateHeaderText}>{t("AvailableDateScreen.price")}</Text>
              </View>
            </View>
            {availableDates.map((availableDate, index) => (
              <View style={styles.availableDateList} key={availableDate.id}>
                <TouchableOpacity onPress={() => toggleExpand(index)}>
                  <View
                    style={
                      expandedIndex === index
                        ? styles.insideContainerActive
                        : styles.insideContainer
                    }
                  >
                    <View style={styles.headerCol}>
                      <View style={styles.availableDateTextWrapper}>
                        <Text style={styles.insideText}>{availableDate.date_start}</Text>
                        <Text style={styles.availableDateHeaderTextDay}>
                          {availableDate.date_start_iso}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.headerCol}>
                      <View style={styles.availableDateTextWrapper}>
                        <Text style={styles.insideText}>{availableDate.date_end}</Text>
                        <Text style={styles.availableDateHeaderTextDay}>
                          {availableDate.date_end_iso}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.headerCol}>
                      <Text style={styles.insideText}>{availableDate.price}</Text>
                    </View>
                    <View style={{ width: "19%" }}>
                      <FeatherIcon
                        name={expandedIndex === index ? "chevron-up" : "chevron-down"}
                        style={{ right: 13 }}
                        size={23}
                        color={theme.colors.black}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                {expandedIndex === index && (
                  <View style={styles.listExpandContainer}>
                    <View style={styles.listExpand}>
                      <View style={styles.listExpandLeftSide}>
                        <Text style={styles.listExpandText}>{productName ?? "..."}</Text>
                        <View style={styles.groupDate}>
                          <Text style={styles.groupDateText}>Start</Text>
                          <View style={styles.groupDateTextWrapper}>
                            <Text style={styles.groupDateTextDate}>{availableDate.date_start}</Text>
                            <Text style={styles.groupDateTextDay}>
                              {availableDate.date_start_iso}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.groupDate}>
                          <Text style={styles.groupDateText}>End</Text>
                          <View style={styles.groupDateTextWrapper}>
                            <Text style={styles.groupDateTextDate}>{availableDate.date_end}</Text>
                            <Text style={styles.groupDateTextDay}>
                              {availableDate.date_end_iso}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.listExpandRightSide}>
                        <View style={styles.groupPrice}>
                          <Text style={styles.groupPriceCaption}>Price Per Person</Text>
                          <Text style={styles.groupPriceText}>{availableDate.price}</Text>
                        </View>
                        <View style={styles.groupButtons}>
                          <TouchableOpacity style={styles.buttonEasyQuote}>
                            <Text style={styles.easyQuoteText}>Easy Quotes</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.buttonBookNow}
                            onPress={() =>
                              navigation.navigate("TripOverview", {
                                slug,
                                dateFrom: availableDate.date_start_iso,
                                dateTo: availableDate.date_end_iso,
                              })
                            }
                          >
                            <Text style={styles.bookNowText}>Book Now</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <Text style={styles.callUsText}>
                      Call us on +65 6438 2811 or speak to our travel agent
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
