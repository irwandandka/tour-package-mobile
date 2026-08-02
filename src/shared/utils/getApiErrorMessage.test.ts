import { getApiErrorMessage } from "./getApiErrorMessage";

function axiosErrorFixture(overrides: Record<string, unknown>) {
  return { isAxiosError: true, message: "generic axios message", ...overrides };
}

describe("getApiErrorMessage", () => {
  it("returns the server message when the server responded", () => {
    const error = axiosErrorFixture({
      response: { data: { message: "Email already taken" } },
    });
    expect(getApiErrorMessage(error)).toBe("Email already taken");
  });

  it("falls back to the default message when the server response has no message", () => {
    const error = axiosErrorFixture({ response: { data: {} } });
    expect(getApiErrorMessage(error)).toBe("Something went wrong. Please try again.");
  });

  it("uses a custom fallback when provided", () => {
    const error = axiosErrorFixture({ response: { data: {} } });
    expect(getApiErrorMessage(error, "Custom fallback")).toBe("Custom fallback");
  });

  it("returns a network message when the request was made but no response arrived", () => {
    const error = axiosErrorFixture({ request: {} });
    expect(getApiErrorMessage(error)).toBe(
      "Unable to reach the server. Check your connection and try again.",
    );
  });

  it("returns the axios message when the request never got sent", () => {
    const error = axiosErrorFixture({ message: "Request setup failed" });
    expect(getApiErrorMessage(error)).toBe("Request setup failed");
  });

  it("returns the fallback for a non-axios error", () => {
    expect(getApiErrorMessage(new Error("boom"))).toBe("Something went wrong. Please try again.");
  });

  it("returns the fallback for a completely unexpected thrown value", () => {
    expect(getApiErrorMessage("just a string")).toBe("Something went wrong. Please try again.");
  });
});
