import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import styles from './ReviewModal.styles';
import apiService from '../../services/apiService';

type ReviewModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  orderId: string;
};

export default function ReviewModal({ visible, onClose, onSubmit, orderId }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <TouchableOpacity key={star} onPress={() => setRating(star)}>
        <IonIcon
          name={star <= rating ? 'star' : 'star-outline'}
          size={35}
          color="#FFC107"
          style={styles.star}
        />
      </TouchableOpacity>
    ));
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert("Peringatan", "Mohon berikan rating bintang terlebih dahulu.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const body = { rating, comment };
      await apiService.post(`v1/booking/${orderId}/submit-review`, body);
      onSubmit();
    } catch (error) {
      console.error("Failed to submit review:", error);
      Alert.alert("Gagal", "Terjadi kesalahan saat mengirim ulasan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Bagaimana pengalaman Anda?</Text>
          <Text style={styles.subtitle}>Beri ulasan untuk tur ini</Text>
          
          <View style={styles.starsContainer}>{renderStars()}</View>

          <TextInput
            style={styles.commentInput}
            placeholder="Tulis komentar Anda di sini..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            value={comment}
            onChangeText={setComment}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Batal</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.submitButton, (rating === 0 || isSubmitting) && styles.disabledButton]} 
              onPress={handleSubmit}
              disabled={rating === 0 || isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.submitButtonText}>Kirim Ulasan</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}