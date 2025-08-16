export type RootStackParamList = {
    Register: undefined;
    Login: undefined;
    Home: undefined;
    Product: { slug: string };
    Landing: undefined;
    AvailableDate: { slug: string };
    TripOverview: { slug: string, dateFrom: string, dateTo: string };
    Auth: undefined;
    Main: undefined;
};