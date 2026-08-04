import { calculateRoomPriceBreakdown } from "./pricingCalculator";
import { RoomType } from "@shared/types";

function makeRoomType(pricing: RoomType["pricing"]): RoomType {
  return {
    id: "room-1",
    name: "Deluxe Room",
    image: "",
    min_adult: 1,
    max_adult: 4,
    max_pax: 4,
    allotment: 5,
    pricing,
  };
}

describe("calculateRoomPriceBreakdown", () => {
  it("returns all zeros for an empty order", () => {
    const roomType = makeRoomType([
      { level: 1, adult: 100000, child: 80000, infant: 20000, senior: 90000 },
    ]);

    const result = calculateRoomPriceBreakdown(roomType, {
      adult: 0,
      child: 0,
      infant: 0,
      senior: 0,
    });

    expect(result).toEqual({ adult: 0, child: 0, infant: 0, senior: 0, total: 0 });
  });

  it("prices a single adult at level 1", () => {
    const roomType = makeRoomType([
      { level: 1, adult: 100000, child: 80000, infant: 20000, senior: 90000 },
    ]);

    const result = calculateRoomPriceBreakdown(roomType, {
      adult: 1,
      child: 0,
      infant: 0,
      senior: 0,
    });

    expect(result).toEqual({ adult: 100000, child: 0, infant: 0, senior: 0, total: 100000 });
  });

  it("assigns occupant level across categories in adult -> child -> infant -> senior order, not per-category", () => {
    const roomType = makeRoomType([
      { level: 1, adult: 100000, child: 80000, infant: 20000, senior: 90000 },
      { level: 2, adult: 95000, child: 75000, infant: 20000, senior: 85000 },
      { level: 3, adult: 90000, child: 70000, infant: 20000, senior: 80000 },
    ]);

    // 2 adults consume levels 1 and 2; the 1 child then gets level 3's
    // child price (70000), not level 1's (80000).
    const result = calculateRoomPriceBreakdown(roomType, {
      adult: 2,
      child: 1,
      infant: 0,
      senior: 0,
    });

    expect(result).toEqual({
      adult: 195000, // 100000 + 95000
      child: 70000, // level 3's child price, not level 1's
      infant: 0,
      senior: 0,
      total: 265000,
    });
  });

  it("prices age tiers (infant, senior) correctly at their assigned level", () => {
    const roomType = makeRoomType([
      { level: 1, adult: 100000, child: 80000, infant: 20000, senior: 90000 },
      { level: 2, adult: 95000, child: 75000, infant: 20000, senior: 85000 },
    ]);

    const result = calculateRoomPriceBreakdown(roomType, {
      adult: 0,
      child: 0,
      infant: 1,
      senior: 1,
    });

    // infant is processed before senior (category order), so infant
    // gets level 1's infant price and senior gets level 2's senior price.
    expect(result).toEqual({ adult: 0, child: 0, infant: 20000, senior: 85000, total: 105000 });
  });

  it("contributes 0 for an occupant when no pricing row exists for their level", () => {
    const roomType = makeRoomType([
      { level: 1, adult: 100000, child: 80000, infant: 20000, senior: 90000 },
      { level: 2, adult: 95000, child: 75000, infant: 20000, senior: 85000 },
    ]);

    // 3rd adult has no level-3 pricing row.
    const result = calculateRoomPriceBreakdown(roomType, {
      adult: 3,
      child: 0,
      infant: 0,
      senior: 0,
    });

    expect(result).toEqual({ adult: 195000, child: 0, infant: 0, senior: 0, total: 195000 });
  });

  it("regression: a missing level 'sticks' and zeroes every occupant after it, across categories (documents existing behavior, not necessarily correct business behavior)", () => {
    // Only level 1 pricing exists.
    const roomType = makeRoomType([
      { level: 1, adult: 100000, child: 80000, infant: 20000, senior: 90000 },
    ]);

    // 1 adult consumes level 1. The 2 children then need levels 2 and 3,
    // neither of which exist — `level` never advances past 2 because the
    // loop's `continue` skips the increment, so both children are priced
    // against the same missing level 2 and contribute nothing.
    const result = calculateRoomPriceBreakdown(roomType, {
      adult: 1,
      child: 2,
      infant: 0,
      senior: 0,
    });

    expect(result).toEqual({ adult: 100000, child: 0, infant: 0, senior: 0, total: 100000 });
  });

  it("handles a room type with no pricing rows at all", () => {
    const roomType = makeRoomType([]);

    const result = calculateRoomPriceBreakdown(roomType, {
      adult: 2,
      child: 1,
      infant: 0,
      senior: 0,
    });

    expect(result).toEqual({ adult: 0, child: 0, infant: 0, senior: 0, total: 0 });
  });
});
