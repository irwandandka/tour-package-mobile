import { useCallback, useState } from "react";
import { apiService, ApiResponse } from "@shared/api";
import { Country, City } from "@shared/types";

/**
 * Consolidates the near-verbatim duplicated country/city dropdown logic
 * found in PassengerDetailScreen and ProfileScreen. Fixes a real bug present
 * in both: selecting a new country never cleared a previously selected city,
 * so a stale city from the old country could stay selected.
 *
 * Not wired into either screen yet — that happens in Phase 9
 * (PassengerDetail) and Phase 11 (Profile).
 */
export interface UseCountryCityResult {
  countries: Country[];
  cities: City[];
  selectedCountry: Country | null;
  selectedCity: City | null;
  isLoadingCountries: boolean;
  isLoadingCities: boolean;
  isCountryPickerOpen: boolean;
  isCityPickerOpen: boolean;
  openCountryPicker: () => void;
  openCityPicker: () => void;
  closePickers: () => void;
  selectCountry: (country: Country) => void;
  selectCity: (city: City) => void;
}

export function useCountryCity(
  initialCountry: Country | null = null,
  initialCity: City | null = null,
): UseCountryCityResult {
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(initialCountry);
  const [selectedCity, setSelectedCity] = useState<City | null>(initialCity);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isCountryPickerOpen, setIsCountryPickerOpen] = useState(false);
  const [isCityPickerOpen, setIsCityPickerOpen] = useState(false);

  const closePickers = useCallback(() => {
    setIsCountryPickerOpen(false);
    setIsCityPickerOpen(false);
  }, []);

  const openCountryPicker = useCallback(() => {
    setIsCityPickerOpen(false);
    setIsCountryPickerOpen((open) => !open);

    if (countries.length === 0) {
      setIsLoadingCountries(true);
      apiService
        .get<ApiResponse<Country[]>>("v1/country/list")
        .then((response) => setCountries(response.data))
        .catch((error) => console.error("Failed to load countries:", error))
        .finally(() => setIsLoadingCountries(false));
    }
  }, [countries.length]);

  const openCityPicker = useCallback(() => {
    if (!selectedCountry) return;

    setIsCountryPickerOpen(false);
    setIsCityPickerOpen((open) => !open);
    setIsLoadingCities(true);

    apiService
      .get<ApiResponse<City[]>>("v1/city/list", { country: selectedCountry.id })
      .then((response) => setCities(response.data))
      .catch((error) => console.error("Failed to load cities:", error))
      .finally(() => setIsLoadingCities(false));
  }, [selectedCountry]);

  const selectCountry = useCallback((country: Country) => {
    setSelectedCountry(country);
    setSelectedCity(null);
    setCities([]);
    setIsCountryPickerOpen(false);
  }, []);

  const selectCity = useCallback((city: City) => {
    setSelectedCity(city);
    setIsCityPickerOpen(false);
  }, []);

  return {
    countries,
    cities,
    selectedCountry,
    selectedCity,
    isLoadingCountries,
    isLoadingCities,
    isCountryPickerOpen,
    isCityPickerOpen,
    openCountryPicker,
    openCityPicker,
    closePickers,
    selectCountry,
    selectCity,
  };
}
