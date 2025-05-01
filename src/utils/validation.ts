export type ValidationResult = {
    error: string;
    isValid: boolean;
}

export function validateInput(type: "email" | "password", value: string, t: any): ValidationResult {
    if (value.trim() === "") {
        return {
            isValid: false,
            error: t(`validation.${type}_required`),
        };
    }

    if (type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return {
                isValid: false,
                error: t("validation.email_invalid"),
            };
        }
    }

    if (type === "password") {
        if (value.length < 6) {
            return {
                isValid: false,
                error: t("validation.password_length"), // pastikan ada key ini di translations
            };
        }
    }

    return {
        isValid: true,
        error: "",
    };
}