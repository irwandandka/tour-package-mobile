import React, { useEffect, useState } from "react";
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

type TripOverviewNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "TripOverview"
>;

type Room = {
  id: number;
  adult: number;
  roomType: RoomType;
  child: number;
  infant: number;
  senior: number;
};

type Pricing = {
  adult: number;
  child: number;
  infant: number;
  senior: number;
  level: number;
};

type RoomType = {
  id: string;
  name: string;
  image: string;
  min_adult: number;
  max_adult: number;
  max_pax: number;
  allotment: number;
  pricing: Pricing[];
};

type RoomFieldKey = "adult" | "child" | "senior" | "infant";

type RoomOccupancy = {
  [key in RoomFieldKey]: number;
};

type TripOverviewRouteProp = RouteProp<RootStackParamList, "TripOverview">;

const roomFields: { label: string; key: RoomFieldKey }[] = [
  { label: "Adult", key: "adult" },
  { label: "Child", key: "child" },
  { label: "Infant", key: "infant" },
  { label: "Senior", key: "senior" },
];

export default function TripOverviewScreen() {
  const navigation = useNavigation<TripOverviewNavigationProp>();
  const route = useRoute<TripOverviewRouteProp>();

  const { slug, dateFrom, dateTo } = route.params;

  // List jenis kamar (dari API)
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);

  // kamar yang dipilih user
  const [rooms, setRooms] = useState<Room[]>([]);

  // default jumlah orang di setiap kamar
  const [roomOccupancy, setRoomOccupancy] = useState<RoomOccupancy>({
    adult: 0,
    child: 0,
    infant: 0,
    senior: 0,
  });

  const incrementField = (field: RoomFieldKey) => {
    setRoomOccupancy((prev) => ({
      ...prev,
      [field]: prev[field] + 1,
    }));
  };

  const decrementField = (field: RoomFieldKey) => {
    setRoomOccupancy((prev) => ({
      ...prev,
      [field]: Math.max(0, prev[field] - 1),
    }));
  };

  // Load data saat mount screen
  useEffect(() => {
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
      } catch (error: any) {
        console.error("Error fetching trip overview:");
      }
    };

    fetchRoomTypes();
  }, []);

  const onDeleteRoom = (index: number) => {
    setRooms((prev) => prev.filter((_, i) => i !== index));
  };

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
                    uri: "https://pub-cfc04ba1c45649688f85c3bdd738f319.r2.dev/bangkok-tour-1.png",
                  }}
                  style={styles.cardImage}
                />
              </View>
              <View style={styles.cardBottomSide}>
                <View style={styles.cardTitleWrapper}>
                  <Text style={styles.cardTitle}>2D1N Bangkok Tour</Text>
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
                    <Text style={styles.cardStarRating}>4.8</Text>
                  </View>

                  <Text style={styles.textNights}>2 Days 1 Night</Text>
                </View>
              </View>
            </View>
          </View>
          {/* End Header Section */}

          {/* Room */}
          <View style={styles.roomSection}>
            <Text style={styles.titleRoomSection}>Room</Text>

            {roomTypes.map((roomType, index) => (
              <View style={styles.roomCard}>
                <View style={styles.roomCardHeader}>
                  {/* Button Add Room */}
                  <TouchableOpacity
                    style={styles.roomCardHeaderButtonAdd}
                    onPress={() => {
                      if (roomTypes.length === 0) return;

                      const newRoom: Room = {
                        id: rooms.length + 1,
                        roomType: roomTypes[index], // ambil room type pertama
                        adult: roomTypes[index].min_adult,
                        child: 0,
                        infant: 0,
                        senior: 0,
                      };

                      setRooms((prev) => [...prev, newRoom]);
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
                      .filter((room) => room.roomType.id === roomType.id)
                      .map((room, index) => (
                        <View key={index} style={styles.roomCardBody}>
                          <View style={styles.roomTitleWrapper}>
                            <Image
                              style={styles.roomCardBodyImage}
                              source={{ uri: room.roomType.image }}
                            />

                            <View style={styles.roomTitleWithDelete}>
                              <Text style={styles.roomCardBodyTitle}>
                                {room.roomType.name} #{index + 1}
                              </Text>

                              <TouchableOpacity
                                onPress={() => onDeleteRoom(index)}
                              >
                                <FeatherIcon name="trash-2" size={20} color="red" />
                              </TouchableOpacity>
                            </View>
                          </View>

                          <View style={styles.roomCardInputGrouping}>
                            {roomFields.map((field) => {
                              console.log("Render field:", field.label);
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
                                      onPress={() => decrementField(field.key)}
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
                                      onPress={() => incrementField(field.key)}
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
                      ))}
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
                <Text style={styles.dateSummaryText}>Start Date</Text>
                <Text style={styles.dateSummaryString}>August 1, 2023</Text>
                <Text style={styles.dateSummaryDayName}>Monday</Text>
              </View>
            </View>
          </View>
          {/* End Travel Summary */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
