import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../ProductScreen.styles";
import IonIcon from "react-native-vector-icons/Ionicons";
import { ProductDetail } from "../../../types/api";

interface GeneralSectionProps {
    productDetail: ProductDetail | null;
    isReadMore: boolean;
    maxLength: number;
    navigation: any;
    descriptionReadMore: () => void;
}

export default function GeneralSection({ 
    productDetail,
    isReadMore,
    maxLength,
    navigation,
    descriptionReadMore
}: GeneralSectionProps) {
    const fullDescription = productDetail?.description ?? "";
    
    const shortDescription =
    fullDescription.length > maxLength
        ? fullDescription.substring(0, maxLength).trim() + "..."
        : fullDescription;
        
    return (
        <View style={styles.generalSection}>
            <View style={styles.ratingDurationContainer}>
                {/* Rating */}
                <View style={styles.generalSubSection}>
                    <View style={styles.generalSubSectionIcon}>
                        <IonIcon name="star" color={"#FBBC04"} size={27} />
                        <Text style={styles.generalSubSectionText}>
                            {productDetail?.rating}
                        </Text>
                    </View>
                    <Text style={styles.generalSectionText}>Rating</Text>
                </View>

                {/* Duration */}
                <View style={styles.generalSubSectionDuration}>
                    <View style={styles.generalSubSectionIcon}>
                        <IonIcon name="time" color={"#FBBC04"} size={27} />
                        <Text style={styles.generalDurationText}>
                            {productDetail?.duration}
                        </Text>
                    </View>
                    <Text style={styles.generalSectionText}>Duration</Text>
                </View>
            </View>

            {/* Description */}
            <View style={styles.generalDescriptionSection}>
                <Text style={styles.generalDescriptionTitle}>Description</Text>
                <Text style={styles.generalDescriptionText}>
                    {isReadMore ? fullDescription : shortDescription}
                </Text>
                {fullDescription.length > maxLength && (
                    <TouchableOpacity
                        onPress={descriptionReadMore}>
                        <Text style={styles.generalDescriptionReadMore}>
                            {isReadMore ? "Read Less" : "Read More"}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Button Book Now */}
            <TouchableOpacity
                style={styles.buttonBookNow}
                onPress={() => navigation.navigate("AvailableDate", {
                    slug: productDetail?.slug || "",
                })}>
                <Text style={styles.buttonBookNowText}>
                    Book Now
                </Text>
            </TouchableOpacity>
        </View>
    );
}