import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { theme } from "@shared/constants/theme";

interface TextFieldProps<T extends FieldValues> extends Omit<TextInputProps, "style"> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  errorMessage?: string;
}

/** React Hook Form-aware text input, for forms migrating in Phase 7/9/11. */
export function TextField<T extends FieldValues>({
  control,
  name,
  label,
  errorMessage,
  ...inputProps
}: TextFieldProps<T>) {
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errorMessage && styles.inputError]}
            placeholderTextColor={theme.colors.grey500}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value ?? ""}
            {...inputProps}
          />
        )}
      />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
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
  input: {
    borderWidth: 1,
    borderColor: theme.colors.grey400,
    borderRadius: theme.radii.xs,
    padding: theme.spacing.sm,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.textPrimary,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  error: {
    color: theme.colors.error,
    fontSize: theme.typography.fontSize.xs,
    marginTop: theme.spacing.xxs,
  },
});
