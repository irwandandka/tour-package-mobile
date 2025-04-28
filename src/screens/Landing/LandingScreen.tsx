import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

export default function LandingScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/images/landing-screen-image.png")} // ubah dari .avif ke .jpg
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Text Section */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>
            Explore Unforgettable Journey With Us
        </Text>

        <Text style={styles.subtitle}>
            Discover the beauty of the world with our travel app. Find your next adventure and create unforgettable memories.
        </Text>
      </View>

        {/* Button Section */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
            <Text
                style={styles.buttonText}>
                Explore Now
            </Text>
        </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    alignItems: "center",
  },
  imageContainer: {
    width: width * 0.8,
    height: 400,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 43,
  },
  textContainer: {
    marginVertical: 42,
    marginHorizontal: 32,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 27,
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginTop: 8,
  },
  button: {
    marginTop: 20,
    paddingVertical: 19,
    paddingHorizontal: 50,
    borderRadius: 11,
    backgroundColor: "#3A5694",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 21,
    textAlign: "center",
  }
});
