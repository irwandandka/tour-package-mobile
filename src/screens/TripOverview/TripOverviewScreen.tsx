import React, { useEffect, useState, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import styles from "./TripOverviewScreen.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/param";
import { useNavigation } from "@react-navigation/native";
import apiService from "../../services/apiService";
import { RouteProp, useRoute } from "@react-navigation/native";
import FeatherIcon from "react-native-vector-icons/Feather";
import uuid from 'react-native-uuid';
import { ProductDetail, Room, RoomType, RoomOrder, BodySaveBooking, BodySaveProductDetail, RoomPriceBreakdown } from "../../types/api";
import { format } from "date-fns";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";

type TripOverviewNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "TripOverview"
>;

type RoomFieldKey = "adult" | "child" | "senior" | "infant";

type TripOverviewRouteProp = RouteProp<RootStackParamList, "TripOverview">;

const roomFields: { label: string; key: RoomFieldKey }[] = [
  { label: "Adsult", key: "adult" },
  { label: "Child", key: "child" },
  { label: "Infant", key: "infant" },
  { label: "Senior", key: "senior" },
];

export default function TripOverviewScreen() {
  const navigation = useNavigation<TripOverviewNavigationProp>();
  const route = useRoute<TripOverviewRouteProp>();

  const { slug, dateFrom, dateTo } = route.params;

  const [token, setToken] = useState<string | null>(null);

  // Format date to display
  const formattedDateFrom = format(new Date(dateFrom), "MMMM dd, yyyy");
  const formattedDateTo = format(new Date(dateTo), "MMMM dd, yyyy");

  // Get day names to display
  const dayFrom = format(new Date(dateFrom), "EEEE");
  const dayTo = format(new Date(dateTo), "EEEE");

  // List jenis kamar (dari API)
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);

  const [product, setProduct] = useState<ProductDetail | null>(null);

  // kamar yang dipilih user
  const [rooms, setRooms] = useState<Room[]>([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [breakdowns, setBreakdowns] = useState<RoomPriceBreakdown[]>([]);

  // Load data saat mount screen
  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Gagal mengambil token:", error);
      }
    };

    getToken();

    const fetchRoomTypes = async () => {
      try {
        const response = await apiService.get(`v1/product/${slug}/room-type`, {
          params: {
            lang: "EN",
            currency: "SGD",
            date_start: dateFrom,
            date_end: dateTo,
          },
        });

        setRoomTypes(response.data);

        const responseProduct = await apiService.get(`v1/product/${slug}`, {
          params: {
            lang: 'EN',
            currency: 'SGD',
          }
        });

        setProduct(responseProduct.data);

      } catch (error: any) {
        console.error("Error fetching trip overview:");
      }
    };

    fetchRoomTypes();
  }, []);

  // Hitung harga per kategori + total
  const roomsWithPrice = useMemo(() => {
    return rooms.map(room => {
      const roomType = roomTypes.find(rt => rt.id === room.roomId);
      if (!roomType) {
        return {
          ...room,
          priceAdult: 0,
          priceChild: 0,
          priceInfant: 0,
          priceSenior: 0,
          total: 0,
        };
      }

      const breakdown = calculateRoomPriceBreakdown(roomType, room);

      return {
        ...room,
        priceAdult: breakdown.adult ?? 0,
        priceChild: breakdown.child ?? 0,
        priceInfant: breakdown.infant ?? 0,
        priceSenior: breakdown.senior ?? 0,
        total: breakdown.total ?? 0,
      };
    });
  }, [rooms, roomTypes]);

  // Update totalPrice
  useEffect(() => {
    const total = roomsWithPrice.reduce((acc, room) => acc + (room.total || 0), 0);
    setTotalPrice(total);
  }, [roomsWithPrice]);

  // Increment dan decrement jumlah orang di setiap kamar
  const incrementField = (roomId: string, field: RoomFieldKey) => {
    setRooms(prev =>
      prev.map(r =>
        r.id === roomId
          ? { ...r, [field]: r[field] + 1 }
          : r
      )
    );
  };

  // Decrement jumlah orang di setiap kamar
  const decrementField = (roomId: string, field: RoomFieldKey) => {
    setRooms(prev =>
      prev.map(r =>
        r.id === roomId
          ? { ...r, [field]: Math.max(0, r[field] - 1) }
          : r
      )
    );
  };

  const onDeleteRoom = (index: number) => {
    setRooms((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      return updated;
    });
  };

  function calculateRoomPriceBreakdown(roomType: RoomType, order: RoomOrder) {
    const categories: (keyof RoomOrder)[] = ["adult", "child", "infant", "senior"];
    let total = 0;
    const breakdown: { [k in keyof RoomOrder]?: number } = { adult: 0, child: 0, infant: 0, senior: 0 };

    let level = 1;
    for (const category of categories) {
      const count = order[category] || 0;
      for (let i = 0; i < count; i++) {
        const pricing = roomType.pricing.find(p => p.level === level);
        if (!pricing) continue;
        breakdown[category]! += pricing[category]!;
        total += pricing[category]!;
        level++;
      }
    }

    return { ...breakdown, total };
  }

  const handleBooking = async () =>{
    try {
      const bodySave: BodySaveBooking = {
        product_id: product?.id ?? '',
        date_from: dateFrom,
        date_to: dateTo,
        currency: 'SGD',
        product_details: rooms.map(room => ({
          product_detail: room.roomId,
          quantity: 1,
          quantity_adult: room.adult,
          quantity_child: room.child,
          quantity_infant: room.infant,
          quantity_senior: room.senior,
        })),
      };

      const response = await apiService.post(`v1/booking`, bodySave);

      Toast.show({
        type: "success",
        text1: "Booking Successful",
        text2: "Your booking has been confirmed!",
      });

      setTimeout(() => {
        navigation.navigate("PassengerDetail", {
          slug,
          dateFrom,
          dateTo,
          transactionId: response.data.id,
        });
      }, 1000);
    } catch (error: any) {
      if (error.response) {
        // Response dari server
        console.error("Data:", error.response.data);
      } else if (error.request) {
        // Request dikirim tapi tidak ada response
        console.error("No response received:", error.request);
      } else {
        // Error lain
        console.error("Error message:", error.message);
      }
    }
  }

  let roomIndex = 0;

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <FeatherIcon name="chevron-left" size={27} color={"#FFFFFF"} />
          </TouchableOpacity>
          {/* End Back Button */}

          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.headerTitle}>Trip Overview</Text>
            <View style={styles.card}>
              <View style={styles.cardTopSide}>
                <Image
                  source={{
                    uri: product?.image,
                  }}
                  style={styles.cardImage}
                />
              </View>
              <View style={styles.cardBottomSide}>
                <View style={styles.cardTitleWrapper}>
                  <Text style={styles.cardTitle}>{product?.name}</Text>
                  <View style={styles.cardRatingWrapper}>
                    <IonIcon
                      name="star"
                      style={styles.cardStarIcon}
                      size={21}
                      color={"#F29D38"}
                    />
                    <IonIcon
                      name="star"
                      style={styles.cardStarIcon}
                      size={21}
                      color={"#F29D38"}
                    />
                    <IonIcon
                      name="star"
                      style={styles.cardStarIcon}
                      size={21}
                      color={"#F29D38"}
                    />
                    <IonIcon
                      name="star"
                      style={styles.cardStarIcon}
                      size={21}
                      color={"#F29D38"}
                    />
                    <IonIcon
                      name="star-half"
                      style={styles.cardStarIcon}
                      size={21}
                      color={"#F29D38"}
                    />
                    <Text style={styles.cardStarRating}>{ product?.rating }</Text>
                  </View>

                  <Text style={styles.textNights}>{ product?.duration }</Text>
                </View>
              </View>
            </View>
          </View>
          {/* End Header Section */}

          {/* Room */}
          <View style={styles.roomSection}>
            <Text style={styles.titleRoomSection}>Room</Text>

            {roomTypes.map((roomType, index) => (
              <View style={styles.roomCard} key={roomType.id}>
                <View style={styles.roomCardHeader}>
                  {/* Button Add Room */}
                  <TouchableOpacity
                    style={styles.roomCardHeaderButtonAdd}
                    onPress={() => {
                      if (roomTypes.length === 0) return;

                      const selectedType = roomTypes[index];

                      const newRoom: Room = {
                        id: uuid.v4(),
                        roomId: selectedType.id,
                        roomName: selectedType.name,
                        roomImage: selectedType.image,
                        adult: roomTypes[index].min_adult,
                        priceAdult: 0,
                        priceChild: 0,
                        priceInfant: 0,
                        priceSenior: 0,
                        total: 0,
                        child: 0,
                        infant: 0,
                        senior: 0,
                      };

                      setRooms((prev) => {
                        // cari posisi terakhir dari roomType yang sama
                        const lastIndex = [...prev]
                          .map((r) => r.roomId) // misalnya roomType ada id
                          .lastIndexOf(selectedType.id);

                        const newRooms = [...prev];

                        if (lastIndex === -1) {
                          // kalau belum ada tipe ini, taruh di akhir
                          newRooms.push(newRoom);
                        } else {
                          // insert setelah index terakhir tipe ini
                          newRooms.splice(lastIndex + 1, 0, newRoom);
                        }

                        return newRooms;
                      });
                    }}
                  >
                    <Text style={styles.roomCardButtonAddTitle}>Add Room</Text>
                  </TouchableOpacity>
                  {/* End Button Add Room */}

                  <Text style={styles.roomCardHeaderTitle}>
                    {roomType.name}
                  </Text>

                  <Text style={styles.roomCardHeaderAllotment}>
                    {" "}
                    {roomType.allotment} Rooms Left
                  </Text>
                </View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <View>
                    {rooms
                      .filter((room) => room.roomId === roomType.id)
                      .map((room, index) => {
                        const currentIndex = roomIndex++;

                        return (
                          <View key={index} style={styles.roomCardBody}>
                            <View style={styles.roomTitleWrapper}>
                              <Image
                                style={styles.roomCardBodyImage}
                                source={{ uri: room.roomImage }}
                              />

                              <View style={styles.roomTitleWithDelete}>
                                <Text style={styles.roomCardBodyTitle}>
                                  {room.roomName} #{index + 1}
                                </Text>

                                <TouchableOpacity
                                  onPress={() => onDeleteRoom(currentIndex)}
                                >
                                  <FeatherIcon
                                    name="trash-2"
                                    size={20}
                                    color="red"
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>

                            <View style={styles.roomCardInputGrouping}>
                              {roomFields.map((field) => {
                                return (
                                  <View
                                    key={field.key}
                                    style={styles.roomCardBodyInputWrapper}
                                  >
                                    <Text style={styles.roomCardBodyInputTitle}>
                                      {field.label}
                                    </Text>
                                    <View style={styles.roomInputGroup}>
                                      <TouchableOpacity
                                        disabled={room[field.key] <= 0}
                                        onPress={() =>
                                          decrementField(room.id, field.key)
                                        }
                                        style={styles.roomInputButtonDecrement}
                                      >
                                        <Text
                                          style={styles.roomInputTextDecrement}
                                        >
                                          −
                                        </Text>
                                      </TouchableOpacity>

                                      <TextInput
                                        style={styles.inputValue}
                                        value={room[field.key].toString()}
                                        onChangeText={(text) => {
                                          const num = parseInt(text);
                                          if (!isNaN(num)) {
                                            setRooms((prev) =>
                                              prev.map((r) =>
                                                r.id === room.id
                                                  ? { ...r, [field.key]: num }
                                                  : r
                                              )
                                            );
                                          }
                                        }}
                                        keyboardType="numeric"
                                      />

                                      <TouchableOpacity
                                        onPress={() =>
                                          incrementField(room.id, field.key)
                                         }
                                        style={styles.roomInputButtonIncrement}
                                      >
                                        <Text
                                          style={styles.roomInputTextIncrement}
                                        >
                                          +
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                  </View>
                                );
                              })}
                            </View>
                          </View>
                        );
                      })}
                  </View>
                </ScrollView>
              </View>
            ))}
          </View>
          {/* End Room */}

          {/* Travel Summary */}
          <View style={styles.travelSummaryCard}>
            <Text style={styles.travelSummaryTitle}>Travel Summary</Text>

            <View style={styles.dateSummaryGroup}>
              <IonIcon name="calendar-outline" size={17} />

              <View style={styles.dateSummaryTextGroup}>
                <Text style={styles.dateSummaryText}>From Date</Text>
                <Text style={styles.dateSummaryString}>{formattedDateFrom}</Text>
                <Text style={styles.dateSummaryDayName}>{dayFrom}</Text>
              </View>
            </View>

            <View style={styles.dateSummaryGroup}>
              <IonIcon name="calendar-outline" size={17} />

              <View style={styles.dateSummaryTextGroup}>
                <Text style={styles.dateSummaryText}>To Date</Text>
                <Text style={styles.dateSummaryString}>{formattedDateTo}</Text>
                <Text style={styles.dateSummaryDayName}>{dayTo}</Text>
              </View>
            </View>

            {/* Room Details */}
            <View style={styles.wrapperRoomDetail}>
              {rooms.length === 0 ? (
                <Text style={styles.noRoomSelectedText}>No rooms selected</Text>
              ) : (
                <>
                  {roomsWithPrice.map((room, index) => (
                    <View key={room.id} style={styles.groupRoomDetail}>
                      <Text style={styles.roomTitle}>{room.roomName}</Text>
                      <Text style={styles.roomSequence}>Room #{index + 1}</Text>
                      {room.adult > 0 && (
                        <Text style={styles.roomPricing}>{room.adult} Adult = SGD {room.priceAdult.toFixed(2)}</Text>
                      )}
                      {room.child > 0 && (
                        <Text style={styles.roomPricing}>{room.child} Child = SGD {room.priceChild.toFixed(2)}</Text>
                      )}
                      {room.infant > 0 && (
                        <Text style={styles.roomPricing}>{room.infant} Infant = SGD {room.priceInfant.toFixed(2)}</Text>
                      )}
                      {room.senior > 0 && (
                        <Text style={styles.roomPricing}>{room.senior} Senior = SGD {room.priceSenior.toFixed(2)}</Text>
                      )}
                    </View>
                  ))}
                </>
              )}
            </View>

            {/* Divider */}
            <View style={{ height: 1, backgroundColor: '#eee', marginVertical: 10 }} />

            {/* Total Price */}
            <View style={styles.groupTotalPrice}>
              <Text style={styles.totalPriceText}>
                Total
              </Text>

              <Text style={styles.totalPriceValue}>
                SGD {totalPrice.toFixed(2)}
              </Text>
            </View>

            {/* Button Continue Passenger Detail */}
            <TouchableOpacity 
              disabled={rooms.length == 0} 
              style={rooms.length > 0 ? styles.continueButton : styles.disabledButton}
              onPress={handleBooking}
            >
              <Text style={rooms.length > 0 ? styles.continueButtonText : styles.disabledButtonText}>Continue to Passenger Details</Text>
            </TouchableOpacity>

            <Text style={styles.travelSummaryDisclaimer}>
              No hidden fees, no surprises. The price you see is the price you pay.
            </Text>
          </View>
          {/* End Travel Summary */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
