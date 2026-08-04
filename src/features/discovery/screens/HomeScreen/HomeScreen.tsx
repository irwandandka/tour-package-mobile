import { useCallback, useRef, useState } from "react";
import { Animated, Dimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation/types";
import { CommonActions, useFocusEffect, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { apiService, ApiResponse } from "@shared/api";
import { getApiErrorMessage } from "@shared/utils";
import { SearchGlobalResponse } from "@shared/types";
import { useAuthStore } from "@features/auth/store/authStore";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useLiveSearch } from "../../hooks/useLiveSearch";
import { SideMenu } from "./sections/SideMenu";
import { TopBar } from "./sections/TopBar";
import { WelcomeSection } from "./sections/WelcomeSection";
import { SearchSection } from "./sections/SearchSection";
import { TopDestinationSection, Region, TopDestination } from "./sections/TopDestinationSection";
import { RecommendedSection, Destination } from "./sections/RecommendedSection";
import styles from "./HomeScreen.styles";

const screenWidth = Dimensions.get("window").width;

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user, logout } = useAuthStore();
  const { locationName } = useGeolocation();
  const { query, setQuery, results: searchResults, isSearching } = useLiveSearch();

  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-screenWidth * 0.8)).current;

  const [activeRegionIndex, setActiveRegionIndex] = useState<number | null>(null);
  const [regions, setRegions] = useState<Region[]>([]);
  const [topDestinations, setTopDestinations] = useState<TopDestination[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      (async () => {
        try {
          const [regionsData, topDest, destinationsData] = await Promise.all([
            apiService.get<ApiResponse<Region[]>>("v1/region/list"),
            apiService.get<ApiResponse<TopDestination[]>>("v1/product/explore-now", { lang: "EN" }),
            apiService.get<ApiResponse<Destination[]>>("v1/product/popular-destination", {
              lang: "EN",
              currency: "IDR",
            }),
          ]);

          if (isActive) {
            setTopDestinations(topDest.data);
            setRegions(regionsData.data);
            setDestinations(destinationsData.data);
          }
        } catch (error) {
          if (isActive) {
            Toast.show({
              type: "error",
              text1: "Failed to load",
              text2: getApiErrorMessage(error),
            });
          }
        } finally {
          if (isActive) setLoading(false);
        }
      })();

      return () => {
        isActive = false;
      };
    }, []),
  );

  const handleOpenDestination = (slug: string) => {
    navigation.navigate("Product", { slug });
  };

  const handleLogout = async () => {
    try {
      await logout();

      Toast.show({ type: "success", text1: "Logout Successful", text2: "See you next time!" });

      setTimeout(() => {
        navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Home" }] }));
      }, 1000);
    } catch (error) {
      Toast.show({ type: "error", text1: "Logout failed", text2: getApiErrorMessage(error) });
    }
  };

  const handleSelectResult = (item: SearchGlobalResponse) => {
    navigation.navigate("Product", { slug: item.slug });
  };

  const handleSelectRegion = async (index: number) => {
    setActiveRegionIndex(index);
    setLoading(true);

    const selectedRegion = regions[index];

    try {
      const response = await apiService.get<ApiResponse<TopDestination[]>>(
        "v1/product/explore-now",
        {
          lang: "EN",
          region: selectedRegion.id,
        },
      );
      setTopDestinations(response.data);
    } catch (error) {
      Toast.show({ type: "error", text1: "Failed to load", text2: getApiErrorMessage(error) });
    } finally {
      setLoading(false);
    }
  };

  const handleMenuPress = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: false }).start();
  };

  const handleMenuClose = () => {
    Animated.timing(slideAnim, {
      toValue: -screenWidth * 0.8,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setMenuVisible(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <SideMenu
        visible={menuVisible}
        slideAnim={slideAnim}
        user={user}
        navigation={navigation}
        onClose={handleMenuClose}
        onLogout={handleLogout}
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 0 }}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <TopBar
          locationName={locationName}
          user={user}
          navigation={navigation}
          onMenuPress={handleMenuPress}
        />

        <WelcomeSection user={user} />

        <SearchSection
          query={query}
          onQueryChange={setQuery}
          results={searchResults}
          isSearching={isSearching}
          onSelectResult={handleSelectResult}
        />

        <TopDestinationSection
          regions={regions}
          topDestinations={topDestinations}
          activeIndex={activeRegionIndex}
          isLoading={loading}
          onSelectRegion={handleSelectRegion}
        />

        <RecommendedSection destinations={destinations} onOpenDestination={handleOpenDestination} />
      </ScrollView>
    </SafeAreaView>
  );
}
