import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import FeatherIcon from "react-native-vector-icons/Feather";
import { theme } from "@shared/constants/theme";
import styles from "./RecommendedSection.styles";

export interface Destination {
  id: string;
  name: string;
  image: string;
  location: string;
  price: number;
  slug: string;
  rating: number;
}

interface RecommendedSectionProps {
  destinations: Destination[];
  onOpenDestination: (slug: string) => void;
}

export function RecommendedSection({ destinations, onOpenDestination }: RecommendedSectionProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.recommendedSection}>
      <Text style={styles.recommendedTitle}>{t("HomeScreen.titleRecommendedDestination")}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.recommendedCardGroup}
      >
        {destinations.map((destination) => (
          <TouchableOpacity
            key={destination.id}
            style={styles.recommendedCard}
            onPress={() => onOpenDestination(destination.slug)}
          >
            <View style={styles.imageShadowWrapper}>
              <View style={styles.imageClip}>
                <Image source={{ uri: destination.image }} style={styles.recommendedCardImage} />
              </View>
            </View>
            <View style={styles.recommendedCardParent}>
              <Text style={styles.recommendedCardTitle}>{destination.name}</Text>
              <View style={styles.recommendedCardLocationParent}>
                <FeatherIcon name="map-pin" size={17} color={theme.colors.primary} />
                <Text style={styles.recommendedCardLocation}>{destination.location}</Text>
              </View>
              <View style={styles.recommendedCardBottomParent}>
                <Text style={styles.recommendedCardPrice}>{destination.price}</Text>
                <View style={styles.recommendedCardRatingParent}>
                  <Text style={styles.recommendedCardRating}>{destination.rating}</Text>
                  <FeatherIcon name="star" size={19} color={theme.colors.primary} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
