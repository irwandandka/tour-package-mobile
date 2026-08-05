import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as ImagePicker from "expo-image-picker";

import styles from "./ProfileScreen.styles";

import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation/types";

import { apiService, ApiResponse } from "@shared/api";
import { getApiErrorMessage } from "@shared/utils";
import { theme } from "@shared/constants/theme";
import { TextField, CountryCityPicker } from "@shared/components";
import { useCountryCity } from "@shared/hooks";
import { UserProfile, UserProfileRequest } from "@shared/types";
import { profileSchema, ProfileFormValues } from "../../schemas/profile.schema";

import Toast from "react-native-toast-message";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from "react-native-dropdown-picker";

import IonIcon from "react-native-vector-icons/Ionicons";

type ProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, "Profile">;
type ProfileRouteProp = RouteProp<RootStackParamList, "Profile">;

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

function formatDate(dateString: string) {
  if (!dateString) return "Select a date";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileNavigationProp>();
  const route = useRoute<ProfileRouteProp>();
  const { t } = useTranslation();
  const { userId } = route.params;

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isOpenGender, setIsOpenGender] = useState(false);
  const [genderItems, setGenderItems] = useState(genderOptions);

  const countryCity = useCountryCity();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
      address: "",
      birth_date: "",
      gender: "",
    },
  });

  const birthDate = watch("birth_date");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await apiService.get<ApiResponse<UserProfile>>("v1/user/profile", {
          lang: "EN",
        });
        const profile = response.data;
        setUserProfile(profile);

        reset({
          name: profile.name,
          username: profile.username,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
          birth_date: profile.birth_date,
          gender: profile.gender,
        });

        if (profile.country) countryCity.selectCountry(profile.country);
        if (profile.city) countryCity.selectCity(profile.city);
      } catch (error) {
        console.error("Failed to load user profile:", getApiErrorMessage(error));
      }
    };

    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, reset]);

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Toast.show({
        type: "error",
        text1: "Permission denied",
        text2: "You declined access to the photo library.",
      });
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (pickerResult.canceled) return;

    const image = pickerResult.assets[0];
    setUserProfile((prev) => (prev ? { ...prev, profile_picture_url: image.uri } : null));

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", {
      uri: image.uri,
      name: image.fileName || `photo-${Date.now()}.jpg`,
      type: image.mimeType,
    } as unknown as Blob);

    try {
      const response = await apiService.post<ApiResponse<{ url: string }>>(
        "v1/user/upload-profile-picture",
        formData,
      );
      setUserProfile((prev) => (prev ? { ...prev, profile_picture_url: response.data.url } : null));
      Toast.show({ type: "success", text1: "Success", text2: "Profile picture updated." });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: getApiErrorMessage(error, "Failed to upload image."),
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      const body: UserProfileRequest = {
        ...values,
        address: values.address ?? "",
        birth_date: values.birth_date ?? "",
        gender: values.gender ?? "",
        country: countryCity.selectedCountry,
        city: countryCity.selectedCity,
      };

      const response = await apiService.post<ApiResponse<UserProfile>>(
        "v1/user/save-profile",
        body,
      );
      setUserProfile(response.data);

      Toast.show({ type: "success", text1: "Success", text2: "Profile saved successfully." });
    } catch (error) {
      Toast.show({ type: "error", text1: "Error", text2: getApiErrorMessage(error) });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.groupHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <IonIcon name="arrow-back" size={24} color={theme.colors.black} />
            </TouchableOpacity>

            <Text style={styles.title}>{t("ProfileScreen.title")}</Text>

            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit(onSubmit)}>
              <IonIcon name="checkmark" size={24} color={theme.colors.success} />
            </TouchableOpacity>
          </View>

          <View style={styles.groupProfile}>
            <TouchableOpacity
              style={styles.groupImage}
              onPress={handlePickImage}
              disabled={isUploading}
            >
              <Image
                source={{ uri: userProfile?.profile_picture_url }}
                style={styles.imageProfile}
              />

              {isUploading && (
                <View style={styles.uploadingOverlay}>
                  <ActivityIndicator size="large" color={theme.colors.white} />
                </View>
              )}

              <View style={[styles.wrapperIcon, styles.iconAddPhoto]}>
                <IonIcon name="camera" size={18} color={theme.colors.grey700} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.groupInformation}>
            <Text style={styles.titleInformation}>{t("ProfileScreen.information")}</Text>

            <TextField
              control={control}
              name="name"
              label={t("ProfileScreen.fullName")}
              placeholder="Full Name"
              errorMessage={errors.name?.message}
            />

            <TextField
              control={control}
              name="username"
              label={t("ProfileScreen.username")}
              placeholder="Username"
              errorMessage={errors.username?.message}
            />

            <TextField
              control={control}
              name="email"
              label={t("ProfileScreen.email")}
              placeholder="johndoe@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              errorMessage={errors.email?.message && t(errors.email.message)}
            />

            <View>
              <Text style={styles.inputLabel}>{t("ProfileScreen.birthDate")}</Text>
              <TouchableOpacity
                style={styles.inputField}
                onPress={() => setDatePickerVisibility(true)}
              >
                <Text style={{ color: birthDate ? theme.colors.black : theme.colors.grey500 }}>
                  {formatDate(birthDate ?? "")}
                </Text>
                <IonIcon name="calendar-outline" size={20} color={theme.colors.grey600} />
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                date={birthDate ? new Date(birthDate) : new Date()}
                onConfirm={(date) => {
                  setValue("birth_date", date.toISOString().split("T")[0]);
                  setDatePickerVisibility(false);
                }}
                onCancel={() => setDatePickerVisibility(false)}
              />
            </View>

            <TextField
              control={control}
              name="phone"
              label={t("ProfileScreen.phone")}
              placeholder="+1 (555) 123-4567"
              keyboardType="phone-pad"
              errorMessage={errors.phone?.message}
            />

            <View>
              <Text style={styles.inputLabel}>Gender</Text>
              <Controller
                control={control}
                name="gender"
                render={({ field: { onChange, value } }) => (
                  <DropDownPicker
                    open={isOpenGender}
                    value={value ?? null}
                    items={genderItems}
                    setOpen={setIsOpenGender}
                    setValue={(callback) => onChange(callback(value))}
                    setItems={setGenderItems}
                    placeholder="Select Gender"
                    style={styles.inputField}
                    listMode="SCROLLVIEW"
                  />
                )}
              />
            </View>

            <TextField
              control={control}
              name="address"
              label={t("ProfileScreen.address")}
              placeholder="123 Main St, City, Country"
              errorMessage={errors.address?.message}
            />

            <CountryCityPicker
              label={t("ProfileScreen.country")}
              placeholder="Select a country"
              value={countryCity.selectedCountry}
              items={countryCity.countries}
              isOpen={countryCity.isCountryPickerOpen}
              isLoading={countryCity.isLoadingCountries}
              onOpen={countryCity.openCountryPicker}
              onSelect={countryCity.selectCountry}
            />

            <CountryCityPicker
              label={t("ProfileScreen.city")}
              placeholder="Select a city"
              value={countryCity.selectedCity}
              items={countryCity.cities}
              isOpen={countryCity.isCityPickerOpen}
              isLoading={countryCity.isLoadingCities}
              disabled={!countryCity.selectedCountry}
              onOpen={countryCity.openCityPicker}
              onSelect={countryCity.selectCity}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
