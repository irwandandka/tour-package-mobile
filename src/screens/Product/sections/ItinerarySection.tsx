import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import IonIcon from "react-native-vector-icons/Ionicons";
import MapView, { Marker } from "react-native-maps";
import { Itinerary } from "../../../types/api";
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
                <Text style={styles.itineraryDayTitle}>Day {itinerary.day}</Text>
                <FeatherIcon
                  name={isOpen ? "chevron-up" : "chevron-down"}
                  size={24}
                  color={"#333333"}
                />
              </TouchableOpacity>

              {isOpen && (
                <View style={styles.itineraryContentWrapper}>
                  <View style={styles.timeline}>
                    <IonIcon
                      name="radio-button-on"
                      size={20}
                      color={"#3A5694"}
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
                        <Text style={styles.showMapText}>Show on Map</Text>
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
        <Modal visible={true} transparent animationType="slide">
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
                <Text style={{ color: "white" }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
