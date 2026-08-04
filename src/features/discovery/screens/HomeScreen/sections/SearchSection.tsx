import { ActivityIndicator, TextInput, TouchableOpacity, Text, View } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useTranslation } from "react-i18next";
import { theme } from "@shared/constants/theme";
import { SearchGlobalResponse } from "@shared/types";
import styles from "./SearchSection.styles";

interface SearchSectionProps {
  query: string;
  onQueryChange: (query: string) => void;
  results: SearchGlobalResponse[];
  isSearching: boolean;
  onSelectResult: (item: SearchGlobalResponse) => void;
}

export function SearchSection({
  query,
  onQueryChange,
  results,
  isSearching,
  onSelectResult,
}: SearchSectionProps) {
  const { t } = useTranslation();

  return (
    <View>
      <View style={styles.searchSection}>
        <View style={styles.searchInput}>
          <FeatherIcon
            name="search"
            size={20}
            color={theme.colors.grey500}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.textInput}
            placeholder={t("HomeScreen.placeHolderSearch")}
            value={query}
            onChangeText={onQueryChange}
            placeholderTextColor={theme.colors.grey400}
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>
        <FeatherIcon
          name="filter"
          size={20}
          color={theme.colors.grey700}
          style={styles.filterIcon}
        />
      </View>

      {isSearching && (
        <ActivityIndicator
          size="small"
          color={theme.colors.primary}
          style={{ marginTop: theme.spacing.sm }}
        />
      )}

      {results.length > 0 && (
        <View style={styles.resultsContainer}>
          {results.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.resultItem}
              onPress={() => onSelectResult(item)}
            >
              <Text style={styles.resultText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
