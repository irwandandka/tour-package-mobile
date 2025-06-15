import { View, Text, Image } from "react-native";
import styles from '../ProductScreen.styles';
import IonIcon from "react-native-vector-icons/Ionicons";
import { Review } from "../../../types/api";

interface ReviewSectionProps {
    reviews: Review[];
}

export default function ReviewSection({
    reviews,
}: ReviewSectionProps) {
    return (
        <View style={styles.reviewSection}>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <View style={styles.reviewCard} key={review.id}>
                        <View style={styles.reviewRatingAndDateContainer}>
                            <View style={styles.reviewCardRatingGroup}>
                                <IonIcon name="star" size={21} color={"#F29D38"} />
                                <IonIcon name="star" size={21} color={"#F29D38"} />
                                <IonIcon name="star" size={21} color={"#F29D38"} />
                                <IonIcon name="star" size={21} color={"#F29D38"} />
                                <IonIcon name="star-half" size={21} color={"#F29D38"} />
                            </View>
                            <Text style={styles.reviewCardDate}>
                                {review.review_date}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.reviewCardDescription}>
                                "{review.comment}"
                            </Text>
                        </View>
                        <View style={styles.reviewCardAvatarAndNameContainer}>
                            <Image style={styles.reviewCardAvatar} source={{ uri: 'https://pub-cfc04ba1c45649688f85c3bdd738f319.r2.dev/sarah-connor.png' }} />
                            <View style={styles.reviewCardNameEmailContainer}>
                                <Text style={styles.reviewCardName}>
                                    {review.user}
                                </Text>
                                <Text style={styles.reviewCardEmail}>
                                    {review.email}
                                </Text>
                            </View>
                        </View>
                    </View>
                ))
            ) : (
                <Text>No reviews yet</Text>
            )}
        </View>
    );
}