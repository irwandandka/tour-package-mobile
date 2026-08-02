import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";
import apiService from "../../services/apiService";
import SkeletonBox from "../../components/SkeletonBox";
import styles from "./HomeScreen.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/param";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "@features/auth/store/authStore";
import * as Location from "expo-location";
import type { LocationObject } from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { UserLogin, SearchGlobalResponse } from "../../types/api";
import { CommonActions } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const screenWidth = Dimensions.get("window").width;

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const { t } = useTranslation();

  const [token, setToken] = useState<string | null>(null);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [activeButton, setActiveButton] = useState<number | null>(null);

  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-screenWidth * 0.8)).current;

  const { isAuthorized, user, logout } = useAuthStore();

  type Region = {
    id: string;
    name: string;
  };
  const [regions, setRegion] = useState<Region[]>([]);

  type TopDestination = {
    id: string;
    name: string;
    image: string;
  };
  const [topDestinations, setTopDestination] = useState<TopDestination[]>([]);

  type Destination = {
    id: string;
    name: string;
    image: string;
    location: string;
    price: number;
    slug: string;
    rating: number;
  };
  const [destinations, setDestination] = useState<Destination[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [userLogin, setUserLogin] = useState<UserLogin | null>(null);

  const handleOpenDestination = (slug: string) => {
    navigation.navigate("Product", { slug });
  };

  const handleLogout = async () => {
    try {
      await logout();

      Toast.show({
        type: "success",
        text1: "Logout Successful",
        text2: "See you next time!",
      });

      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Home" }],
          }),
        );
      }, 1000);
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

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          if (isActive) setLocationName("Permission Denied");
          return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        if (isActive) setLocation(loc);

        let reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });

        if (isActive && reverseGeocode.length > 0) {
          const { city, region, country } = reverseGeocode[0];
          setLocationName(`${city ?? region}, ${country}`);
        }

        try {
          const storedToken = await SecureStore.getItemAsync("token");
          if (storedToken && isActive) {
            setToken(storedToken);
          }
        } catch (error) {
          console.error("Gagal mengambil token:", error);
        }

        try {
          const [regionsData, topDest, destinationsData] = await Promise.all([
            apiService.get("v1/region/list"),
            apiService.get("v1/product/explore-now", {
              params: { lang: "EN" },
            }),
            apiService.get("v1/product/popular-destination", {
              params: { lang: "EN", currency: "IDR" },
            }),
          ]);

          if (isActive) {
            setTopDestination(topDest.data);
            setRegion(regionsData.data);
            setDestination(destinationsData.data);
          }
        } catch (err) {
          if (isActive) setError("Failed to fetch data");
        } finally {
          if (isActive) {
            setTimeout(() => {
              setLoading(false);
            }, 1500);
          }
        }

        const userinfo = await AsyncStorage.getItem("user");
        if (isActive) {
          setUserLogin(userinfo ? JSON.parse(userinfo) : null);
        }

        const lang = await AsyncStorage.getItem("lang");
        if (!lang && isActive) {
          await AsyncStorage.setItem("lang", "en");
        }
      })();

      return () => {
        isActive = false;
      };
    }, []),
  );

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchGlobalResponse[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  useEffect(() => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setLoadingSearch(true);
      try {
        const response = await apiService.get("v1/search", {
          params: { query: query },
        });
        setSearchResults(response.data);
      } catch (error: any) {
        if (error.response) {
          console.error("Response error:", error.response.data);
          console.error("Status:", error.response.status);
          console.error("Headers:", error.response.headers);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Request setup error:", error.message);
        }
      } finally {
        setLoadingSearch(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handlePressItem = (item: SearchGlobalResponse) => {
    navigation.navigate("Product", { slug: item.slug });
  };

  const handleSelected = async (index: number) => {
    setActiveButton(index);
    setLoading(true);

    const selectedRegion = regions[index];

    try {
      const response = await apiService.get("v1/product/explore-now", {
        params: {
          lang: "EN",
          region: selectedRegion.id,
        },
      });

      setTopDestination(response.data);
    } catch (error) {
      console.error("Failed to fetch destinations:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  const handleMenuPress = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleMenuClose = () => {
    Animated.timing(slideAnim, {
      toValue: -screenWidth * 0.8,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setMenuVisible(false));
  };

  const [location, setLocation] = useState<LocationObject | null>(null);
  const [locationName, setLocationName] = useState("Loading...");

  return (
    <SafeAreaView style={styles.container}>
      {/* Menu Popup */}
      {menuVisible && (
        <Animated.View
          style={[
            styles.menuContainer,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <FeatherIcon
            name="x"
            style={styles.menuBarClose}
            size={30}
            color={"black"}
            onPress={handleMenuClose}
          />
          {userLogin && (
            <View style={styles.menuProfileParent}>
              <Image
                source={{
                  uri: userLogin?.profile_picture_url,
                }}
                style={styles.menuBarAvatar}
              />
              <Text style={styles.menuUserName}>{userLogin?.username}</Text>
              <Text style={styles.menuUserEmail}>{userLogin?.email}</Text>
            </View>
          )}

          {userLogin && <View style={styles.menuDivider} />}

          <View style={styles.menuParent}>
            {userLogin ? (
              <View style={styles.menuItemParent}>
                <TouchableOpacity style={styles.menuItem}>
                  <FeatherIcon name="home" size={24} color={"black"} />
                  <Text style={styles.menuText}>{t("HomeScreen.navbar.home")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleMenuClose();
                    navigation.navigate("Profile", { userId: userLogin?.id });
                  }}
                  style={styles.menuItem}
                >
                  <FeatherIcon name="user" size={24} color={"black"} />
                  <Text style={styles.menuText}>{t("HomeScreen.navbar.profile")}</Text>
                </TouchableOpacity>

                <View style={styles.menuDivider} />

                <TouchableOpacity style={styles.menuItem}>
                  <FeatherIcon name="bell" size={24} color={"black"} />
                  <Text style={styles.menuText}>{t("HomeScreen.navbar.notification")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    handleMenuClose();
                    navigation.navigate("Language");
                  }}
                >
                  <FeatherIcon name="globe" size={24} color={"black"} />
                  <Text style={styles.menuText}>{t("HomeScreen.navbar.language")}</Text>
                </TouchableOpacity>

                <View style={styles.menuDivider} />

                <TouchableOpacity style={styles.menuItem}>
                  <FeatherIcon name="heart" size={24} color={"black"} />
                  <Text style={styles.menuText}>{t("HomeScreen.navbar.favorite")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => navigation.navigate("OrderHistory")}
                >
                  <FeatherIcon name="shopping-cart" size={24} color={"black"} />
                  <Text style={styles.menuText}>{t("HomeScreen.navbar.orderHistory")}</Text>
                </TouchableOpacity>

                <View style={styles.menuDivider} />

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => navigation.navigate("TermCondition")}
                >
                  <FeatherIcon name="file-text" size={24} color={"black"} />
                  <Text style={styles.menuText}>{t("HomeScreen.navbar.termCondition")}</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.menuItem}>
                  <FeatherIcon name="message-circle" size={24} color={"black"} />
                  <Text style={styles.menuText}>{t("HomeScreen.navbar.feedback")}</Text>
                </TouchableOpacity> */}
              </View>
            ) : (
              <View style={styles.menuItemParent}>
                <TouchableOpacity style={styles.menuItem}>
                  <FeatherIcon name="home" size={24} color={"black"} />
                  <Text style={styles.menuText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    handleMenuClose();
                    navigation.navigate("Auth", { screen: "Login" });
                  }}
                >
                  <FeatherIcon name="log-in" size={24} color={"black"} />
                  <Text style={styles.menuText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    handleMenuClose();
                    navigation.navigate("Auth", { screen: "Register" });
                  }}
                >
                  <FeatherIcon name="user-plus" size={24} color={"black"} />
                  <Text style={styles.menuText}>Register</Text>
                </TouchableOpacity>
              </View>
            )}

            {userLogin && (
              <View style={styles.menuItemParent}>
                <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                  <FeatherIcon name="log-out" size={24} color={"red"} />
                  <Text style={[styles.menuText, { color: "red" }]}>
                    {t("HomeScreen.navbar.logout")}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Animated.View>
      )}

      <ScrollView
        horizontal={false}
        contentContainerStyle={{ paddingBottom: 0 }}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Bar Section */}
        <View style={styles.topBarSection}>
          {/* Menu Bar */}
          <TouchableOpacity onPress={handleMenuPress}>
            <FeatherIcon name="menu" size={27} color="#000" />
          </TouchableOpacity>

          {/* Location */}
          <View style={styles.locationSection}>
            <FeatherIcon name="map-pin" size={23} color="#FF8000" />
            <Text>{locationName}</Text>
          </View>

          {/* Profile */}
          {userLogin ? (
            <View style={styles.avatarSectionWrapper}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Profile", { userId: userLogin?.id })}
                style={styles.avatarSection}
              >
                <Image source={{ uri: userLogin.profile_picture_url }} style={styles.avatar} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate("Auth", { screen: "Login" })}>
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          {userLogin ? (
            <Text style={styles.welcomeTitle}>
              {t("HomeScreen.greet")} {userLogin.username}
            </Text>
          ) : (
            <Text style={styles.welcomeTitle}>Hi! are you ready to explore?</Text>
          )}
          <Text style={styles.welcomeSubtitle}>{t("HomeScreen.subtitle")}</Text>
        </View>

        {/* Search Section */}
        <View>
          {/* Search bar */}
          <View style={styles.searchSection}>
            <View style={styles.searchInput}>
              <FeatherIcon name="search" size={20} color="#888" style={styles.searchIcon} />
              <TextInput
                style={styles.textInput}
                placeholder={t("HomeScreen.placeHolderSearch")}
                onChangeText={setQuery}
                placeholderTextColor="#aaa"
                autoCapitalize="none"
                keyboardType="default"
              />
            </View>
            <FeatherIcon name="filter" size={20} color="#444" style={styles.filterIcon} />
          </View>

          {/* Loading */}
          {loadingSearch && (
            <ActivityIndicator size="small" color="#FF8000" style={{ marginTop: 10 }} />
          )}

          {/* Search results */}
          {searchResults.length > 0 && (
            <View style={styles.resultsContainer}>
              {searchResults.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.resultItem}
                  onPress={() => handlePressItem(item)}
                >
                  <Text style={styles.resultText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Top Destination Section */}
        <View style={styles.topDestinationSection}>
          <Text style={styles.topDestinationTitle}>{t("HomeScreen.titleTopDestination")}</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.topDestinationButtonGroup}
          >
            {regions.map((region, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.topDestinationButton,
                  activeButton === index && styles.topDestinationButtonSelected,
                ]}
                onPress={() => handleSelected(index)}
              >
                <Text
                  style={[
                    styles.topDestinationButtonText,
                    activeButton === index && styles.topDestinationButtonTextSelected,
                  ]}
                >
                  {region.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {loading ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.topDestinationCardGroup}
            >
              {[...Array(3)].map((_, index) => (
                <SkeletonBox
                  key={index}
                  width={180}
                  height={220}
                  borderRadius={15}
                  marginRight={5}
                />
              ))}
            </ScrollView>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.topDestinationCardGroup}
            >
              {topDestinations.map((destination, index) => (
                <TouchableOpacity key={index} style={styles.topDestinationCard} onPress={() => {}}>
                  <Image
                    source={{ uri: destination.image }}
                    style={styles.topDestinationCardImage}
                  />
                  <View style={styles.topDestinationCardOverlay} />
                  <Text style={styles.topDestinationCardTitle}>{destination.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Destination Section */}
        <View style={styles.recommendedSection}>
          <Text style={styles.recommendedTitle}>{t("HomeScreen.titleRecommendedDestination")}</Text>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendedCardGroup}
          >
            {destinations.map((destination, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recommendedCard}
                onPress={() => handleOpenDestination(destination.slug)}
              >
                <View style={styles.imageShadowWrapper}>
                  <View style={styles.imageClip}>
                    <Image
                      source={{ uri: destination.image }}
                      style={styles.recommendedCardImage}
                    />
                  </View>
                </View>
                <View style={styles.recommendedCardParent}>
                  <Text style={styles.recommendedCardTitle}>{destination.name}</Text>
                  <View style={styles.recommendedCardLocationParent}>
                    <FeatherIcon name="map-pin" size={17} color="#FF8000" />
                    <Text style={styles.recommendedCardLocation}>{destination.location}</Text>
                  </View>
                  <View style={styles.recommendedCardBottomParent}>
                    <Text style={styles.recommendedCardPrice}>{destination.price}</Text>
                    <View style={styles.recommendedCardRatingParent}>
                      <Text style={styles.recommendedCardRating}>{destination.rating}</Text>
                      <FeatherIcon name="star" size={19} color="#FF8000" />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
