import { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import IonIcon from "react-native-vector-icons/Ionicons";
import styles from "./ReviewModal.styles";
import { apiService } from "@shared/api";
import { getApiErrorMessage } from "@shared/utils";
import { theme } from "@shared/constants/theme";

interface ReviewModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  orderId: string;
}

/**
 * Was 100% hardcoded Indonesian text with zero i18n infrastructure — full
 * net-new translation keys added to all 7 locale files for this component
 * (unlike most other screens in this refactor, where existing-but-unwired
 * keys were used instead of inventing new content).
 */
export function ReviewModal({ visible, onClose, onSubmit, orderId }: ReviewModalProps) {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert(t("ReviewModal.ratingRequiredTitle"), t("ReviewModal.ratingRequiredMessage"));
      return;
    }

    setIsSubmitting(true);
    try {
      await apiService.post(`v1/booking/${orderId}/submit-review`, { rating, comment });
      onSubmit();
    } catch (error) {
      Alert.alert(
        t("ReviewModal.submitErrorTitle"),
        getApiErrorMessage(error, t("ReviewModal.submitErrorMessage")),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{t("ReviewModal.title")}</Text>
          <Text style={styles.subtitle}>{t("ReviewModal.subtitle")}</Text>

          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <IonIcon
                  name={star <= rating ? "star" : "star-outline"}
                  size={35}
                  color="#FFC107"
                  style={styles.star}
                />
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.commentInput}
            placeholder={t("ReviewModal.commentPlaceholder")}
            placeholderTextColor={theme.colors.grey500}
            multiline
            numberOfLines={4}
            value={comment}
            onChangeText={setComment}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>{t("ReviewModal.cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submitButton, (rating === 0 || isSubmitting) && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={rating === 0 || isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color={theme.colors.white} />
              ) : (
                <Text style={styles.submitButtonText}>{t("ReviewModal.submit")}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
