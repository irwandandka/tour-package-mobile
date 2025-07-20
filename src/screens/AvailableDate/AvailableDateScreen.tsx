import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import styles from "./AvailableDateScreen.styles";
import FeatherIcon from "react-native-vector-icons/Feather";
import DropDownPicker from 'react-native-dropdown-picker';

export default function AvailableDateScreen({ navigation }: any) {
    const [selectedValue, setSelectedValue] = useState('');

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    const [periods, setPeriods] = useState([
        { label: '2025 May', value: '202505' },
        { label: '2025 June', value: '202506' },
        { label: '2025 July', value: '202507' },
        { label: '2025 August', value: '202508' },
    ]);

    const [availableDates, setAvailableDates] = useState([
        { 
            id: 1,
            dateFrom: 'May 20, 2025',
            dayFrom: 'Tuesday',
            dateTo: 'May 22, 2025',
            dayTo: 'Thursday',
            price: 'S$ 290 SGD',
        },
        { 
            id: 2,
            dateFrom: 'May 21, 2025',
            dayFrom: 'Wednesday',
            dateTo: 'May 23, 2025',
            dayTo: 'Friday',
            price: 'S$ 290 SGD',
        },
        { 
            id: 3,
            dateFrom: 'May 22, 2025',
            dayFrom: 'Thursday',
            dateTo: 'May 24, 2025',
            dayTo: 'Saturday',
            price: 'S$ 290 SGD',
        },
    ]);

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedIndex(prev => (prev === index ? null : index));
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={[styles.container, { backgroundColor: '#fff' }]}>
                <View style={styles.titleContainer}>
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
                            items={periods}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setPeriods}
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
                                                    { availableDate.dateFrom }
                                                </Text>
                                                <Text style={styles.availableDateHeaderTextDay}>
                                                    { availableDate.dayFrom }
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.headerCol}>
                                            <View style={styles.availableDateTextWrapper}>
                                                <Text style={styles.insideText}>
                                                    { availableDate.dateTo }
                                                </Text>
                                                <Text style={styles.availableDateHeaderTextDay}>
                                                    { availableDate.dayTo }
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
                                                            { availableDate.dateFrom }
                                                        </Text>
                                                        <Text style={styles.groupDateTextDay}>
                                                            { availableDate.dayFrom }
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
                                                            { availableDate.dateTo }
                                                        </Text>
                                                        <Text style={styles.groupDateTextDay}>
                                                            { availableDate.dayTo }
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
                                                        onPress={() => navigation.navigate('TripOverview')}>
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