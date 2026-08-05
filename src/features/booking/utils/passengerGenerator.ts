import { Passenger, TransactionDetail } from "@shared/types";

/**
 * Extracted from PassengerDetailScreen's fetchTransaction effect: builds
 * one blank Passenger form entry per booked occupant, grouped by room
 * (transaction_detail) and ordered adult -> child -> infant -> senior
 * within each room, matching TripOverview's pricing category order.
 */
export function generatePassengers(transactionDetails: TransactionDetail[]): Passenger[] {
  const passengers: Passenger[] = [];

  transactionDetails.forEach((detail) => {
    const counts: { type: Passenger["type"]; count: number }[] = [
      { type: "Adult", count: detail.quantity_adult },
      { type: "Child", count: detail.quantity_child },
      { type: "Infant", count: detail.quantity_infant },
      { type: "Senior", count: detail.quantity_senior },
    ];

    counts.forEach(({ type, count }) => {
      for (let i = 0; i < count; i++) {
        passengers.push({
          roomName: detail.product_detail_name,
          type,
          title: "",
          first_name: "",
          last_name: "",
        });
      }
    });
  });

  return passengers;
}
