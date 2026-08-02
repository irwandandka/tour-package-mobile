import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Room } from "@shared/types";

/**
 * Replaces the ad hoc AsyncStorage("rooms")/AsyncStorage("selectedPayment")
 * pattern currently used to hand data between TripOverview -> PaymentMethod
 * -> PaymentSummary. Not wired into those screens yet — that happens in
 * Phase 9 alongside the rest of the booking flow migration, at which point
 * their direct AsyncStorage reads/writes are replaced (not kept in
 * parallel), since this store owns a clean, unused key from day one.
 */
interface BookingState {
  transactionId: string | null;
  rooms: Room[];
  selectedPaymentMethodId: string | null;
  setTransactionId: (transactionId: string | null) => void;
  setRooms: (rooms: Room[]) => void;
  setSelectedPaymentMethodId: (paymentMethodId: string | null) => void;
  reset: () => void;
}

const initialState = {
  transactionId: null,
  rooms: [] as Room[],
  selectedPaymentMethodId: null,
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      ...initialState,
      setTransactionId: (transactionId) => set({ transactionId }),
      setRooms: (rooms) => set({ rooms }),
      setSelectedPaymentMethodId: (selectedPaymentMethodId) => set({ selectedPaymentMethodId }),
      reset: () => set(initialState),
    }),
    {
      name: "booking-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
