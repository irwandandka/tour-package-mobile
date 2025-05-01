import React from "react";
import { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";
import IonIcon from "react-native-vector-icons/Ionicons";
import styles from "./ProductScreen.styles";

export default function ProductScreen({ navigation }: any) {
  const [activePanel, setActivePanel] = useState("general");
  const [isReadMore, setIsReadMore] = useState(false);

  const maxLength = 200;

  const fullDescription = "Experience the charm of Bangkok in a short yet memorable trip. This 2-day, 1-night package is perfect for travelers who want to explore the highlights of Thailand’s vibrant capital in a compact itinerary full of culture, history, and fun!";
  const shortDescription = fullDescription.length > maxLength
    ? fullDescription.substring(0, maxLength).trim() + "..."
    : fullDescription;

  const descriptionReadMore = () => {
    setIsReadMore((prev) => !prev);
  }

  return (
    <SafeAreaView>
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://pub-cfc04ba1c45649688f85c3bdd738f319.r2.dev/bangkok-tour-1.png",
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
          <Text style={styles.title}>2D1N Bangkok Tours</Text>
          <View style={styles.locationParent}>
            <View style={styles.locationParent}>
              <FeatherIcon name="map-pin" size={17} color="#FF8000" />
              <Text style={styles.locationTitle}>Bangkok, Thailand</Text>
            </View>
          </View>

          {/* Panel Section */}
          <View style={styles.panelSection}>
            <TouchableOpacity onPress={() => setActivePanel("general")}>
              <Text
                style={[
                  styles.panelText,
                  activePanel === "general" && styles.panelTextActive,
                ]}
              >
                General
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActivePanel("itineraries")}>
              <Text
                style={[
                  styles.panelText,
                  activePanel === "itineraries" && styles.panelTextActive,
                ]}
              >
                Itineraries
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActivePanel("reviews")}>
              <Text
                style={[
                  styles.panelText,
                  activePanel === "reviews" && styles.panelTextActive,
                ]}
              >
                Reviews
              </Text>
            </TouchableOpacity>
          </View>

          {/* Section General */}
          {activePanel === "general" && (
            <View style={styles.generalSection}>
              <View style={styles.ratingDurationContainer}>
                {/* Rating */}
                <View style={styles.generalSubSection}>
                  <View style={styles.generalSubSectionIcon}>
                    <IonIcon name="star" color={"#FBBC04"} size={27} />
                    <Text style={styles.generalSubSectionText}>4.8</Text>
                  </View>
                  <Text style={styles.generalSectionText}>Rating</Text>
                </View>

                {/* Duration */}
                <View style={styles.generalSubSectionDuration}>
                  <View style={styles.generalSubSectionIcon}>
                    <IonIcon name="time" color={"#FBBC04"} size={27} />
                    <Text style={styles.generalDurationText}>
                      2 Days 1 Night
                    </Text>
                  </View>
                  <Text style={styles.generalSectionText}>Duration</Text>
                </View>
              </View>

              {/* Description */}
              <View style={styles.generalDescriptionSection}>
                <Text style={styles.generalDescriptionTitle}>Description</Text>
                <Text style={styles.generalDescriptionText}>
                  { isReadMore ? fullDescription : shortDescription }
                </Text>
                {fullDescription.length > maxLength && (
                  <TouchableOpacity
                    onPress={descriptionReadMore}>
                    <Text style={styles.generalDescriptionReadMore}>
                      { isReadMore ? "Read Less" : "Read More" }
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Button Book Now */}
              <TouchableOpacity style={styles.buttonBookNow}>
                <Text style={styles.buttonBookNowText}>
                  Book Now
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Section Itineraries */}

          {/* Section Reviews */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
