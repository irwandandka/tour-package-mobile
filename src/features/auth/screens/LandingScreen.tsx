import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@navigation/types";
import styles from "./LandingScreen.styles";

type LandingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Landing">;

export default function LandingScreen() {
  const navigation = useNavigation<LandingScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://pub-cfc04ba1c45649688f85c3bdd738f319.r2.dev/landing-screen-image.png",
          }}
          style={styles.image}
          contentFit="cover"
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Explore Unforgettable Journey With Us</Text>
        <Text style={styles.subtitle}>
          Discover the beauty of the world with our travel app. Find your next adventure and create
          unforgettable memories.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.buttonText}>Explore Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
