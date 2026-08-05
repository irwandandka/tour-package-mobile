import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import DropDownPicker from "react-native-dropdown-picker";

import styles from "./PassengerDetailScreen.styles";

import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation/types";

import FeatherIcon from "react-native-vector-icons/Feather";
import IonIcon from "react-native-vector-icons/Ionicons";

import Toast from "react-native-toast-message";

import { apiService, ApiResponse } from "@shared/api";
import { getApiErrorMessage } from "@shared/utils";
import { theme } from "@shared/constants/theme";
import { TextField, CountryCityPicker } from "@shared/components";
import { useCountryCity } from "@shared/hooks";
import { ProductDetail, Transaction } from "@shared/types";
import { generatePassengers } from "../../utils/passengerGenerator";
import { passengerDetailSchema, PassengerDetailFormValues } from "../../schemas/passenger.schema";

type PassengerDetailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PassengerDetail"
>;
type PassengerDetailRouteProp = RouteProp<RootStackParamList, "PassengerDetail">;

const titleOptions = [
  { label: "Mr", value: "Mr" },
  { label: "Mrs", value: "Mrs" },
];

export default function PassengerDetailScreen() {
  const navigation = useNavigation<PassengerDetailNavigationProp>();
  const route = useRoute<PassengerDetailRouteProp>();
  const { t } = useTranslation();

  const { slug, transactionId } = route.params;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openTitleIndex, setOpenTitleIndex] = useState<number | null>(null);
  const [titleItems, setTitleItems] = useState(titleOptions);

  const [product, setProduct] = useState<ProductDetail | null>(null);

  const countryCity = useCountryCity();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PassengerDetailFormValues>({
    resolver: zodResolver(passengerDetailSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      address: "",
      postalCode: "",
      passengers: [],
    },
  });

  const { fields } = useFieldArray({ control, name: "passengers" });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiService.get<ApiResponse<ProductDetail>>(`v1/product/${slug}`, {
          lang: "EN",
          currency: "IDR",
        });
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product details:", getApiErrorMessage(error));
      }
    };

    const fetchTransaction = async () => {
      try {
        const response = await apiService.get<ApiResponse<Transaction>>(
          `v1/booking/${transactionId}`,
          { lang: "EN", currency: "IDR" },
        );

        const generated = generatePassengers(response.data.transaction_details);
        reset({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
          address: "",
          postalCode: "",
          passengers: generated,
        });
      } catch (error) {
        console.error("Failed to fetch transaction:", getApiErrorMessage(error));
      }
    };

    fetchProduct();
    fetchTransaction();
  }, [slug, transactionId, reset]);

  const onSubmit = async (values: PassengerDetailFormValues) => {
    if (!countryCity.selectedCountry || !countryCity.selectedCity) {
      Toast.show({
        type: "error",
        text1: "Missing information",
        text2: "Please select a country and city.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const body = {
        name: values.firstName,
        phone: values.phoneNumber,
        email: values.email,
        country: countryCity.selectedCountry.id,
        city: countryCity.selectedCity.id,
        address: values.address,
        postal_code: values.postalCode,
        passengers: values.passengers,
      };

      await apiService.post(`v1/booking/${transactionId}/update`, body);

      Toast.show({
        type: "success",
        text1: "Passenger Details Saved",
        text2: "Your passenger details have been successfully saved.",
      });

      navigation.navigate("PaymentMethod", { transactionId });
    } catch (error) {
      Toast.show({ type: "error", text1: "Save failed", text2: getApiErrorMessage(error) });
    } finally {
      setIsSubmitting(false);
    }
  };

  const distinctRooms = [...new Set(fields.map((field) => field.roomName))];

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerSection}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <FeatherIcon name="chevron-left" size={27} color={theme.colors.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{t("PassengerDetailScreen.title")}</Text>
            <View style={styles.card}>
              <View style={styles.cardTopSide}>
                <Image source={{ uri: product?.image }} style={styles.cardImage} />
              </View>
              <View style={styles.cardBottomSide}>
                <View style={styles.cardTitleWrapper}>
                  <Text style={styles.cardTitle}>{product?.name}</Text>
                  <View style={styles.cardRatingWrapper}>
                    {[...Array(4)].map((_, i) => (
                      <IonIcon
                        key={i}
                        name="star"
                        style={styles.cardStarIcon}
                        size={21}
                        color={theme.colors.primary}
                      />
                    ))}
                    <IonIcon
                      name="star-half"
                      style={styles.cardStarIcon}
                      size={21}
                      color={theme.colors.primary}
                    />
                    <Text style={styles.cardStarRating}>{product?.rating}</Text>
                  </View>
                  <Text style={styles.textNights}>{product?.duration}</Text>
                </View>
              </View>
            </View>
          </View>

          <Text style={styles.contactInformationTitle}>
            {t("PassengerDetailScreen.contactPerson")}
          </Text>
          <View style={styles.contactInformationCard}>
            <TextField
              control={control}
              name="firstName"
              label={t("PassengerDetailScreen.firstName")}
              placeholder="Enter your first name"
              errorMessage={errors.firstName?.message}
            />
            <TextField
              control={control}
              name="lastName"
              label={t("PassengerDetailScreen.lastName")}
              placeholder="Enter your last name"
              errorMessage={errors.lastName?.message}
            />

            <Text style={styles.groupLabel}>{t("PassengerDetailScreen.contactDetail")}</Text>

            <TextField
              control={control}
              name="phoneNumber"
              label={t("PassengerDetailScreen.phoneNumber")}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              errorMessage={errors.phoneNumber?.message}
            />
            <TextField
              control={control}
              name="email"
              label={t("PassengerDetailScreen.emailAddress")}
              placeholder="example@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              errorMessage={errors.email?.message && t(errors.email.message)}
            />

            <Text style={styles.groupLabel}>{t("PassengerDetailScreen.personalDetail")}</Text>

            <CountryCityPicker
              label={t("PassengerDetailScreen.country")}
              placeholder="Select a country"
              value={countryCity.selectedCountry}
              items={countryCity.countries}
              isOpen={countryCity.isCountryPickerOpen}
              isLoading={countryCity.isLoadingCountries}
              onOpen={countryCity.openCountryPicker}
              onSelect={countryCity.selectCountry}
            />

            <CountryCityPicker
              label={t("PassengerDetailScreen.city")}
              placeholder="Select a city"
              value={countryCity.selectedCity}
              items={countryCity.cities}
              isOpen={countryCity.isCityPickerOpen}
              isLoading={countryCity.isLoadingCities}
              disabled={!countryCity.selectedCountry}
              onOpen={countryCity.openCityPicker}
              onSelect={countryCity.selectCity}
            />

            <TextField
              control={control}
              name="address"
              label={t("PassengerDetailScreen.address")}
              placeholder="Enter your address"
              errorMessage={errors.address?.message}
            />
            <TextField
              control={control}
              name="postalCode"
              label={t("PassengerDetailScreen.postalCode")}
              placeholder="Enter your postal code"
              errorMessage={errors.postalCode?.message}
            />
          </View>

          <View style={styles.groupParentPassenger}>
            {distinctRooms.map((room) => (
              <View key={room} style={{ marginBottom: 30 }}>
                <Text style={styles.roomDetailName}>{room}</Text>

                {fields
                  .map((field, index) => ({ field, index }))
                  .filter(({ field }) => field.roomName === room)
                  .map(({ field, index }, displayIndex) => (
                    <View key={field.id} style={{ marginBottom: 10 }}>
                      <Text style={styles.passengerTitleCount}>
                        {t("PassengerDetailScreen.passenger")} {displayIndex + 1} ({field.type})
                      </Text>
                      <View style={styles.groupInputPassenger}>
                        <View style={styles.contactInformationWrapper}>
                          <Text style={styles.inputLabel}>Title</Text>
                          <Controller
                            control={control}
                            name={`passengers.${index}.title`}
                            render={({ field: { onChange, value } }) => (
                              <DropDownPicker
                                open={openTitleIndex === index}
                                value={value}
                                items={titleItems}
                                setOpen={() =>
                                  setOpenTitleIndex(openTitleIndex === index ? null : index)
                                }
                                setValue={(callback) => onChange(callback(value))}
                                setItems={setTitleItems}
                                placeholder="Select Title"
                                style={styles.inputText}
                                listMode="SCROLLVIEW"
                                dropDownContainerStyle={{ borderColor: theme.colors.grey300 }}
                                zIndex={3000}
                                zIndexInverse={1000}
                              />
                            )}
                          />
                          {errors.passengers?.[index]?.title && (
                            <Text style={styles.fieldError}>
                              {errors.passengers[index]?.title?.message}
                            </Text>
                          )}
                        </View>

                        <TextField
                          control={control}
                          name={`passengers.${index}.first_name`}
                          label="First Name"
                          placeholder="Enter your first name"
                          errorMessage={errors.passengers?.[index]?.first_name?.message}
                        />

                        <TextField
                          control={control}
                          name={`passengers.${index}.last_name`}
                          label="Last Name"
                          placeholder="Enter your last name"
                          errorMessage={errors.passengers?.[index]?.last_name?.message}
                        />
                      </View>
                    </View>
                  ))}
              </View>
            ))}
          </View>

          <View>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              style={isSubmitting ? styles.disabledButton : styles.continueButton}
            >
              <Text style={isSubmitting ? styles.disabledButtonText : styles.continueButtonText}>
                {t("PassengerDetailScreen.proceedButton")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
