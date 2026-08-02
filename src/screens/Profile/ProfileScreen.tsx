import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as ImagePicker from "expo-image-picker";

import styles from "./ProfileScreen.styles";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/param";
import { RouteProp, useRoute } from "@react-navigation/native";

import { UserProfile, UserProfileRequest, City, Country } from "../../types/api";

import apiService from "../../services/apiService";

import Toast from "react-native-toast-message";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";

import IonIcon from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";

type ProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, "Profile">;

type ProfileRouteProp = RouteProp<RootStackParamList, "Profile">;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileNavigationProp>();

  const route = useRoute<ProfileRouteProp>();

  const { userId } = route.params;

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const [loading, setLoading] = useState(false);

  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState<UserProfileRequest>({
    name: "",
    email: "",
    username: "",
    address: "",
    phone: "",
    birth_date: "",
    gender: "",
    country: null,
    city: null,
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date: Date) => {
    setFormData((prev) => ({
      ...prev,
      birth_date: date.toISOString().split("T")[0],
    }));
    hideDatePicker();
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Pilih tanggal";
    const d = new Date(dateString);
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Anda menolak izin untuk mengakses galeri foto!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!pickerResult.canceled) {
      const image = pickerResult.assets[0];

      setUserProfile((prev) => (prev ? { ...prev, profile_picture_url: image.uri } : null));

      setIsUploading(true);
      const formData = new FormData();

      formData.append("image", {
        uri: image.uri,
        name: image.fileName || `photo-${Date.now()}.jpg`,
        type: image.mimeType,
      } as any);

      try {
        const response = await apiService.post("v1/user/upload-profile-picture", formData);

        setUserProfile((prev) =>
          prev ? { ...prev, profile_picture_url: response.data.url } : null,
        );
        Toast.show({ type: "success", text1: "Success", text2: "Profile picture updated." });
      } catch (error: any) {
        if (error.response) {
          console.error("Data:", error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
        Toast.show({ type: "error", text1: "Error", text2: "Failed to upload image." });
      } finally {
        setIsUploading(false);
      }
    }
  };

  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const res = await apiService.get("v1/country/list");
      setCountries(res.data);
    } catch (e) {
      console.error("Failed to load countries", e);
    }
    setLoading(false);
  };

  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const fetchCities = async (country: string) => {
    setLoading(true);
    try {
      const res = await apiService.get("v1/city/list", {
        params: {
          country: country,
        },
      });
      setCities(res.data);
    } catch (e) {
      console.error("Failed to load cities", e);
    }
    setLoading(false);
  };

  const handleOpenDropdown = async (type: string) => {
    if (type === "country") {
      await fetchCountries();

      setShowCountryDropdown(!showCountryDropdown);
      setShowCityDropdown(false);
    } else if (type === "city" && selectedCountry) {
      await fetchCities(selectedCountry.id);

      setShowCityDropdown(!showCityDropdown);
      setShowCountryDropdown(false);
    }
  };

  const [openGender, setOpenGender] = useState(false);
  const [gender, setGender] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ]);

  const handleSaveProfile = async () => {
    try {
      const response = await apiService.post(`v1/user/save-profile`, formData);

      setUserProfile(response.data);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Profile saved successfully.",
      });
    } catch (error: any) {
      if (error.response) {
        console.error("Data:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await apiService.get(`v1/user/profile`, {
          params: {
            lang: "EN",
          },
        });
        const profile = response.data;
        setUserProfile(profile);

        setFormData({
          name: profile.name,
          email: profile.email,
          username: profile.username,
          address: profile.address,
          phone: profile.phone,
          birth_date: profile.birth_date,
          gender: profile.gender,
          country: profile.country,
          city: profile.city,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  return (
    <SafeAreaView>
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.groupHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <IonIcon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>

            <Text style={styles.title}>Profile</Text>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
              <IonIcon name="checkmark" size={24} color="#42CE6D" />
            </TouchableOpacity>
          </View>

          <View style={styles.groupProfile}>
            <View style={styles.groupImage}>
              <Image
                source={{ uri: userProfile?.profile_picture_url }}
                style={styles.imageProfile}
              />

              {isUploading && (
                <View style={styles.uploadingOverlay}>
                  <ActivityIndicator size="large" color="#FFFFFF" />
                </View>
              )}
            </View>
          </View>

          <View style={styles.groupInformation}>
            <Text style={styles.titleInformation}>Your Information</Text>

            {/* Full Name */}
            <View>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Full Name"
                value={formData.name}
                onChangeText={(text) => setFormData((prev) => ({ ...prev, name: text }))}
              />
            </View>

            {/* Username */}
            <View>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Username"
                value={formData.username}
                onChangeText={(text) => setFormData((prev) => ({ ...prev, username: text }))}
              />
            </View>

            {/* Email */}
            <View>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.inputField}
                placeholder="johndoe@example.com"
                value={formData.email}
                onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))}
              />
            </View>

            {/* Date of Birth */}
            <View>
              <Text style={styles.inputLabel}>Birth Date</Text>

              <TouchableOpacity style={styles.inputField} onPress={showDatePicker}>
                <Text style={{ color: formData.birth_date ? "#000" : "#999" }}>
                  {formatDate(formData.birth_date)}
                </Text>
                <IonIcon name="calendar-outline" size={20} color="#666" />
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                date={formData.birth_date ? new Date(formData.birth_date) : new Date()}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>

            {/* Phone Number */}
            <View>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={styles.inputField}
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChangeText={(text) => setFormData((prev) => ({ ...prev, phone: text }))}
              />
            </View>

            {/* Gender */}
            <View>
              <Text style={styles.inputLabel}>Gender</Text>
              <DropDownPicker
                open={openGender}
                value={formData.gender}
                items={gender}
                setOpen={setOpenGender}
                setValue={(callback) =>
                  setFormData((prev) => ({
                    ...prev,
                    gender: callback(prev.gender),
                  }))
                }
                setItems={setGender}
                placeholder="Select Title"
                style={styles.inputField}
                listMode="SCROLLVIEW"
              />
            </View>

            {/* Address */}
            <View>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                style={styles.inputField}
                placeholder="123 Main St, City, Country"
                value={formData.address}
                onChangeText={(text) => setFormData((prev) => ({ ...prev, address: text }))}
              />
            </View>

            {/* Input Country */}
            <View>
              <Text style={styles.inputLabel}>Country</Text>
              <TouchableOpacity onPress={() => handleOpenDropdown("country")}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 5,
                    padding: 10,
                  }}
                >
                  <Text>{selectedCountry?.name || "Select a country"}</Text>
                </View>
              </TouchableOpacity>

              {loading && <ActivityIndicator size="small" color="gray" style={{ marginTop: 10 }} />}

              {showCountryDropdown && (
                <ScrollView
                  style={{
                    maxHeight: 200,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    marginTop: 5,
                    backgroundColor: "white",
                  }}
                >
                  {countries.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectedCountry(item);
                        setShowCountryDropdown(false);
                      }}
                      style={{
                        padding: 10,
                        borderBottomWidth: 1,
                        borderColor: "#eee",
                      }}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>

            {/* Input City */}
            <View>
              <Text style={styles.inputLabel}>City</Text>
              <TouchableOpacity onPress={() => handleOpenDropdown("city")}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 5,
                    padding: 10,
                  }}
                >
                  <Text>{selectedCity?.name || "Select a city"}</Text>
                </View>
              </TouchableOpacity>

              {loading && <ActivityIndicator size="small" color="gray" style={{ marginTop: 10 }} />}

              {showCityDropdown && (
                <ScrollView
                  style={{
                    maxHeight: 200,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    marginTop: 5,
                    backgroundColor: "white",
                  }}
                >
                  {cities.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectedCity(item);
                        setShowCityDropdown(false);
                      }}
                      style={{
                        padding: 10,
                        borderBottomWidth: 1,
                        borderColor: "#eee",
                      }}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
