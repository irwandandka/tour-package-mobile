import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";
import styles from "./ProductScreen.styles";
import { RootStackParamList } from "../../types/param";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import apiService from "../../services/apiService";
import PanelSection from "./sections/PanelSection";
import { Itinerary, ProductDetail, Review } from "../../types/api";
import GeneralSection from "./sections/GeneralSection";
import ItinerarySection from "./sections/ItinerarySection";
import ReviewSection from "./sections/ReviewSection";


type ProductScreenProps = NativeStackScreenProps<RootStackParamList, "Product">;

export default function ProductScreen({ navigation, route }: ProductScreenProps) {

  const { slug } = route.params;

  // State for active panel
  const [activePanel, setActivePanel] = useState("general");
  
  // State for read more/less description
  const maxLength = 200;
  const [isReadMore, setIsReadMore] = useState(false);

  const descriptionReadMore = () => {
    setIsReadMore((prev) => !prev);
  }

  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);

  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  const [selectedItineraryForMap, setSelectedItineraryForMap] = useState<Itinerary | null>(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const productDetail = await apiService.get(`v1/product/${slug}`, {
          params: {
            lang: 'EN',
            currency: 'SGD',
          }
        });

        setProductDetail(productDetail.data);
        setItineraries(productDetail.data.itineraries);
        setReviews(productDetail.data.reviews);
      } catch(error) {
        console.error("Error Fetching");
      }
    }

    fetchProductDetail();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: productDetail?.image || "https://via.placeholder.com/150",
            }}
            style={styles.image}
          />

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <FeatherIcon name="chevron-left" size={27} color={"#FFFFFF"} />
          </TouchableOpacity>
        </View>

        {/* Title & Location */}
        <View style={styles.container}>
          <Text style={styles.title}>
            {productDetail?.name || "Product Name Not Available"}
          </Text>
          <View style={styles.locationParent}>
            <View style={styles.locationParent}>
              <FeatherIcon name="map-pin" size={17} color="#FF8000" />
              <Text style={styles.locationTitle}>
                {productDetail?.location || "Not Available"}
              </Text>
            </View>
          </View>

          {/* Panel Section */}
          <PanelSection
            activePanel={activePanel}
            setActivePanel={setActivePanel}
          />

          {/* Section Generalsss */}
          {activePanel === 'general' && (
            <GeneralSection
              productDetail={productDetail}
              isReadMore={isReadMore}
              maxLength={maxLength}
              navigation={navigation}
              descriptionReadMore={descriptionReadMore}
            />
          )}

          {/* Section Itineraries */}
          {activePanel === "itineraries" && (
            <ItinerarySection
              itineraries={itineraries}
              selectedItineraryForMap={selectedItineraryForMap}
              setSelectedItineraryForMap={setSelectedItineraryForMap}
            />
          )}

          {/* Section Reviews */}
          {activePanel === "reviews" && (
            <ReviewSection
              reviews={reviews}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
