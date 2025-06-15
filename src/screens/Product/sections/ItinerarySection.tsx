import React from "react";
import { View, ScrollView, Text, TouchableOpacity, Modal } from "react-native";
import styles from "../ProductScreen.styles";
import FeatherIcon from "react-native-vector-icons/Feather";
import IonIcon from "react-native-vector-icons/Ionicons";
import MapView, { Marker } from "react-native-maps";
import { Itinerary } from "../../../types/api";

interface ItinerarySectionProps {
  itineraries: Itinerary[];
  selectedItineraryForMap: Itinerary | null;
  setSelectedItineraryForMap: (itinerary: Itinerary | null) => void;
}

export default function ItinerarySection({
    itineraries,
    selectedItineraryForMap,
    setSelectedItineraryForMap,
}:
ItinerarySectionProps) {
  return (
    <View>
      {itineraries.map((itinerary) => (
        <View style={styles.itinerarySection} key={itinerary.id}>
          <TouchableOpacity style={styles.itineraryCardHeader}>
            <Text style={styles.itineraryCardTitle}>Day {itinerary.day}</Text>
            <FeatherIcon name="chevron-right" size={29} color={"#000000"} />
          </TouchableOpacity>
          <View style={styles.itineraryContentWrapper}>
            <View style={styles.itineraryContentPathSymbol}>
              <IonIcon name="radio-button-on" size={23} color={"#000000"} />
              <View style={styles.itineraryContentPathLine} />
            </View>
            <View style={styles.itineraryContentPathWrapper}>
              <Text style={styles.itineraryContentPathTitle}>
                {itinerary.title}
              </Text>
              <ScrollView
                horizontal={false}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.itineraryContentPathDescription}>
                  {itinerary.description}
                </Text>
              </ScrollView>
              <View style={styles.itineraryContentPathTimeAndMap}>
                <Text style={styles.itineraryContentPathTime}>
                  {itinerary.schedule_time}
                </Text>
                <TouchableOpacity onPress={() => setSelectedItineraryForMap(itinerary)}>
                  <Text style={styles.itineraryContentPathTextShowMap}>
                    Show on Map
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ))}

      {/* Modal hanya 1, berdasarkan itinerary yang dipilih */}
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
                <Text style={{ color: 'white' }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
