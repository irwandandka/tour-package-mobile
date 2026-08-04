import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { LoadingSkeleton } from "@shared/components";
import styles from "./TopDestinationSection.styles";

export interface Region {
  id: string;
  name: string;
}

export interface TopDestination {
  id: string;
  name: string;
  image: string;
}

interface TopDestinationSectionProps {
  regions: Region[];
  topDestinations: TopDestination[];
  activeIndex: number | null;
  isLoading: boolean;
  onSelectRegion: (index: number) => void;
}

export function TopDestinationSection({
  regions,
  topDestinations,
  activeIndex,
  isLoading,
  onSelectRegion,
}: TopDestinationSectionProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.topDestinationSection}>
      <Text style={styles.topDestinationTitle}>{t("HomeScreen.titleTopDestination")}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.topDestinationButtonGroup}
      >
        {regions.map((region, index) => (
          <TouchableOpacity
            key={region.id}
            style={[
              styles.topDestinationButton,
              activeIndex === index && styles.topDestinationButtonSelected,
            ]}
            onPress={() => onSelectRegion(index)}
          >
            <Text
              style={[
                styles.topDestinationButtonText,
                activeIndex === index && styles.topDestinationButtonTextSelected,
              ]}
            >
              {region.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {isLoading ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topDestinationCardGroup}
        >
          {[...Array(3)].map((_, index) => (
            <LoadingSkeleton
              key={index}
              width={180}
              height={220}
              borderRadius={15}
              style={{ marginRight: 5 }}
            />
          ))}
        </ScrollView>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topDestinationCardGroup}
        >
          {topDestinations.map((destination) => (
            <TouchableOpacity key={destination.id} style={styles.topDestinationCard}>
              <Image source={{ uri: destination.image }} style={styles.topDestinationCardImage} />
              <View style={styles.topDestinationCardOverlay} />
              <Text style={styles.topDestinationCardTitle}>{destination.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
