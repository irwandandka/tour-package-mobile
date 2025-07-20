import React, { useState } from "react";
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

type Room = {
  id: number;
  adult: number;
  childWithBed: number;
  childNoBed: number;
  infant: number;
};

type RoomFieldKey = keyof Omit<Room, "id">;

const roomFields: { label: string; key: RoomFieldKey }[] = [
  { label: "Adult", key: "adult" },
  { label: "Child With Bed", key: "childWithBed" },
  { label: "Child No Bed", key: "childNoBed" },
  { label: "Infant", key: "infant" },
];

export default function TripOverviewScreen({ navigation }: any) {
  const [rooms, setRooms] = React.useState<Room[]>([
    { id: 1, adult: 2, childWithBed: 0, childNoBed: 0, infant: 0 },
  ]);

  const updateRoomField = (
    roomId: number,
    key: RoomFieldKey,
    amount: number
  ) => {
    setRooms((prev) =>
      prev.map((r) =>
        r.id === roomId ? { ...r, [key]: Math.max(0, r[key] + amount) } : r
      )
    );
  };

  const [value, setValue] = useState(1);
  const increment = () => setValue((prev) => prev + 1);
  const decrement = () => setValue((prev) => Math.max(1, prev - 1));

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
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

            <View style={styles.roomCard}>
              <View style={styles.roomCardHeader}>
                <TouchableOpacity
                  style={styles.roomCardHeaderButtonAdd}
                  onPress={() => {
                    const newRoom: Room = {
                      id: rooms.length + 1,
                      adult: 1,
                      childWithBed: 0,
                      childNoBed: 0,
                      infant: 0,
                    };
                    setRooms((prev) => [...prev, newRoom]);
                  }}
                >
                  <Text style={styles.roomCardButtonAddTitle}>Add Room</Text>
                </TouchableOpacity>

                <Text style={styles.roomCardHeaderTitle}>Deluxe Room</Text>

                <Text style={styles.roomCardHeaderAllotment}>2 Rooms Left</Text>
              </View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View>
                  {rooms.map((room, index) => (
                    <View key={room.id} style={styles.roomCardBody}>
                      <View style={styles.roomTitleWrapper}>
                        <Image
                          style={styles.roomCardBodyImage}
                          source={{
                            uri: "https://pub-cfc04ba1c45649688f85c3bdd738f319.r2.dev/deluxe-room.jpg",
                          }}
                        />
                        <Text style={styles.roomCardBodyTitle}>
                          Room {index + 1}
                        </Text>
                      </View>

                      <View style={styles.roomCardInputGrouping}>
                        {roomFields.map((field) => (
                          <View
                            key={field.key}
                            style={styles.roomCardBodyInputWrapper}
                          >
                            <Text style={styles.roomCardBodyInputTitle}>
                              {field.label}
                            </Text>
                            <View style={styles.roomInputGroup}>
                              <TouchableOpacity
                                onPress={() =>
                                  setRooms((prev) =>
                                    prev.map((r) =>
                                      r.id === room.id
                                        ? {
                                            ...r,
                                            [field.key]: Math.max(
                                              0,
                                              r[field.key] - 1
                                            ),
                                          }
                                        : r
                                    )
                                  )
                                }
                                style={styles.roomInputButtonDecrement}
                              >
                                <Text style={styles.roomInputTextDecrement}>
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
                                  setRooms((prev) =>
                                    prev.map((r) =>
                                      r.id === room.id
                                        ? {
                                            ...r,
                                            [field.key]: r[field.key] + 1,
                                          }
                                        : r
                                    )
                                  )
                                }
                                style={styles.roomInputButtonIncrement}
                              >
                                <Text style={styles.roomInputTextIncrement}>
                                  +
                                </Text>
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
