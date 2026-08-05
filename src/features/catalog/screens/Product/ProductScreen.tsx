import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import FeatherIcon from "react-native-vector-icons/Feather";
import styles from "./ProductScreen.styles";
import { RootStackParamList } from "@navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { apiService, ApiResponse } from "@shared/api";
import { getApiErrorMessage } from "@shared/utils";
import { theme } from "@shared/constants/theme";
import { Itinerary, ProductDetail, Review } from "@shared/types";
import PanelSection from "./sections/PanelSection";
import GeneralSection from "./sections/GeneralSection";
import ItinerarySection from "./sections/ItinerarySection";
import ReviewSection from "./sections/ReviewSection";

type ProductScreenProps = NativeStackScreenProps<RootStackParamList, "Product">;
type PanelKey = "general" | "itineraries" | "reviews";

export default function ProductScreen({ navigation, route }: ProductScreenProps) {
  const { t } = useTranslation();
  const { slug } = route.params;

  const [activePanel, setActivePanel] = useState<PanelKey>("general");

  const maxLength = 200;
  const [isReadMore, setIsReadMore] = useState(false);

  const descriptionReadMore = () => {
    setIsReadMore((prev) => !prev);
  };

  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedItineraryForMap, setSelectedItineraryForMap] = useState<Itinerary | null>(null);
  const [activeDay, setActiveDay] = useState<number>(1);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await apiService.get<ApiResponse<ProductDetail>>(`v1/product/${slug}`, {
          lang: "EN",
          currency: "IDR",
        });

        setProductDetail(response.data);
        setItineraries(response.data.itineraries);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Failed to load product detail:", getApiErrorMessage(error));
      }
    };

    fetchProductDetail();
  }, [slug]);

  return (
    <SafeAreaView>
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: productDetail?.image || "https://via.placeholder.com/150",
            }}
            style={styles.image}
          />

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-left" size={27} color={theme.colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>{productDetail?.name || "Product Name Not Available"}</Text>
          <View style={styles.locationParent}>
            <View style={styles.locationParent}>
              <FeatherIcon name="map-pin" size={17} color={theme.colors.primary} />
              <Text style={styles.locationTitle}>{productDetail?.location || "Not Available"}</Text>
            </View>
          </View>

          <PanelSection activePanel={activePanel} setActivePanel={setActivePanel} />

          {activePanel === "general" && (
            <GeneralSection
              productDetail={productDetail}
              isReadMore={isReadMore}
              maxLength={maxLength}
              descriptionReadMore={descriptionReadMore}
            />
          )}

          {activePanel === "itineraries" && (
            <ItinerarySection
              itineraries={itineraries}
              selectedItineraryForMap={selectedItineraryForMap}
              setSelectedItineraryForMap={setSelectedItineraryForMap}
              activeDay={activeDay}
              setActiveDay={setActiveDay}
            />
          )}

          {activePanel === "reviews" && <ReviewSection reviews={reviews} />}
        </View>
      </ScrollView>

      <View style={styles.floatingBar}>
        <View>
          <Text style={styles.priceLabel}>{t("ProductPage.price")}</Text>
          <Text style={styles.priceText}>{productDetail?.price}</Text>
        </View>
        <TouchableOpacity
          style={styles.bookNowButton}
          onPress={() => navigation.navigate("AvailableDate", { slug: productDetail?.slug || "" })}
        >
          <Text style={styles.bookNowButtonText}>{t("ProductPage.button")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
