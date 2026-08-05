/**
 * Consolidates src/types/param.ts (still a compatibility shim re-exporting
 * from here — see below) into per-area param lists composed into one
 * RootStackParamList, and finally types AuthStackParamList (the auth
 * navigator used a bare createXNavigator() with no generic before).
 *
 * Deliberately still a FLAT root stack, not nested per-feature navigators
 * (e.g. a BookingStackParamList for TripOverview -> ... -> OrderStatus).
 * Nesting that flow is Phase 9 work, done alongside actually moving those
 * screens and re-verifying their navigation calls together — restructuring
 * navigator nesting now, without an interactive simulator available to
 * click through the flow, risks a runtime navigation bug that typecheck/
 * lint/test/bundle-export can't catch.
 */

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type RootStackParamList = {
  Landing: undefined;
  Home: undefined;
  Product: { slug: string };
  AvailableDate: { slug: string };
  TripOverview: { slug: string; dateFrom: string; dateTo: string };
  PassengerDetail: {
    slug: string;
    dateFrom: string;
    dateTo: string;
    transactionId: string;
  };
  PaymentMethod: {
    transactionId: string;
  };
  PaymentSummary: {
    transactionId: string;
    paymentMethodId: string;
  };
  PaymentQr: {
    qrData: string;
    transaction: {
      id: string;
      total_amount: number | string;
    } | null;
  };
  OrderStatus: { transactionId: string };
  OrderHistory: undefined;
  OrderDetail: { orderId: string };
  Profile: { userId: string };
  Language: undefined;
  TermCondition: undefined;
  Auth: {
    screen: keyof AuthStackParamList;
  };
};
