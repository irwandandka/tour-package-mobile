export type RootStackParamList = {
    Register: undefined;
    Login: undefined;
    Profile: { userId: string };
    Language: undefined;
    Home: undefined;
    OrderHistory: undefined;
    OrderDetail: { orderId: string };
    TermCondition: undefined;
    Favorite: undefined;
    Product: { slug: string };
    Landing: undefined;
    AvailableDate: { slug: string };
    TripOverview: { slug: string, dateFrom: string, dateTo: string };
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
    Auth: {
        screen: "Login" | "Register";
    };
    Main: undefined;
};