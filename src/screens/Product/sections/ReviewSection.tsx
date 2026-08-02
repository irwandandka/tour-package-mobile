import React from "react";
import { View, Text, Image } from "react-native";
import styles from '../ProductScreen.styles';
import IonIcon from "react-native-vector-icons/Ionicons";
import { Review } from "../../../types/api";

interface ReviewSectionProps {
    reviews: Review[];
}

const StarRating = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
      {[...Array(fullStars)].map((_, i) => (
        <IonIcon key={`full_${i}`} name="star" size={18} color="#F29D38" />
      ))}
      {hasHalfStar && (
        <IonIcon key="half" name="star-half-sharp" size={18} color="#F29D38" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <IonIcon key={`empty_${i}`} name="star-outline" size={18} color="#F29D38" />
      ))}
    </View>
  );
};


export default function ReviewSection({ reviews }: ReviewSectionProps) {
    return (
        <View style={styles.reviewSection}>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <View style={styles.reviewCard} key={review.id}>
                        <View style={styles.reviewCardHeader}>
                            <StarRating rating={review.rating} />
                            <Text style={styles.reviewDate}>
                                {review.review_date}
                            </Text>
                        </View>
                        
                        <Text style={styles.reviewComment}>
                            "{review.comment}"
                        </Text>
                        
                        <View style={styles.reviewUserInfo}>
                            <Image 
                                style={styles.reviewAvatar} 
                                source={{ uri: review.profile_picture_url || 'https://via.placeholder.com/50' }} 
                            />
                            <View>
                                <Text style={styles.reviewName}>
                                    {review.user}
                                </Text>
                                <Text style={styles.reviewEmail}>
                                    {review.email}
                                </Text>
                            </View>
                        </View>
                    </View>
                ))
            ) : (
                <View style={{alignItems: 'center', paddingVertical: 40}}>
                    <Text style={{color: '#8A8A8A'}}>Belum ada ulasan untuk produk ini.</Text>
                </View>
            )}
        </View>
    );
}