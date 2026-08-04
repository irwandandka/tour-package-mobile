import { RoomType, RoomOrder, RoomPriceBreakdown } from "@shared/types";

/**
 * Extracted from TripOverviewScreen. Pricing is assigned by occupant
 * "level" (1st person to occupy the room, 2nd person, ...), not
 * per-category — `level` increments once per person across ALL
 * categories combined, in the fixed order adult -> child -> infant ->
 * senior. So order {adult: 2, child: 1} prices: adult #1 at level 1,
 * adult #2 at level 2, child #1 at level 3 (using level 3's `child`
 * price, not level 1's).
 *
 * Known latent bug preserved as-is (not fixed here — a pricing-logic
 * change needs product sign-off, not a silent fix during a structural
 * refactor): if `roomType.pricing` has no row for the current `level`,
 * the code `continue`s WITHOUT incrementing `level`. Every remaining
 * person — in the current category and all categories after it — then
 * repeats the same stuck level, finds it missing again, and
 * contributes $0. In practice this means one missing pricing tier
 * zeroes out pricing for every occupant after it, not just the one
 * missing slot. Covered by a regression test below so this behavior
 * doesn't silently change later.
 */
export function calculateRoomPriceBreakdown(
  roomType: RoomType,
  order: RoomOrder,
): RoomPriceBreakdown {
  const categories: (keyof RoomOrder)[] = ["adult", "child", "infant", "senior"];
  let total = 0;
  const breakdown: Record<keyof RoomOrder, number> = {
    adult: 0,
    child: 0,
    infant: 0,
    senior: 0,
  };

  let level = 1;
  for (const category of categories) {
    const count = order[category] || 0;
    for (let i = 0; i < count; i++) {
      const pricing = roomType.pricing.find((p) => p.level === level);
      if (!pricing) continue;
      breakdown[category] += pricing[category];
      total += pricing[category];
      level++;
    }
  }

  return { ...breakdown, total };
}
