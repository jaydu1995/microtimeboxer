import formatMS, { TimeFormat } from "./formatMS";

describe("formatMS", () => {
  it("should return a formatted string in MM:SS format", () => {
    const expected = "12:34";
    const actual = formatMS(754000, "MM:SS");

    expect(actual).toBe(expected);
  });

  it("should return a formatted string in HH:MM:SS format", () => {
    const expected = "02:05:34";
    const actual = formatMS(7534000, "HH:MM:SS");

    expect(actual).toBe(expected);
  });

  it("should return a formatted string in HH:MM format", () => {
    const expected = "01:12";
    const actual = formatMS(4320000, "HH:MM");

    expect(actual).toBe(expected);
  });

  it("should return the default MM:SS format when an invalid format is passed", () => {
    const expected = "01:23";
    const actual = formatMS(83000, "invalid format" as TimeFormat);

    expect(actual).toBe(expected);
  });

  it("should handle zero milliseconds by returning a formatted string in MM:SS format", () => {
    const expected = "00:00";
    const actual = formatMS(0, "MM:SS");

    expect(actual).toBe(expected);
  });

  it("should handle negative values by returning a formatted string of zero milliseconds in MM:SS format", () => {
    const expected = "00:00";
    const actual = formatMS(-1000, "HH:MM");

    expect(actual).toBe(expected);
  });
});
