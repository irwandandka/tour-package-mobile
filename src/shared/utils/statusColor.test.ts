import { getStatusColor } from "./statusColor";
import { colors } from "@shared/constants/theme";

describe("getStatusColor", () => {
  it.each(["completed", "settlement", "COMPLETED", "Settlement"])(
    "maps %s to the success color",
    (status) => {
      expect(getStatusColor(status).text).toBe(colors.success);
    },
  );

  it("maps processed to the info color", () => {
    expect(getStatusColor("processed").text).toBe(colors.info);
  });

  it.each(["cancelled", "canceled", "CANCELLED"])("maps %s to the error color", (status) => {
    expect(getStatusColor(status).text).toBe(colors.error);
  });

  it.each(["entry", "pending", "unknown_status", ""])(
    "maps %s to the warning color (default bucket)",
    (status) => {
      expect(getStatusColor(status).text).toBe(colors.warning);
    },
  );

  it("returns background, border, and text for every bucket", () => {
    const result = getStatusColor("completed");
    expect(result).toEqual({
      background: colors.successBackground,
      border: colors.success,
      text: colors.success,
    });
  });
});
