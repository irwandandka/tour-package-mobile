import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import type { LocationObject } from "expo-location";

interface UseGeolocationResult {
  location: LocationObject | null;
  locationName: string;
}

/** Extracted from HomeScreen's mount effect: permission -> position -> reverse geocode. */
export function useGeolocation(): UseGeolocationResult {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [locationName, setLocationName] = useState("Loading...");

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          if (isActive) setLocationName("Permission Denied");
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        if (isActive) setLocation(currentLocation);

        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

        if (isActive && reverseGeocode.length > 0) {
          const { city, region, country } = reverseGeocode[0];
          setLocationName(`${city ?? region}, ${country}`);
        }
      })();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return { location, locationName };
}
