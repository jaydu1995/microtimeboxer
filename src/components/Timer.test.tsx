import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Timer } from "./Timer";

describe("Timer", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, "setInterval");
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders duration in MM:SS format", () => {
    render(<Timer />);
    const duration = screen.getByText(/^[0-5]?[0-9]:[0-5][0-9]$/);
    expect(duration).toBeInTheDocument();
  });

  it("initializes timer with random duration between 1 and 6 minutes", () => {
    render(<Timer />);
    const duration =
      screen.getByText(/^[0-5]?[0-9]:[0-5][0-9]$/).textContent ?? "";
    const [minutes, seconds] = duration.split(":").map((str) => parseInt(str));
    expect(minutes >= 1 && minutes <= 6).toBe(true);
    expect(seconds).toBe(0);
  });

  it("generates random duration between 1 and 6 minutes when Roll button is clicked", () => {
    render(<Timer />);
    const rollButton = screen.getByText(/Roll/);
    userEvent.click(rollButton);
    const duration =
      screen.getByText(/^[0-5]?[0-9]:[0-5][0-9]$/).textContent ?? "";
    const [minutes, seconds] = duration.split(":").map((str) => parseInt(str));
    expect(minutes >= 1 && minutes <= 6).toBe(true);
    expect(seconds).toBe(0);
  });
});
