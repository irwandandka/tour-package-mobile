import { Animated, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useTranslation } from "react-i18next";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation/types";
import { theme } from "@shared/constants/theme";
import { UserLogin } from "@shared/types";
import styles from "./SideMenu.styles";

interface SideMenuProps {
  visible: boolean;
  slideAnim: Animated.Value;
  user: UserLogin | null;
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
  onClose: () => void;
  onLogout: () => void;
}

export function SideMenu({
  visible,
  slideAnim,
  user,
  navigation,
  onClose,
  onLogout,
}: SideMenuProps) {
  const { t } = useTranslation();

  if (!visible) return null;

  return (
    <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
      <FeatherIcon
        name="x"
        style={styles.menuBarClose}
        size={30}
        color={theme.colors.black}
        onPress={onClose}
      />
      {user && (
        <View style={styles.menuProfileParent}>
          <Image source={{ uri: user.profile_picture_url }} style={styles.menuBarAvatar} />
          <Text style={styles.menuUserName}>{user.username}</Text>
          <Text style={styles.menuUserEmail}>{user.email}</Text>
        </View>
      )}

      {user && <View style={styles.menuDivider} />}

      <View style={styles.menuParent}>
        {user ? (
          <View style={styles.menuItemParent}>
            <TouchableOpacity style={styles.menuItem}>
              <FeatherIcon name="home" size={24} color={theme.colors.black} />
              <Text style={styles.menuText}>{t("HomeScreen.navbar.home")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onClose();
                navigation.navigate("Profile", { userId: user.id });
              }}
              style={styles.menuItem}
            >
              <FeatherIcon name="user" size={24} color={theme.colors.black} />
              <Text style={styles.menuText}>{t("HomeScreen.navbar.profile")}</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity style={styles.menuItem}>
              <FeatherIcon name="bell" size={24} color={theme.colors.black} />
              <Text style={styles.menuText}>{t("HomeScreen.navbar.notification")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                navigation.navigate("Language");
              }}
            >
              <FeatherIcon name="globe" size={24} color={theme.colors.black} />
              <Text style={styles.menuText}>{t("HomeScreen.navbar.language")}</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity style={styles.menuItem}>
              <FeatherIcon name="heart" size={24} color={theme.colors.black} />
              <Text style={styles.menuText}>{t("HomeScreen.navbar.favorite")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate("OrderHistory")}
            >
              <FeatherIcon name="shopping-cart" size={24} color={theme.colors.black} />
              <Text style={styles.menuText}>{t("HomeScreen.navbar.orderHistory")}</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate("TermCondition")}
            >
              <FeatherIcon name="file-text" size={24} color={theme.colors.black} />
              <Text style={styles.menuText}>{t("HomeScreen.navbar.termCondition")}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.menuItemParent}>
            <TouchableOpacity style={styles.menuItem}>
              <FeatherIcon name="home" size={24} color={theme.colors.black} />
              <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                navigation.navigate("Auth", { screen: "Login" });
              }}
            >
              <FeatherIcon name="log-in" size={24} color={theme.colors.black} />
              <Text style={styles.menuText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                navigation.navigate("Auth", { screen: "Register" });
              }}
            >
              <FeatherIcon name="user-plus" size={24} color={theme.colors.black} />
              <Text style={styles.menuText}>Register</Text>
            </TouchableOpacity>
          </View>
        )}

        {user && (
          <View style={styles.menuItemParent}>
            <TouchableOpacity style={styles.menuItem} onPress={onLogout}>
              <FeatherIcon name="log-out" size={24} color={theme.colors.error} />
              <Text style={[styles.menuText, { color: theme.colors.error }]}>
                {t("HomeScreen.navbar.logout")}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Animated.View>
  );
}
