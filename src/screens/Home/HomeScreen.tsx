import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";
import apiService from "../../services/apiService";
import SkeletonBox from "../../components/SkeletonBox";
import styles from "./HomeScreen.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/param";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../contexts/AuthContext";

const screenWidth = Dimensions.get("window").width;

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [activeButton, setActiveButton] = useState<number | null>(null);

  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-screenWidth * 0.8)).current;

  const { isAuthorized, user, logout } = useAuth();

  type Region = {
    id: string;
    name: string;
  }
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
  }
  const [destinations, setDestination] = useState<Destination[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleOpenDestination = (slug: string) => {
    navigation.navigate("Product", { slug });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [regionsData, topDest, destinationsData] = await Promise.all([
          apiService.get("v1/region/list"),
          apiService.get("v1/product/explore-now", {
            params: {
              lang: "EN",//
            }
          }),
          apiService.get("v1/product/popular-destination", {
            params: {
              lang: 'EN',
              currency: 'SGD'
            },
          }),
        ]);

        setTopDestination(topDest.data);
        setRegion(regionsData.data);
        setDestination(destinationsData.data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500); // delay 1.5 detik
      }
    };

    fetchData();
  }, []);

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
      }, 1500); // delay 1.5 detik
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

  const handleProfilePress = () => {
    console.log("Profile button pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Menu Popup */}
      {menuVisible && (
        <Animated.View style={[
          styles.menuContainer,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}>
          <FeatherIcon
            name="x"
            style={styles.menuBarClose}
            size={30}
            color={"black"}
            onPress={handleMenuClose}
          />
          <View style={styles.menuProfileParent}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1467010234262-77bada75a47d?q=80&w=3373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              style={styles.menuBarAvatar}
            />
            <Text style={styles.menuUserName}>Irwanda Andika Putra</Text>
            <Text style={styles.menuUserEmail}>irwndandka@gmail.com</Text>
          </View>

          <View style={styles.menuDivider} />

          <View style={styles.menuParent}>
            <View style={styles.menuItemParent}>
              <TouchableOpacity style={styles.menuItem}>
                <FeatherIcon name="home" size={24} color={"black"} />
                <Text style={styles.menuText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <FeatherIcon name="bookmark" size={24} color={"black"} />
                <Text style={styles.menuText}>Bookmarks</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <FeatherIcon name="settings" size={24} color={"black"} />
                <Text style={styles.menuText}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <FeatherIcon name="shopping-cart" size={24} color={"black"} />
                <Text style={styles.menuText}>Order History</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <FeatherIcon name="user" size={24} color={"black"} />
                <Text style={styles.menuText}>Profile</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.menuItemParent}>
              <TouchableOpacity style={styles.menuItem}>
                <FeatherIcon name="log-out" size={24} color={"black"} />
                <Text style={styles.menuText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}

      <ScrollView
        horizontal={false} // Membuat scroll vertikal
        contentContainerStyle={{ paddingBottom: 0 }}
        showsVerticalScrollIndicator={false} // Menyembunyikan scrollbar vertikal
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
            <Text>Batam, Indonesia</Text>
          </View>

          {/* Profile */}
          {isAuthorized ? (
            <View style={styles.avatarSectionWrapper}>
              <TouchableOpacity
                onPress={handleProfilePress}
                style={styles.avatarSection}
              >
                <Image
                  source={{ uri: "https://i.pravatar.cc/150?img=3" }} // contoh avatar
                  style={styles.avatar}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate("Auth")}>
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Hi Irwanda,</Text>
          <Text style={styles.welcomeSubtitle}>Where do you wanna go?</Text>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchInput}>
            <FeatherIcon name="search" size={23} color="#7B7575" />
            <Text style={styles.searchText}>Search destination...</Text>
          </View>
          <FeatherIcon name="filter" size={23} color="#7B7575" />
        </View>

        {/* Top Destination Section */}
        <View style={styles.topDestinationSection}>
          <Text style={styles.topDestinationTitle}>Top Destination</Text>
          <ScrollView
            horizontal={true} // Membuat scroll horizontal
            showsHorizontalScrollIndicator={false} // Menyembunyikan scrollbar horizontal
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
                    activeButton === index &&
                      styles.topDestinationButtonTextSelected,
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
                <TouchableOpacity
                  key={index}
                  style={styles.topDestinationCard}
                  onPress={() => {}}
                >
                  <Image
                    source={{ uri: destination.image }}
                    style={styles.topDestinationCardImage}
                  />
                  <View style={styles.topDestinationCardOverlay} />
                  <Text style={styles.topDestinationCardTitle}>
                    {destination.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Destination Section */}
        <View style={styles.recommendedSection}>
          <Text style={styles.recommendedTitle}>Recommended Destination</Text>

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
                <Image
                  source={{ uri: destination.image }}
                  style={styles.recommendedCardImage}
                />
                <View style={styles.recommendedCardParent}>
                  <Text style={styles.recommendedCardTitle}>
                    {destination.name}
                  </Text>
                  <View style={styles.recommendedCardLocationParent}>
                    <FeatherIcon name="map-pin" size={17} color="#FF8000" />
                    <Text style={styles.recommendedCardLocation}>
                      {destination.location}
                    </Text>
                  </View>
                  <View style={styles.recommendedCardBottomParent}>
                    <Text style={styles.recommendedCardPrice}>
                      {destination.price}
                    </Text>
                    <View style={styles.recommendedCardRatingParent}>
                      <Text style={styles.recommendedCardRating}>
                        {destination.rating}
                      </Text>
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
