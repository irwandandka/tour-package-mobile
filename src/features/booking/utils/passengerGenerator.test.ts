import { generatePassengers } from "./passengerGenerator";
import { TransactionDetail } from "@shared/types";

function makeDetail(overrides: Partial<TransactionDetail>): TransactionDetail {
  return {
    id: "detail-1",
    product_detail_name: "Deluxe Room",
    product_detail_image: "",
    quantity_adult: 0,
    quantity_child: 0,
    quantity_infant: 0,
    quantity_senior: 0,
    sales_adult: 0,
    sales_child: 0,
    sales_infant: 0,
    sales_senior: 0,
    ...overrides,
  };
}

describe("generatePassengers", () => {
  it("returns an empty array for no transaction details", () => {
    expect(generatePassengers([])).toEqual([]);
  });

  it("returns an empty array when a detail has zero occupants", () => {
    const detail = makeDetail({});
    expect(generatePassengers([detail])).toEqual([]);
  });

  it("generates one blank passenger per occupant, ordered adult -> child -> infant -> senior", () => {
    const detail = makeDetail({
      quantity_adult: 2,
      quantity_child: 1,
      quantity_infant: 1,
      quantity_senior: 1,
    });

    const result = generatePassengers([detail]);

    expect(result).toHaveLength(5);
    expect(result.map((p) => p.type)).toEqual(["Adult", "Adult", "Child", "Infant", "Senior"]);
    result.forEach((passenger) => {
      expect(passenger).toMatchObject({
        roomName: "Deluxe Room",
        title: "",
        first_name: "",
        last_name: "",
      });
    });
  });

  it("groups passengers by room across multiple transaction details", () => {
    const details = [
      makeDetail({ product_detail_name: "Deluxe Room", quantity_adult: 2 }),
      makeDetail({ product_detail_name: "Standard Room", quantity_adult: 1, quantity_child: 1 }),
    ];

    const result = generatePassengers(details);

    expect(result).toHaveLength(4);
    expect(result.filter((p) => p.roomName === "Deluxe Room")).toHaveLength(2);
    expect(result.filter((p) => p.roomName === "Standard Room")).toHaveLength(2);
    // Second room's passengers still follow the adult -> child order internally.
    const standardRoomPassengers = result.filter((p) => p.roomName === "Standard Room");
    expect(standardRoomPassengers.map((p) => p.type)).toEqual(["Adult", "Child"]);
  });
});
