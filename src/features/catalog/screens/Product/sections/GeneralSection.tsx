import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import IonIcon from "react-native-vector-icons/Ionicons";
import { ProductDetail } from "@shared/types";
import styles from "../ProductScreen.styles";

interface GeneralSectionProps {
  productDetail: ProductDetail | null;
  isReadMore: boolean;
  maxLength: number;
  descriptionReadMore: () => void;
}

export default function GeneralSection({
  productDetail,
  isReadMore,
  maxLength,
  descriptionReadMore,
}: GeneralSectionProps) {
  const { t } = useTranslation();
  const fullDescription = productDetail?.description ?? "";

  const shortDescription =
    fullDescription.length > maxLength
      ? fullDescription.substring(0, maxLength).trim() + "..."
      : fullDescription;

  return (
    <View style={styles.generalSection}>
      <View style={styles.ratingDurationContainer}>
        <View style={styles.generalSubSection}>
          <View style={styles.generalSubSectionIcon}>
            <IonIcon name="star" color="#FBBC04" size={27} />
            <Text style={styles.generalSubSectionText}>{productDetail?.rating}</Text>
          </View>
          <Text style={styles.generalSectionText}>{t("ProductPage.rating")}</Text>
        </View>

        <View style={styles.generalSubSectionDuration}>
          <View style={styles.generalSubSectionIcon}>
            <IonIcon name="time" color="#FBBC04" size={27} />
            <Text style={styles.generalDurationText}>{productDetail?.duration}</Text>
          </View>
          <Text style={styles.generalSectionText}>{t("ProductPage.duration")}</Text>
        </View>
      </View>

      <View style={styles.generalDescriptionSection}>
        <Text style={styles.generalDescriptionTitle}>{t("ProductPage.description")}</Text>
        <Text style={styles.generalDescriptionText}>
          {isReadMore ? fullDescription : shortDescription}
        </Text>
        {fullDescription.length > maxLength && (
          <TouchableOpacity onPress={descriptionReadMore}>
            <Text style={styles.generalDescriptionReadMore}>
              {isReadMore ? t("ProductPage.readLess") : t("ProductPage.readMore")}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
