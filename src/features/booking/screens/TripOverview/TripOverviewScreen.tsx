import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView, TextInput, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";

import IonIcon from "react-native-vector-icons/Ionicons";
import FeatherIcon from "react-native-vector-icons/Feather";

import styles from "./TripOverviewScreen.styles";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation/types";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";

import { apiService, ApiResponse } from "@shared/api";
import { getApiErrorMessage, formatCurrency } from "@shared/utils";
import { theme } from "@shared/constants/theme";

import { ProductDetail, RoomType, BodySaveBooking } from "@shared/types";
import { useBookingStore } from "../../store/bookingStore";
import { useRoomSelection } from "../../hooks/useRoomSelection";

import { format } from "date-fns";
import Toast from "react-native-toast-message";

type TripOverviewNavigationProp = NativeStackNavigationProp<RootStackParamList, "TripOverview">;
type TripOverviewRouteProp = RouteProp<RootStackParamList, "TripOverview">;

type RoomFieldKey = "adult" | "child" | "senior" | "infant";

const roomFields: { label: string; key: RoomFieldKey }[] = [
  { label: "Adult", key: "adult" },
  { label: "Child", key: "child" },
  { label: "Infant", key: "infant" },
  { label: "Senior", key: "senior" },
];

export default function TripOverviewScreen() {
  const navigation = useNavigation<TripOverviewNavigationProp>();
  const route = useRoute<TripOverviewRouteProp>();
  const { t } = useTranslation();

  const { slug, dateFrom, dateTo } = route.params;

  const formattedDateFrom = format(new Date(dateFrom), "MMMM dd, yyyy");
  const formattedDateTo = format(new Date(dateTo), "MMMM dd, yyyy");
  const dayFrom = format(new Date(dateFrom), "EEEE");
  const dayTo = format(new Date(dateTo), "EEEE");

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const setBookingRooms = useBookingStore((state) => state.setRooms);

  const {
    rooms,
    roomsWithPrice,
    totalPrice,
    roomTypes,
    setRoomTypes,
    addRoom,
    incrementField,
    decrementField,
    setFieldValue,
    deleteRoom,
  } = useRoomSelection();

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const roomTypeResponse = await apiService.get<ApiResponse<RoomType[]>>(
          `v1/product/${slug}/room-type`,
          { lang: "EN", currency: "IDR", date_start: dateFrom, date_end: dateTo },
        );
        setRoomTypes(roomTypeResponse.data);

        const productResponse = await apiService.get<ApiResponse<ProductDetail>>(
          `v1/product/${slug}`,
          { lang: "EN", currency: "IDR" },
        );
        setProduct(productResponse.data);
      } catch (error) {
        Toast.show({ type: "error", text1: "Failed to load", text2: getApiErrorMessage(error) });
      }
    };

    fetchRoomTypes();
  }, [slug, dateFrom, dateTo, setRoomTypes]);

  const handleBooking = async () => {
    try {
      setBookingRooms(roomsWithPrice);

      const bodySave: BodySaveBooking = {
        product_id: product?.id ?? "",
        date_from: dateFrom,
        date_to: dateTo,
        currency: "IDR",
        product_details: rooms.map((room) => ({
          product_detail: room.roomId,
          quantity: 1,
          quantity_adult: room.adult,
          quantity_child: room.child,
          quantity_infant: room.infant,
          quantity_senior: room.senior,
        })),
      };

      const response = await apiService.post<ApiResponse<{ id: string }>>("v1/booking", bodySave);

      Toast.show({
        type: "success",
        text1: "Booking Successful",
        text2: "Your booking has been confirmed!",
      });

      navigation.navigate("PassengerDetail", {
        slug,
        dateFrom,
        dateTo,
        transactionId: response.data.id,
      });
    } catch (error) {
      Toast.show({ type: "error", text1: "Booking failed", text2: getApiErrorMessage(error) });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-left" size={27} color={theme.colors.white} />
          </TouchableOpacity>

          <View style={styles.headerSection}>
            <Text style={styles.headerTitle}>{t("TripOverviewScreen.title")}</Text>
            <View style={styles.card}>
              <View style={styles.cardTopSide}>
                <Image source={{ uri: product?.image }} style={styles.cardImage} />
              </View>
              <View style={styles.cardBottomSide}>
                <View style={styles.cardTitleWrapper}>
                  <Text style={styles.cardTitle}>{product?.name}</Text>
                  <View style={styles.cardRatingWrapper}>
                    {[...Array(4)].map((_, i) => (
                      <IonIcon
                        key={i}
                        name="star"
                        style={styles.cardStarIcon}
                        size={21}
                        color={theme.colors.primary}
                      />
                    ))}
                    <IonIcon
                      name="star-half"
                      style={styles.cardStarIcon}
                      size={21}
                      color={theme.colors.primary}
                    />
                    <Text style={styles.cardStarRating}>{product?.rating}</Text>
                  </View>

                  <Text style={styles.textNights}>{product?.duration}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.roomSection}>
            <Text style={styles.titleRoomSection}>{t("TripOverviewScreen.room")}</Text>

            {roomTypes.map((roomType) => (
              <View style={styles.roomCard} key={roomType.id}>
                <View style={styles.roomCardHeader}>
                  <TouchableOpacity
                    style={styles.roomCardHeaderButtonAdd}
                    onPress={() => addRoom(roomType)}
                  >
                    <Text style={styles.roomCardButtonAddTitle}>
                      {t("TripOverviewScreen.addRoom")}
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.roomCardHeaderTitle}>{roomType.name}</Text>

                  <Text style={styles.roomCardHeaderAllotment}>
                    {roomType.allotment} {t("TripOverviewScreen.roomLeft")}
                  </Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View>
                    {rooms
                      .filter((room) => room.roomId === roomType.id)
                      .map((room, index) => (
                        <View key={room.id} style={styles.roomCardBody}>
                          <View style={styles.roomTitleWrapper}>
                            <Image
                              style={styles.roomCardBodyImage}
                              source={{ uri: room.roomImage }}
                            />

                            <View style={styles.roomTitleWithDelete}>
                              <Text style={styles.roomCardBodyTitle}>
                                {room.roomName} #{index + 1}
                              </Text>

                              <TouchableOpacity onPress={() => deleteRoom(room.id)}>
                                <FeatherIcon name="trash-2" size={20} color={theme.colors.error} />
                              </TouchableOpacity>
                            </View>
                          </View>

                          <View style={styles.roomCardInputGrouping}>
                            {roomFields.map((field) => (
                              <View key={field.key} style={styles.roomCardBodyInputWrapper}>
                                <Text style={styles.roomCardBodyInputTitle}>{field.label}</Text>
                                <View style={styles.roomInputGroup}>
                                  <TouchableOpacity
                                    disabled={room[field.key] <= 0}
                                    onPress={() => decrementField(room.id, field.key)}
                                    style={styles.roomInputButtonDecrement}
                                  >
                                    <Text style={styles.roomInputTextDecrement}>−</Text>
                                  </TouchableOpacity>

                                  <TextInput
                                    style={styles.inputValue}
                                    value={room[field.key].toString()}
                                    onChangeText={(text) => {
                                      const num = parseInt(text, 10);
                                      if (!isNaN(num)) {
                                        setFieldValue(room.id, field.key, num);
                                      }
                                    }}
                                    keyboardType="numeric"
                                  />

                                  <TouchableOpacity
                                    onPress={() => incrementField(room.id, field.key)}
                                    style={styles.roomInputButtonIncrement}
                                  >
                                    <Text style={styles.roomInputTextIncrement}>+</Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            ))}
                          </View>
                        </View>
                      ))}
                  </View>
                </ScrollView>
              </View>
            ))}
          </View>

          <View style={styles.travelSummaryCard}>
            <Text style={styles.travelSummaryTitle}>{t("TripOverviewScreen.travelSummary")}</Text>

            <View style={styles.dateSummaryGroup}>
              <IonIcon name="calendar-outline" size={17} />

              <View style={styles.dateSummaryTextGroup}>
                <Text style={styles.dateSummaryText}>{t("TripOverviewScreen.fromDate")}</Text>
                <Text style={styles.dateSummaryString}>{formattedDateFrom}</Text>
                <Text style={styles.dateSummaryDayName}>{dayFrom}</Text>
              </View>
            </View>

            <View style={styles.dateSummaryGroup}>
              <IonIcon name="calendar-outline" size={17} />

              <View style={styles.dateSummaryTextGroup}>
                <Text style={styles.dateSummaryText}>{t("TripOverviewScreen.toDate")}</Text>
                <Text style={styles.dateSummaryString}>{formattedDateTo}</Text>
                <Text style={styles.dateSummaryDayName}>{dayTo}</Text>
              </View>
            </View>

            <View style={styles.wrapperRoomDetail}>
              {rooms.length === 0 ? (
                <Text style={styles.noRoomSelectedText}>
                  {t("TripOverviewScreen.noRoomSelected")}
                </Text>
              ) : (
                roomsWithPrice.map((room, index) => (
                  <View key={room.id} style={styles.groupRoomDetail}>
                    <Text style={styles.roomTitle}>{room.roomName}</Text>
                    <Text style={styles.roomSequence}>Room #{index + 1}</Text>
                    {room.adult > 0 && (
                      <Text style={styles.roomPricing}>
                        {room.adult} Adult = {formatCurrency(room.priceAdult)}
                      </Text>
                    )}
                    {room.child > 0 && (
                      <Text style={styles.roomPricing}>
                        {room.child} Child = {formatCurrency(room.priceChild)}
                      </Text>
                    )}
                    {room.infant > 0 && (
                      <Text style={styles.roomPricing}>
                        {room.infant} Infant = {formatCurrency(room.priceInfant)}
                      </Text>
                    )}
                    {room.senior > 0 && (
                      <Text style={styles.roomPricing}>
                        {room.senior} Senior = {formatCurrency(room.priceSenior)}
                      </Text>
                    )}
                  </View>
                ))
              )}
            </View>

            <View
              style={{ height: 1, backgroundColor: theme.colors.grey200, marginVertical: 10 }}
            />

            <View style={styles.groupTotalPrice}>
              <Text style={styles.totalPriceText}>{t("TripOverviewScreen.total")}</Text>
              <Text style={styles.totalPriceValue}>{formatCurrency(totalPrice)}</Text>
            </View>

            <TouchableOpacity
              disabled={rooms.length === 0}
              style={rooms.length > 0 ? styles.continueButton : styles.disabledButton}
              onPress={handleBooking}
            >
              <Text
                style={rooms.length > 0 ? styles.continueButtonText : styles.disabledButtonText}
              >
                {t("TripOverviewScreen.continuePassengerDetail")}
              </Text>
            </TouchableOpacity>

            <Text style={styles.travelSummaryDisclaimer}>{t("TripOverviewScreen.note")}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
