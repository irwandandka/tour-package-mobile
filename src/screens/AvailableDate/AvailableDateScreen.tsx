import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import styles from "./AvailableDateScreen.styles";
import FeatherIcon from "react-native-vector-icons/Feather";
import DropDownPicker from 'react-native-dropdown-picker';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/param";
import { useNavigation } from "@react-navigation/native";
import apiService from "../../services/apiService";
import { RouteProp, useRoute } from '@react-navigation/native';

type AvailableDateNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AvailableDate"
>;

type AvailableDateRouteProp = RouteProp<RootStackParamList, "AvailableDate">;

export default function AvailableDateScreen() {
    const navigation = useNavigation<AvailableDateNavigationProp>();
    const route = useRoute<AvailableDateRouteProp>();

    const { slug } = route.params;

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(null); // selected period ID

    type AvailablePeriod = {
        label: string;
        value: string;
    }
    const [availablePeriods, setAvailablePeriods] = useState<AvailablePeriod[]>([]);

    type AvailableDate = {
        id: number;
        date_start: string;
        date_end: string;
        date_start_iso: string;
        date_end_iso: string;
        price: string;
        allotment?: number;
    }

    const [availableDates, setAvailableDates] = useState<AvailableDate[]>([]);

    useEffect(() => {
        const fetchAvailablePeriod = async () => {
            try {
                const response = await apiService.get(`v1/product/${slug}/available-period`, {
                    params: {
                        lang: 'EN',
                        currency: 'SGD',
                    }
                });

                const periods = response?.data ?? [];

                const formattedPeriods: AvailablePeriod[] = periods.map((item: any) => ({
                    label: item.name,
                    value: item.id,
                }));

                setAvailablePeriods(formattedPeriods);
            } catch (error) {
                console.error("Error fetching available periods:", error);
            }
        }

        fetchAvailablePeriod()
        
        const fetchAvailableDates = async () => {
            if (!value || !slug) return;

            try {
                const response = await apiService.get(`v1/product/${slug}/available-date`, {
                    params: {
                        period: value,
                        lang: 'EN',
                        currency: 'SGD',
                    }
                });

                setAvailableDates(response?.data ?? []);
            } catch (error) {
                console.error("Failed to fetch available dates:", error);
            }
        };

        fetchAvailableDates();
    }, [value]);

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedIndex(prev => (prev === index ? null : index));
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={[styles.container, { backgroundColor: '#fff' }]}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <FeatherIcon name="chevron-left" size={27} color={"#FFFFFF"} />
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        Available Dates
                    </Text>
                    <Text style={styles.subtitle}>
                        2D1N Bangkok Tour
                    </Text>
                </View>
                <View style={styles.selectMonthContainer}>
                    <Text style={styles.selectMonthText}>
                        Select Month: 
                    </Text>
                    <View style={{ flex: 1, zIndex: 1000 }}>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={availablePeriods}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setAvailablePeriods}
                            placeholder="Please select a month"
                            style={styles.selectMonthInput}
                            dropDownContainerStyle={{ zIndex: 1000 }}
                        />
                    </View>
                </View>

                <ScrollView
                nestedScrollEnabled={true}
                horizontal={false}
                showsVerticalScrollIndicator={false}>
                    <View style={styles.availableDateContainer}>
                        <View style={styles.availableDateHeader}>
                            <View style={styles.headerCol}>
                                <Text style={styles.availableDateHeaderText}>Departure</Text>
                            </View>
                            <View style={styles.headerCol}>
                                <Text style={styles.availableDateHeaderText}>Return</Text>
                            </View>
                            <View style={styles.headerCol}>
                                <Text style={styles.availableDateHeaderText}>Price</Text>
                            </View>
                        </View>
                        { availableDates.map((availableDate, index) => (
                            <View style={styles.availableDateList} key={index}>
                                <TouchableOpacity
                                    onPress={() => toggleExpand(index)}>
                                    <View style={ expandedIndex === index ? styles.insideContainerActive : styles.insideContainer }>
                                        <View style={styles.headerCol}>
                                            <View style={styles.availableDateTextWrapper}>
                                                <Text style={styles.insideText}>
                                                    { availableDate.date_start }
                                                </Text>
                                                <Text style={styles.availableDateHeaderTextDay}>
                                                    { availableDate.date_start_iso }
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.headerCol}>
                                            <View style={styles.availableDateTextWrapper}>
                                                <Text style={styles.insideText}>
                                                    { availableDate.date_end }
                                                </Text>
                                                <Text style={styles.availableDateHeaderTextDay}>
                                                    { availableDate.date_end_iso }
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.headerCol}>
                                            <Text style={styles.insideText}>
                                                { availableDate.price }
                                            </Text>
                                        </View>
                                        <View style={{ width: '19%' }}>
                                            <FeatherIcon
                                                name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
                                                style={{ right: 13 }}
                                                size={23}
                                                color={"#000000"}
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                {expandedIndex === index && (
                                    <View style={styles.listExpandContainer}>
                                        <View style={styles.listExpand}>
                                            <View style={styles.listExpandLeftSide}>
                                                <Text style={styles.listExpandText}>
                                                    2D1N Bangkok Tour
                                                </Text>
                                                {/* Date Start */}
                                                <View style={styles.groupDate}>
                                                    <Text style={styles.groupDateText}>
                                                        Start
                                                    </Text>
                                                    <View style={styles.groupDateTextWrapper}>
                                                        <Text style={styles.groupDateTextDate}>
                                                            { availableDate.date_start }
                                                        </Text>
                                                        <Text style={styles.groupDateTextDay}>
                                                            { availableDate.date_start_iso }
                                                        </Text>
                                                    </View>
                                                </View>
                                                {/* Date End */}
                                                <View style={styles.groupDate}>
                                                    <Text style={styles.groupDateText}>
                                                        End
                                                    </Text>
                                                    <View style={styles.groupDateTextWrapper}>
                                                        <Text style={styles.groupDateTextDate}>
                                                            { availableDate.date_end }
                                                        </Text>
                                                        <Text style={styles.groupDateTextDay}>
                                                            { availableDate.date_end_iso }
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.listExpandRightSide}>
                                                <View style={styles.groupPrice}>
                                                    <Text style={styles.groupPriceCaption}>
                                                        Price Per Person
                                                    </Text>
                                                    <Text style={styles.groupPriceText}>
                                                        { availableDate.price }
                                                    </Text>
                                                </View>
                                                <View style={styles.groupButtons}>
                                                    <TouchableOpacity 
                                                        style={styles.buttonEasyQuote}>
                                                        <Text style={styles.easyQuoteText}>
                                                            Easy Quotes
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={styles.buttonBookNow}
                                                        onPress={() => navigation.navigate('TripOverview', {
                                                            slug: slug,
                                                            dateFrom: availableDate.date_start_iso,
                                                            dateTo: availableDate.date_end_iso,
                                                        })}>
                                                        <Text style={styles.bookNowText}>
                                                            Book Now
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <Text style={styles.callUsText}>
                                            Call us on +65 6438 2811 or speak to our travel agent
                                        </Text>
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}