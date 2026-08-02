import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "@shared/constants/theme";

interface NamedItem {
  id: string;
  name: string;
}

interface CountryCityPickerProps<T extends NamedItem> {
  label: string;
  placeholder: string;
  value: T | null;
  items: T[];
  isOpen: boolean;
  isLoading: boolean;
  disabled?: boolean;
  onOpen: () => void;
  onSelect: (item: T) => void;
}

/**
 * Generic replacement for the duplicated country/city dropdown UI in
 * PassengerDetailScreen and ProfileScreen — rendered once bound to country
 * props, once bound to city props, by whichever screen consumes it.
 */
export function CountryCityPicker<T extends NamedItem>({
  label,
  placeholder,
  value,
  items,
  isOpen,
  isLoading,
  disabled = false,
  onOpen,
  onSelect,
}: CountryCityPickerProps<T>) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={onOpen} disabled={disabled}>
        <View style={[styles.field, disabled && styles.fieldDisabled]}>
          <Text style={value ? styles.valueText : styles.placeholderText}>
            {value?.name || placeholder}
          </Text>
        </View>
      </TouchableOpacity>

      {isLoading && (
        <ActivityIndicator size="small" color={theme.colors.grey500} style={styles.loading} />
      )}

      {isOpen && (
        <ScrollView style={styles.dropdown} nestedScrollEnabled>
          {items.map((item) => (
            <TouchableOpacity key={item.id} style={styles.item} onPress={() => onSelect(item)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  field: {
    borderWidth: 1,
    borderColor: theme.colors.grey400,
    borderRadius: theme.radii.xs,
    padding: theme.spacing.sm,
  },
  fieldDisabled: {
    backgroundColor: theme.colors.grey100,
  },
  valueText: {
    color: theme.colors.textPrimary,
  },
  placeholderText: {
    color: theme.colors.textMuted,
  },
  loading: {
    marginTop: theme.spacing.xs,
  },
  dropdown: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: theme.colors.grey400,
    marginTop: theme.spacing.xxs,
    backgroundColor: theme.colors.white,
  },
  item: {
    padding: theme.spacing.sm,
    borderBottomWidth: 1,
    borderColor: theme.colors.grey200,
  },
});
