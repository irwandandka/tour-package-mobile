import { formatCurrency } from "./formatCurrency";

// Intl.NumberFormat inserts a non-breaking space ( ) between the
// currency symbol and the amount, not a regular space — easy to miss since
// the two render identically.
const NBSP = " ";

describe("formatCurrency", () => {
  it("formats a whole IDR amount with no decimals", () => {
    expect(formatCurrency(100000)).toBe(`Rp${NBSP}100.000`);
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toBe(`Rp${NBSP}0`);
  });

  it("falls back to 0 for non-number input", () => {
    // @ts-expect-error deliberately passing an invalid type to mirror
    // real call sites that used to pass unchecked API values
    expect(formatCurrency("not a number")).toBe(`Rp${NBSP}0`);
  });

  it("falls back to 0 for NaN", () => {
    expect(formatCurrency(NaN)).toBe(`Rp${NBSP}0`);
  });

  it("supports a different currency code", () => {
    expect(formatCurrency(50, "USD")).toBe("US$50");
  });
});
