/**
 * Consolidates 5 divergent implementations found across
 * OrderDetail/OrderHistory (id-ID, currency: IDR, 0 decimals -> "Rp100.000")
 * and Product/TripOverview/PaymentMethod (en-US, 2 decimals, no currency
 * symbol, with the caller manually prefixing literal "IDR " text in JSX).
 * The id-ID/currency-symbol style is the canonical one: Rupiah isn't
 * conventionally shown with decimal subunits, and a real currency symbol
 * beats a hand-typed "IDR " prefix that risks drifting from the actual
 * currency (the app already supports switching currency via settingsStore).
 */
export function formatCurrency(amount: number, currency: string = "IDR"): string {
  const safeAmount = typeof amount === "number" && !Number.isNaN(amount) ? amount : 0;

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(safeAmount);
}
