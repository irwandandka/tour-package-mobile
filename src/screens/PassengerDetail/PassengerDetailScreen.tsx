import React from "react";
import { useState } from "react";
import { 
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    FlatList,
    ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from './PassengerDetailScreen.styles';
import IonIcon from "react-native-vector-icons/Ionicons";

export default function PassengerDetailScreen() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');

    // Combosource for countries
    const [countries, setCountries] = useState<string[]>([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchCountries = async () => {
        setLoading(true);
        try {
            const res = await fetch('https://restcountries.com/v3.1/all'); // contoh API
            const json = await res.json();
            const countryNames = json.map((item: any) => item.name.common);
            setCountries(countryNames.sort()); // diurutkan biar rapi
        } catch (e) {
            console.error('Failed to load countries', e);
        }
        setLoading(false);
    };

    // Combosource for cities
    const [cities, setCities] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState('');

    const fetchCities = async (country: string) => {
        setLoading(true);
        try {
            const res = await fetch(`https://api.example.com/cities?country=${country}`);
            const json = await res.json();
            const cityNames = json.map((item: any) => item.name);
            setCities(cityNames.sort());
        } catch (e) {
            console.error('Failed to load cities', e);
        }
        setLoading(false);
    };

    const handleOpenDropdown = async () => {
        if (countries.length === 0) {
            await fetchCountries();
        }
        setShowDropdown(!showDropdown);
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.headerSection}>
                        <Text style={styles.headerTitle}>Trip Overview</Text>
                        <View style={styles.card}>
                            <View style={styles.cardTopSide}>
                                <Image
                                    source={{
                                        uri: "https://pub-cfc04ba1c45649688f85c3bdd738f319.r2.dev/bangkok-tour-1.png",
                                    }}
                                    style={styles.cardImage}
                                />
                            </View>
                            <View style={styles.cardBottomSide}>
                                <View style={styles.cardTitleWrapper}>
                                    <Text style={styles.cardTitle}>2D1N Bangkok Tour</Text>
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
                                        <Text style={styles.cardStarRating}>4.8</Text>
                                    </View>

                                    <Text style={styles.textNights}>2 Days 1 Night</Text>
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
                            <TouchableOpacity onPress={handleOpenDropdown}>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        borderRadius: 5,
                                        padding: 10,
                                    }}
                                >
                                    <Text>{selectedCountry || 'Select a country'}</Text>
                                </View>
                            </TouchableOpacity>

                            {loading && <ActivityIndicator size="small" color="gray" style={{ marginTop: 10 }} />}

                            {showDropdown && (
                                <FlatList
                                    style={{
                                        maxHeight: 200,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        marginTop: 5,
                                        backgroundColor: 'white',
                                    }}
                                    data={countries}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setSelectedCountry(item);
                                                setShowDropdown(false);
                                            }}
                                            style={{
                                                padding: 10,
                                                borderBottomWidth: 1,
                                                borderColor: '#eee',
                                            }}
                                        >
                                            <Text>{item}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            )}
                        </View>

                        {/* Input City */}
                        <View style={styles.contactInformationWrapper}>
                            <Text style={styles.inputLabel}>
                                City
                            </Text>
                            <TouchableOpacity onPress={handleOpenDropdown}>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        borderRadius: 5,
                                        padding: 10,
                                    }}
                                >
                                    <Text>{selectedCity || 'Select a city'}</Text>
                                </View>
                            </TouchableOpacity>

                            {loading && <ActivityIndicator size="small" color="gray" style={{ marginTop: 10 }} />}

                            {showDropdown && (
                                <FlatList
                                    style={{
                                        maxHeight: 200,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        marginTop: 5,
                                        backgroundColor: 'white',
                                    }}
                                    data={countries}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setSelectedCountry(item);
                                                setShowDropdown(false);
                                            }}
                                            style={{
                                                padding: 10,
                                                borderBottomWidth: 1,
                                                borderColor: '#eee',
                                            }}
                                        >
                                            <Text>{item}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
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
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}