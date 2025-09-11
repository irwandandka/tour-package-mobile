export type RootStackParamList = {
    Register: undefined;
    Login: undefined;
    Profile: { userId: string };
    Language: undefined;
    Home: undefined;
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
    Auth: {
        screen: "Login" | "Register";
    };
    Main: undefined;
};