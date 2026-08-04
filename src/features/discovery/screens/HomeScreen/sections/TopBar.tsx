import { Image, Text, TouchableOpacity, View } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation/types";
import { theme } from "@shared/constants/theme";
import { UserLogin } from "@shared/types";
import styles from "./TopBar.styles";

interface TopBarProps {
  locationName: string;
  user: UserLogin | null;
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
  onMenuPress: () => void;
}

export function TopBar({ locationName, user, navigation, onMenuPress }: TopBarProps) {
  return (
    <View style={styles.topBarSection}>
      <TouchableOpacity onPress={onMenuPress}>
        <FeatherIcon name="menu" size={27} color={theme.colors.black} />
      </TouchableOpacity>

      <View style={styles.locationSection}>
        <FeatherIcon name="map-pin" size={23} color={theme.colors.primary} />
        <Text>{locationName}</Text>
      </View>

      {user ? (
        <View style={styles.avatarSectionWrapper}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile", { userId: user.id })}
            style={styles.avatarSection}
          >
            <Image source={{ uri: user.profile_picture_url }} style={styles.avatar} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate("Auth", { screen: "Login" })}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
