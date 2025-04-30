import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";
import IonIcon from "react-native-vector-icons/Ionicons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function HomeScreen({ navigation }: any) {
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(screenWidth)).current;

  const [isAuthorized, setIsAuthorized] = useState(false);

  const buttons = [
    "All",
    "South East Asia",
    "Asia",
    "Middle East",
    "Europe",
    "North America",
  ];

  const handleSelected = (index: number) => {
    setActiveButton(index);
  };

  const topDestinations = [
    {
      id: 1,
      title: "Hokkaido",
      image:
        "https://plus.unsplash.com/premium_photo-1661882926003-91a51e3dfe64?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Busan",
      image:
        "https://images.unsplash.com/photo-1591520284162-8e64eceebacf?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "Beijing",
      image:
        "https://images.unsplash.com/photo-1516545595035-b494dd0161e4?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      title: "Tokyo",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=3588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const products = [
    {
      id: 1,
      title: "2D1N Bangkok Tour",
      image:
        "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=3450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      location: "Bangkok, Thailand",
      price: 285,
      rating: 4.5,
      currencySymbol: "$",
    },
    {
      id: 2,
      title: "4D3N Chill in Bali",
      image:
        "https://plus.unsplash.com/premium_photo-1677829177642-30def98b0963?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      location: "Bali, Indonesia",
      price: 350,
      rating: 4.2,
      currencySymbol: "$",
    },
  ];

  const handleMenuPress = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: screenWidth * 0.2,
      duration: 300,
      useNativeDriver: false,
    });
  };

  const handleMenuClose = () => {
    Animated.timing(slideAnim, {
      toValue: screenWidth,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setMenuVisible(false));
  };

  const handleProfilePress = () => {
    console.log("Profile button pressed");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Menu Popup */}
      {menuVisible && (
        <View style={styles.menuContainer}>
          <FeatherIcon
            name="x"
            style={styles.menuBarClose}
            size={30}
            color={"black"}
            onPress={handleMenuClose}
          />
          <View style={styles.menuProfileParent}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1467010234262-77bada75a47d?q=80&w=3373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              style={styles.menuBarAvatar}
            />
            <Text style={styles.menuUserName}>Irwanda Andika Putra</Text>
            <Text style={styles.menuUserEmail}>irwndandka@gmail.com</Text>
          </View>

          <View style={styles.menuDivider} />

          <View style={styles.menuParent}>
            <View style={styles.menuItemParent}>
              <TouchableOpacity style={styles.menuItem}>
                <FeatherIcon name="home" size={24} color={"black"} />
                <Text style={styles.menuText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <FeatherIcon name="bookmark" size={24} color={"black"} />
                <Text style={styles.menuText}>Bookmarks</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <FeatherIcon name="settings" size={24} color={"black"} />
                <Text style={styles.menuText}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <FeatherIcon name="shopping-cart" size={24} color={"black"} />
                <Text style={styles.menuText}>Order History</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <FeatherIcon name="user" size={24} color={"black"} />
                <Text style={styles.menuText}>Profile</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.menuItemParent}>
              <TouchableOpacity style={styles.menuItem}>
                <FeatherIcon name="log-out" size={24} color={"black"} />
                <Text style={styles.menuText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {/* {(
        <View
          style={styles.popup}>
            
        </View>
      )} */}

      <ScrollView
        horizontal={false} // Membuat scroll vertikal
        contentContainerStyle={{ paddingBottom: 0 }}
        showsVerticalScrollIndicator={false} // Menyembunyikan scrollbar vertikal
      >
        {/* Top Bar Section */}
        <View style={styles.topBarSection}>
          {/* Menu Bar */}
          <TouchableOpacity onPress={handleMenuPress}>
            <FeatherIcon name="menu" size={27} color="#000" />
          </TouchableOpacity>

          {/* Location */}
          <View style={styles.locationSection}>
            <FeatherIcon name="map-pin" size={23} color="#FF8000" />
            <Text>Batam, Indonesia</Text>
          </View>

          {/* Profile */}
          {isAuthorized ? (
            <View style={styles.avatarSectionWrapper}>
              <TouchableOpacity
                onPress={handleProfilePress}
                style={styles.avatarSection}
              >
                <Image
                  source={{ uri: "https://i.pravatar.cc/150?img=3" }} // contoh avatar
                  style={styles.avatar}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
                onPress={() => navigation.navigate("Auth")}>
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Hi Irwanda,</Text>
          <Text style={styles.welcomeSubtitle}>Where do you wanna go?</Text>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchInput}>
            <FeatherIcon name="search" size={23} color="#7B7575" />
            <Text style={styles.searchText}>Search destination...</Text>
          </View>
          <FeatherIcon name="filter" size={23} color="#7B7575" />
        </View>

        {/* Top Destination Section */}
        <View style={styles.topDestinationSection}>
          <Text style={styles.topDestinationTitle}>Top Destination</Text>
          <ScrollView
            horizontal={true} // Membuat scroll horizontal
            showsHorizontalScrollIndicator={false} // Menyembunyikan scrollbar horizontal
            contentContainerStyle={styles.topDestinationButtonGroup}
          >
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.topDestinationButton,
                  activeButton === index && styles.topDestinationButtonSelected,
                ]}
                onPress={() => handleSelected(index)}
              >
                <Text
                  style={[
                    styles.topDestinationButtonText,
                    activeButton === index &&
                      styles.topDestinationButtonTextSelected,
                  ]}
                >
                  {button}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView
            horizontal={true} // Membuat scroll horizontal
            showsHorizontalScrollIndicator={false} // Menyembunyikan scrollbar horizontal
            contentContainerStyle={styles.topDestinationCardGroup} // Kontainer untuk kartu
          >
            {topDestinations.map((destination, index) => (
              <TouchableOpacity
                key={index}
                style={styles.topDestinationCard}
                onPress={() => navigation.navigate("Detail")}
              >
                <Image
                  source={{ uri: destination.image }}
                  style={styles.topDestinationCardImage}
                />
                {/* Dark Overlay */}
                <View style={styles.topDestinationCardOverlay}></View>
                <Text style={styles.topDestinationCardTitle}>
                  {destination.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Destination Section */}
        <View style={styles.recommendedSection}>
          <Text style={styles.recommendedTitle}>Recommended Destination</Text>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendedCardGroup}
          >
            {products.map((product, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recommendedCard}
                onPress={() => navigation.navigate("Product")}
              >
                <Image
                  source={{ uri: product.image }}
                  style={styles.recommendedCardImage}
                />
                <View style={styles.recommendedCardParent}>
                  <Text style={styles.recommendedCardTitle}>
                    {product.title}
                  </Text>
                  <View style={styles.recommendedCardLocationParent}>
                    <FeatherIcon name="map-pin" size={17} color="#FF8000" />
                    <Text style={styles.recommendedCardLocation}>
                      {product.location}
                    </Text>
                  </View>
                  <View style={styles.recommendedCardBottomParent}>
                    <Text style={styles.recommendedCardPrice}>
                      {product.currencySymbol}
                      {product.price}
                    </Text>
                    <View style={styles.recommendedCardRatingParent}>
                      <Text style={styles.recommendedCardRating}>
                        {product.rating}
                      </Text>
                      <FeatherIcon name="star" size={19} color="#FF8000" />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "flex-start",
  },
  menuContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: screenWidth * 0.8,
    backgroundColor: "#fff",
    padding: 20,
    elevation: 5,
    zIndex: 999,
    height: screenHeight,
  },
  menuBarClose: {
    left: 280,
    top: 40,
  },
  menuProfileParent: {
    flexDirection: "column",
    gap: 5,
    marginTop: 40,
    marginBottom: 20,
  },
  menuBarAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 3,
  },
  menuUserName: {
    fontSize: 17,
    fontWeight: "bold",
  },
  menuUserEmail: {
    fontSize: 15,
    color: "#636060",
    fontWeight: "semibold",
  },
  menuDivider: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  menuParent: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: screenHeight * 0.7,
  },
  menuItemParent: {
    flexDirection: "column",
    gap: 33,
    marginTop: 23,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 19,
  },
  menuText: {
    fontSize: 20,
    fontWeight: "semibold",
  },
  loginButtonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FF8000",
  },
  topBarSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  locationText: {
    fontSize: 21,
    color: "#636060",
    fontWeight: "semibold",
  },
  avatarSectionWrapper: {
    // Tempatkan shadow di sini untuk memastikan bayangan terlihat
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  avatarSection: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 28,
  },
  welcomeSection: {
    flexDirection: "column",
    marginTop: 20,
    gap: 0,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "semibold",
    color: "#636060",
  },
  welcomeSubtitle: {
    fontSize: 27,
    fontWeight: "bold",
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "lightgrey",
    opacity: 0.7,
    paddingVertical: 17,
    paddingHorizontal: 21,
    borderRadius: 15,
  },
  searchInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 21,
  },
  searchText: {
    fontSize: 17,
    color: "#636060",
  },
  topDestinationSection: {
    marginTop: 30,
    flexDirection: "column",
    gap: 12,
  },
  topDestinationTitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: "black",
  },
  topDestinationButtonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 11,
  },
  topDestinationButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 13,
    paddingHorizontal: 19,
  },
  topDestinationButtonText: {
    fontSize: 17,
    color: "black",
    fontWeight: "regular",
  },
  topDestinationButtonSelected: {
    backgroundColor: "#FF8000",
    borderRadius: 15,
    paddingVertical: 13,
    paddingHorizontal: 19,
  },
  topDestinationButtonTextSelected: {
    fontSize: 17,
    color: "#FFFFFF",
    fontWeight: "regular",
  },
  topDestinationCardGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 11,
  },
  topDestinationCard: {
    width: 180,
    height: 220,
    position: "relative",
  },
  topDestinationCardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  topDestinationCardTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#FFFFFF",
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
  },
  topDestinationCardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Dark overlay
    borderRadius: 15,
  },
  recommendedSection: {
    flexDirection: "column",
    marginTop: 30,
    gap: 3,
  },
  recommendedTitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: "black",
  },
  recommendedCardGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 11,
    marginTop: 10,
  },
  recommendedCard: {
    width: 270,
    height: 250,
    borderRadius: 15,
    padding: 14,
    backgroundColor: "#FFFFFF",
  },
  recommendedCardImage: {
    width: "100%",
    height: "60%",
    borderRadius: 15,
  },
  recommendedCardParent: {
    marginTop: 10,
    flexDirection: "column",
    gap: 9,
  },
  recommendedCardTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#263C54",
  },
  recommendedCardLocationParent: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
  },
  recommendedCardLocation: {
    fontSize: 15,
    color: "black",
    fontWeight: "regular",
  },
  recommendedCardBottomParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recommendedCardPrice: {
    fontSize: 21,
    fontWeight: "semibold",
    color: "black",
  },
  recommendedCardRatingParent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  recommendedCardRating: {
    fontSize: 19,
    color: "black",
    fontWeight: "regular",
  },
});
