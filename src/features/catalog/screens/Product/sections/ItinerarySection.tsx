import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import FeatherIcon from "react-native-vector-icons/Feather";
import IonIcon from "react-native-vector-icons/Ionicons";
import MapView, { Marker } from "react-native-maps";
import { theme } from "@shared/constants/theme";
import { Itinerary } from "@shared/types";
import styles from "../ProductScreen.styles";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface ItinerarySectionProps {
  itineraries: Itinerary[];
  selectedItineraryForMap: Itinerary | null;
  setSelectedItineraryForMap: (itinerary: Itinerary | null) => void;
  activeDay: number;
  setActiveDay: (day: number) => void;
}

export default function ItinerarySection({
  itineraries,
  selectedItineraryForMap,
  setSelectedItineraryForMap,
  activeDay,
  setActiveDay,
}: ItinerarySectionProps) {
  const { t } = useTranslation();

  const toggleItinerary = (day: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveDay(activeDay === day ? 0 : day);
  };

  return (
    <View>
      <View style={styles.itineraryContainer}>
        {itineraries.map((itinerary) => {
          const isOpen = activeDay === itinerary.day;
          return (
            <View key={itinerary.id} style={styles.itineraryCard}>
              <TouchableOpacity
                style={styles.itineraryHeader}
                onPress={() => toggleItinerary(itinerary.day)}
              >
                <Text style={styles.itineraryDayTitle}>
                  {t("ProductPage.day")} {itinerary.day}
                </Text>
                <FeatherIcon
                  name={isOpen ? "chevron-up" : "chevron-down"}
                  size={24}
                  color={theme.colors.grey700}
                />
              </TouchableOpacity>

              {isOpen && (
                <View style={styles.itineraryContentWrapper}>
                  <View style={styles.timeline}>
                    <IonIcon
                      name="radio-button-on"
                      size={20}
                      color={theme.colors.secondary}
                      style={styles.timelineDot}
                    />
                    <View style={styles.timelineLine} />
                  </View>
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineTitle}>{itinerary.title}</Text>
                    <Text style={styles.timelineDescription}>{itinerary.description}</Text>
                    <View style={styles.timelineFooter}>
                      <Text style={styles.timelineTime}>{itinerary.schedule_time}</Text>
                      {/* <TouchableOpacity
                        onPress={() => setSelectedItineraryForMap(itinerary)}
                      >
                        <Text style={styles.showMapText}>{t("ProductPage.showOnMap")}</Text>
                      </TouchableOpacity> */}
                    </View>
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </View>

      {selectedItineraryForMap && (
        <Modal visible transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.mapContainer}>
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: parseFloat(selectedItineraryForMap.latitude),
                  longitude: parseFloat(selectedItineraryForMap.longitude),
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: parseFloat(selectedItineraryForMap.latitude),
                    longitude: parseFloat(selectedItineraryForMap.longitude),
                  }}
                />
              </MapView>
              <TouchableOpacity
                onPress={() => setSelectedItineraryForMap(null)}
                style={styles.closeButton}
              >
                <Text style={{ color: theme.colors.white }}>{t("ProductPage.closeMap")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
