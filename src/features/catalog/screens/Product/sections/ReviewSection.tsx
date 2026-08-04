import { View, Text, Image } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { EmptyState } from "@shared/components";
import { Review } from "@shared/types";
import styles from "../ProductScreen.styles";

interface ReviewSectionProps {
  reviews: Review[];
}

function StarRating({ rating }: { rating: number }) {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
      {[...Array(fullStars)].map((_, i) => (
        <IonIcon key={`full_${i}`} name="star" size={18} color="#F29D38" />
      ))}
      {hasHalfStar && <IonIcon key="half" name="star-half-sharp" size={18} color="#F29D38" />}
      {[...Array(emptyStars)].map((_, i) => (
        <IonIcon key={`empty_${i}`} name="star-outline" size={18} color="#F29D38" />
      ))}
    </View>
  );
}

export default function ReviewSection({ reviews }: ReviewSectionProps) {
  if (reviews.length === 0) {
    return <EmptyState icon="chatbubble-outline" title="No reviews yet for this product." />;
  }

  return (
    <View style={styles.reviewSection}>
      {reviews.map((review) => (
        <View style={styles.reviewCard} key={review.id}>
          <View style={styles.reviewCardHeader}>
            <StarRating rating={review.rating} />
            <Text style={styles.reviewDate}>{review.review_date}</Text>
          </View>

          <Text style={styles.reviewComment}>&quot;{review.comment}&quot;</Text>

          <View style={styles.reviewUserInfo}>
            <Image
              style={styles.reviewAvatar}
              source={{ uri: review.profile_picture_url || "https://via.placeholder.com/50" }}
            />
            <View>
              <Text style={styles.reviewName}>{review.user}</Text>
              <Text style={styles.reviewEmail}>{review.email}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}
