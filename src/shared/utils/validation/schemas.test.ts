import { emailSchema, passwordSchema, nameSchema } from "./schemas";

describe("emailSchema", () => {
  it("rejects an empty string with the required key", () => {
    const result = emailSchema.safeParse("");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("validation.email_required");
    }
  });

  it("rejects a malformed email with the invalid key", () => {
    const result = emailSchema.safeParse("not-an-email");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("validation.email_invalid");
    }
  });

  it("accepts a valid email", () => {
    expect(emailSchema.safeParse("user@example.com").success).toBe(true);
  });

  it("trims surrounding whitespace", () => {
    const result = emailSchema.safeParse("  user@example.com  ");
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe("user@example.com");
    }
  });
});

describe("passwordSchema", () => {
  it("rejects an empty string with the required key", () => {
    const result = passwordSchema.safeParse("");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("validation.password_required");
    }
  });

  it("rejects a password shorter than 6 characters", () => {
    const result = passwordSchema.safeParse("abc12");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("validation.password_length");
    }
  });

  it("accepts a 6+ character password", () => {
    expect(passwordSchema.safeParse("abc123").success).toBe(true);
  });
});

describe("nameSchema", () => {
  it("rejects an empty string with the required key", () => {
    const result = nameSchema.safeParse("");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("validation.name_required");
    }
  });

  it("rejects a single-character name", () => {
    const result = nameSchema.safeParse("A");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("validation.name_length");
    }
  });

  it("accepts a 2+ character name", () => {
    expect(nameSchema.safeParse("Al").success).toBe(true);
  });
});
