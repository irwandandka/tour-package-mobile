import { useMemo, useState } from "react";
import uuid from "react-native-uuid";
import { Room, RoomType } from "@shared/types";
import { calculateRoomPriceBreakdown } from "../utils/pricingCalculator";

type RoomFieldKey = "adult" | "child" | "senior" | "infant";

/**
 * Extracted from TripOverviewScreen's room add/increment/decrement/delete
 * logic. Fixes a real bug: the original onDeleteRoom(index) took a render-
 * order counter computed across nested .map()s (rooms grouped by room
 * type, not in the order they appear in the flat `rooms` array) and used
 * it to index into the flat array directly — deleting the wrong room
 * whenever more than one room type had been added. Deleting by the room's
 * own stable id (already used correctly by increment/decrement) has no
 * such mismatch.
 */
export function useRoomSelection() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);

  const roomsWithPrice = useMemo(() => {
    return rooms.map((room) => {
      const roomType = roomTypes.find((rt) => rt.id === room.roomId);
      if (!roomType) {
        return { ...room, priceAdult: 0, priceChild: 0, priceInfant: 0, priceSenior: 0, total: 0 };
      }

      const breakdown = calculateRoomPriceBreakdown(roomType, room);

      return {
        ...room,
        priceAdult: breakdown.adult,
        priceChild: breakdown.child,
        priceInfant: breakdown.infant,
        priceSenior: breakdown.senior,
        total: breakdown.total,
      };
    });
  }, [rooms, roomTypes]);

  const totalPrice = useMemo(
    () => roomsWithPrice.reduce((acc, room) => acc + (room.total || 0), 0),
    [roomsWithPrice],
  );

  const addRoom = (roomType: RoomType) => {
    const newRoom: Room = {
      id: uuid.v4() as string,
      roomId: roomType.id,
      roomName: roomType.name,
      roomImage: roomType.image,
      adult: roomType.min_adult,
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
      const lastIndex = prev.map((r) => r.roomId).lastIndexOf(roomType.id);
      const newRooms = [...prev];

      if (lastIndex === -1) {
        newRooms.push(newRoom);
      } else {
        newRooms.splice(lastIndex + 1, 0, newRoom);
      }

      return newRooms;
    });
  };

  const incrementField = (roomId: string, field: RoomFieldKey) => {
    setRooms((prev) => prev.map((r) => (r.id === roomId ? { ...r, [field]: r[field] + 1 } : r)));
  };

  const decrementField = (roomId: string, field: RoomFieldKey) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, [field]: Math.max(0, r[field] - 1) } : r)),
    );
  };

  const setFieldValue = (roomId: string, field: RoomFieldKey, value: number) => {
    setRooms((prev) => prev.map((r) => (r.id === roomId ? { ...r, [field]: value } : r)));
  };

  const deleteRoom = (roomId: string) => {
    setRooms((prev) => prev.filter((r) => r.id !== roomId));
  };

  return {
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
  };
}
