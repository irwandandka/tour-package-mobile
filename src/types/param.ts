export type RootStackParamList = {
    Register: undefined;
    Login: undefined;
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
    Auth: undefined;
    Main: undefined;
};