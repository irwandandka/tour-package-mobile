import React from "react";

import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";

export default function ProductScreen({ navigation }: any) {
  return (
    <SafeAreaView>
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        {/* Image Section */}
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=3450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          style={styles.image}
        />

        {/* Title & Location */}
        <View style={styles.container}>
          <Text style={styles.title}>2D1N Bangkok Tour</Text>
          <View style={styles.locationParent}>
            <View style={styles.locationParent}>
              <Icon name="map-pin" size={17} color="#FF8000" />
              <Text style={styles.locationTitle}>Bangkok, Thailand</Text>
            </View>
          </View>
        </View>

          {/* Panel Section */}
          <View
           >

          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 350,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  locationParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  locationTitle: {
    fontSize: 16,
    color: "#666",
  },
});
