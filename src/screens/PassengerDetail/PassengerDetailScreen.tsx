import React, { useEffect } from "react";

// Hooks
import { useState } from "react";
import { 
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Input Select
import DropDownPicker from "react-native-dropdown-picker";

// Styles
import styles from './PassengerDetailScreen.styles';

// Services
import apiService from "../../services/apiService";

// Navigation
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/param";
import { RouteProp, useRoute } from "@react-navigation/native";

// Icons
import FeatherIcon from "react-native-vector-icons/Feather";
import IonIcon from "react-native-vector-icons/Ionicons";

// 
import Toast from "react-native-toast-message";

// Interfaces for types
import { Country, City, Passenger, ProductDetail, Transaction, TransactionDetail } from "../../types/api";

// Types for navigation and route
type PassengerDetailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PassengerDetail"
>;
type PassengerDetailRouteProp = RouteProp<RootStackParamList, "PassengerDetail">;

export default function PassengerDetailScreen() {
    const navigation = useNavigation<PassengerDetailNavigationProp>();
    const route = useRoute<PassengerDetailRouteProp>();

    const { slug, dateFrom, dateTo, transactionId } = route.params;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState<number | null>(null);
    const [value, setValue] = useState(false || null);
    const [items, setItems] = useState([
        { label: "Mr", value: "Mr" },
        { label: "Mrs", value: "Mrs" },
    ]);

    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [transaction, setTransaction] = useState<Transaction | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const responseProduct = await apiService.get(`v1/product/${slug}`, {
                    params: {
                        lang: 'EN',
                        currency: 'SGD',
                    }
                });

                setProduct(responseProduct.data);
            } catch (error) {
                console.error('Failed to fetch product details', error);
            }
        }

        fetchProduct();

        const fetchTransaction = async () => {
            try {
                const responseTransaction = await apiService.get(`v1/booking/${transactionId}`, {
                    params: {
                        lang: 'EN',
                        currency: 'SGD',
                    }
                });

                setTransaction(responseTransaction.data);

                const transaction = responseTransaction.data;
                const generated: Passenger[] = [];

                transaction.transaction_details.forEach((detail: TransactionDetail) => {
                for (let i = 0; i < detail.quantity_adult; i++) {
                    generated.push({
                    roomName: detail.product_detail_name,
                    type: "Adult",
                    title: "",
                    first_name: "",
                    last_name: "",
                    });
                }
                for (let i = 0; i < detail.quantity_child; i++) {
                    generated.push({
                    roomName: detail.product_detail_name,
                    type: "Child",
                    title: "",
                    first_name: "",
                    last_name: "",
                    });
                }
                for (let i = 0; i < detail.quantity_infant; i++) {
                    generated.push({
                    roomName: detail.product_detail_name,
                    type: "Infant",
                    title: "",
                    first_name: "",
                    last_name: "",
                    });
                }
                for (let i = 0; i < detail.quantity_senior; i++) {
                    generated.push({
                    roomName: detail.product_detail_name,
                    type: "Senior",
                    title: "",
                    first_name: "",
                    last_name: "",
                    });
                }
                });

                setPassengers(generated);
            } catch (error: any) {
                if (error.response) {
                    console.error("Data:", error.response.data);
                }
            }
        };

        fetchTransaction();
    }, [transactionId]);

    // Combosource for countries
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);

    const fetchCountries = async () => {
        setLoading(true);
        try {
            const res = await apiService.get('v1/country/list');
            setCountries(res.data);
        } catch (e) {
            console.error('Failed to load countries', e);
        }
        setLoading(false);
    };

    // Combosource for cities
    const [cities, setCities] = useState<City[]>([]);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [showCityDropdown, setShowCityDropdown] = useState(false);

    const fetchCities = async (country: string) => {
        setLoading(true);
        try {
            const res = await apiService.get('v1/city/list', {
                params: {
                    country: country,
                },
            });
            setCities(res.data);
        } catch (e) {
            console.error('Failed to load cities', e);
        }
        setLoading(false);
    };

    const handleOpenDropdown = async (type: string) => {
        if (type === 'country') {
            await fetchCountries();

            setShowCountryDropdown(!showCountryDropdown);
            setShowCityDropdown(false);
        } else if (type === 'city' && selectedCountry) {
            await fetchCities(selectedCountry.id);

            setShowCityDropdown(!showCityDropdown);
            setShowCountryDropdown(false);
        }
    };

    const [passengers, setPassengers] = useState<Passenger[]>([
        { title: "", first_name: "", last_name: "" },
    ]);

    const handleInputChange = (
        index: number,
        field: keyof Passenger,
        value: string
    ) => {
        setPassengers((prev) => {
            const updated = [...prev];
            updated[index] = {
            ...updated[index],
            [field]: value,
            };
            return updated;
        });
    };

    const savePassengerDetails = async () => {
        try {
            const body = {
                name: firstName,
                phone: phoneNumber,
                email: email,
                country: selectedCountry?.id || null,
                city: selectedCity?.id || null,
                address: address,
                postal_code: postalCode,
                passengers: passengers,
            }

            const response = await apiService.post(`v1/booking/${transactionId}/update`, body);

            Toast.show({
                type: "success",
                text1: "Passenger Details Saved",
                text2: "Your passenger details have been successfully saved.",
            });

            console.log('Hasil Update Passenger', response.data);
            setTimeout(() => {
                navigation.navigate("PaymentMethod", {
                    transactionId: transactionId,
                });
            }, 2000);
        } catch (error) {
            console.error('Failed to save passenger details', error);
        }
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.headerSection}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <FeatherIcon name="chevron-left" size={27} color={"#FFFFFF"} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Passenger Detail</Text>
                        <View style={styles.card}>
                            <View style={styles.cardTopSide}>
                                <Image
                                    source={{
                                        uri: product?.image,
                                    }}
                                    style={styles.cardImage}
                                />
                            </View>
                            <View style={styles.cardBottomSide}>
                                <View style={styles.cardTitleWrapper}>
                                    <Text style={styles.cardTitle}>{ product?.name }</Text>
                                    <View style={styles.cardRatingWrapper}>
                                        <IonIcon
                                            name="star"
                                            style={styles.cardStarIcon}
                                            size={21}
                                            color={"#F29D38"}
                                        />
                                        <IonIcon
                                            name="star"
                                            style={styles.cardStarIcon}
                                            size={21}
                                            color={"#F29D38"}
                                        />
                                        <IonIcon
                                            name="star"
                                            style={styles.cardStarIcon}
                                            size={21}
                                            color={"#F29D38"}
                                        />
                                        <IonIcon
                                            name="star"
                                            style={styles.cardStarIcon}
                                            size={21}
                                            color={"#F29D38"}
                                        />
                                        <IonIcon
                                            name="star-half"
                                            style={styles.cardStarIcon}
                                            size={21}
                                            color={"#F29D38"}
                                        />
                                        <Text style={styles.cardStarRating}>{product?.rating}</Text>
                                    </View>

                                    <Text style={styles.textNights}>{product?.duration}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* End Header */}

                    {/* Contact Information */}
                    <Text style={styles.contactInformationTitle}>
                        Contact Person (Person responsible for booking)
                    </Text>
                    <View style={styles.contactInformationCard}>
                        {/* Input First Name */}
                        <View style={styles.contactInformationWrapper}>
                            <Text style={styles.inputLabel}>
                                First Name
                            </Text>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Enter your first name"
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                        </View>

                        {/* Input Last Name */}
                        <View style={styles.contactInformationWrapper}>
                            <Text style={styles.inputLabel}>
                                Last Name
                            </Text>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Enter your last name"
                                value={lastName}
                                onChangeText={setLastName}
                            />
                        </View>

                        <Text style={styles.groupLabel}>
                            Contact Details
                        </Text>

                        {/* Input Phone Number */}
                        <View style={styles.contactInformationWrapper}>
                            <Text style={styles.inputLabel}>
                                Phone Number
                            </Text>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Enter your phone number"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                keyboardType="phone-pad"
                            />
                        </View>


                        {/* Input Email */}
                        <View style={styles.contactInformationWrapper}>
                            <Text style={styles.inputLabel}>
                                Email Address
                            </Text>
                            <TextInput
                                style={styles.inputText}
                                placeholder="example@example.com"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                            />
                        </View>

                        <Text style={styles.groupLabel}>
                            Personal Details
                        </Text>

                        {/* Input Country */}
                        <View style={styles.contactInformationWrapper}>
                            <Text style={styles.inputLabel}>
                                Country
                            </Text>
                            <TouchableOpacity onPress={() => handleOpenDropdown('country')}>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        borderRadius: 5,
                                        padding: 10,
                                        marginBottom: 12,
                                    }}
                                >
                                    <Text>{selectedCountry?.name || 'Select a country'}</Text>
                                </View>
                            </TouchableOpacity>

                            {loading && <ActivityIndicator size="small" color="gray" style={{ marginTop: 10 }} />}

                            {showCountryDropdown && (
                                <ScrollView
                                    style={{
                                    maxHeight: 200,
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    marginTop: 5,
                                    backgroundColor: 'white',
                                    }}
                                >
                                    {countries.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            setSelectedCountry(item);
                                            setShowCountryDropdown(false);
                                        }}
                                        style={{
                                        padding: 10,
                                        borderBottomWidth: 1,
                                        borderColor: '#eee',
                                        }}
                                    >
                                        <Text>{item.name}</Text>
                                    </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            )}
                        </View>

                        {/* Input City */}
                        <View style={styles.contactInformationWrapper}>
                            <Text style={styles.inputLabel}>
                                City
                            </Text>
                            <TouchableOpacity onPress={() => handleOpenDropdown('city')}>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        borderRadius: 5,
                                        padding: 10,
                                        marginBottom: 12,
                                    }}
                                >
                                    <Text>{selectedCity?.name || 'Select a city'}</Text>
                                </View>
                            </TouchableOpacity>

                            {loading && <ActivityIndicator size="small" color="gray" style={{ marginTop: 10 }} />}

                            {showCityDropdown && (
                                <ScrollView
                                    style={{
                                    maxHeight: 200,
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    marginTop: 5,
                                    backgroundColor: 'white',
                                    }}
                                >
                                    {cities.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            setSelectedCity(item);
                                            setShowCityDropdown(false);
                                        }}
                                        style={{
                                        padding: 10,
                                        borderBottomWidth: 1,
                                        borderColor: '#eee',
                                        }}
                                    >
                                        <Text>{item.name}</Text>
                                    </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            )}
                        </View>

                        {/* Input Address */}
                        <View style={styles.contactInformationWrapper}>
                            <Text style={styles.inputLabel}>
                                Address
                            </Text>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Enter your address"
                                value={address}
                                onChangeText={setAddress}
                            />
                        </View>

                        {/* Input Postal Code */}
                        <View style={styles.contactInformationWrapper}>
                            <Text style={styles.inputLabel}>
                                Postal Code
                            </Text>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Enter your postal code"
                                value={postalCode}
                                onChangeText={setPostalCode}
                            />
                        </View>

                    </View>
                    {/* End Contact Information */}

                    {/* Passenger Detail */}
                    <View style={styles.groupParentPassenger}>
                    {[...new Set(passengers.map((p) => p.roomName))].map((room, rIndex) => (
                        <View key={rIndex} style={{ marginBottom: 30 }}>
                        {/* Room Name */}
                        <Text style={styles.roomDetailName}>{room}</Text>

                        {passengers
                            .filter((p) => p.roomName === room)
                            .map((p, index) => (
                                <View key={index} style={{ marginBottom: 10 }}>
                                    <Text style={styles.passengerTitleCount}>
                                        Passenger {index + 1} ({p.type})
                                    </Text>

                                    <View style={styles.groupInputPassenger}>
                                        {/* Title */}
                                        <View style={styles.contactInformationWrapper}>
                                            <Text style={styles.inputLabel}>Title</Text>
                                            <DropDownPicker
                                                open={open === index}   // cuma dropdown yang index-nya sama yang kebuka
                                                value={p.title}
                                                items={items}
                                                setOpen={() => setOpen(open === index ? null : index)} // toggle open berdasarkan index
                                                setValue={(callback) => {
                                                    const newValue = callback(p.title);
                                                    handleInputChange(
                                                    passengers.findIndex((pp) => pp === p),
                                                    "title",
                                                    newValue
                                                    );
                                                }}
                                                setItems={setItems}
                                                placeholder="Select Title"
                                                style={styles.inputText}
                                                listMode="SCROLLVIEW"
                                                dropDownContainerStyle={{ borderColor: "#ccc" }}
                                            />
                                        </View>

                                        {/* First Name */}
                                        <View style={styles.contactInformationWrapper}>
                                            <Text style={styles.inputLabel}>First Name</Text>
                                            <TextInput
                                                style={styles.inputText}
                                                placeholder="Enter your first name"
                                                value={p.first_name}
                                                onChangeText={(text) =>
                                                    handleInputChange(
                                                        passengers.findIndex((pp) => pp === p),
                                                        "first_name",
                                                        text
                                                    )
                                                }
                                            />
                                        </View>

                                        {/* Last Name */}
                                        <View style={styles.contactInformationWrapper}>
                                            <Text style={styles.inputLabel}>Last Name</Text>
                                            <TextInput
                                                style={styles.inputText}
                                                placeholder="Enter your last name"
                                                value={p.last_name}
                                                onChangeText={(text) =>
                                                    handleInputChange(
                                                        passengers.findIndex((pp) => pp === p),
                                                        "last_name",
                                                        text
                                                    )
                                                }
                                            />
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ))}
                    </View>
                    {/* End Passenger Detail */}

                    <View>
                        <TouchableOpacity
                            onPress={savePassengerDetails}
                            style={styles.continueButton}
                        >
                            <Text style={styles.continueButtonText}>Continue Passenger Detail</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}