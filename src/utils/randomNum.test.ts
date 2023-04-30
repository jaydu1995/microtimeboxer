import randomNum from "./randomNum";

describe("random function", () => {
  it("should return a number between min and max, inclusive", () => {
    const min = 1;
    const max = 10;
    const step = 1;
    const numValues = 10000;
    const results = Array.from({ length: numValues }, () =>
      randomNum(min, max, step)
    );
    const minResult = Math.min(...results);
    const maxResult = Math.max(...results);
    expect(minResult).toBeGreaterThanOrEqual(min);
    expect(maxResult).toBeLessThanOrEqual(max);
    expect(results.every((val) => val >= min && val <= max)).toBe(true);
  });

  it("should return a number that is within the step", () => {
    const min = 1;
    const max = 10;
    const step = 2;
    const numValues = 10000;
    const results = Array.from({ length: numValues }, () =>
      randomNum(min, max, step)
    );
    const isMultipleOfStep = results.some((val) => val % step === 0);
    expect(isMultipleOfStep).toBe(false);
  });

  it("returns numbers within the specified range with the specified step size", () => {
    const min = 1;
    const max = 10;
    const step = 5;
    const numValues = 10000;
    const results = Array.from({ length: numValues }, () =>
      randomNum(min, max, step)
    );
    const minResult = Math.min(...results);
    const maxResult = Math.max(...results);
    expect(minResult).toBeGreaterThanOrEqual(min);
    expect(maxResult).toBeLessThanOrEqual(max);
    expect(
      results.every((val, i) => i === 0 || (val - results[i - 1]) % step === 0)
    ).toBe(true);
  });
});
