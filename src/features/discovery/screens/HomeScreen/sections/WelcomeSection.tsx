import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { UserLogin } from "@shared/types";
import styles from "./WelcomeSection.styles";

interface WelcomeSectionProps {
  user: UserLogin | null;
}

export function WelcomeSection({ user }: WelcomeSectionProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.welcomeSection}>
      {user ? (
        <Text style={styles.welcomeTitle}>
          {t("HomeScreen.greet")} {user.username}
        </Text>
      ) : (
        <Text style={styles.welcomeTitle}>Hi! are you ready to explore?</Text>
      )}
      <Text style={styles.welcomeSubtitle}>{t("HomeScreen.subtitle")}</Text>
    </View>
  );
}
