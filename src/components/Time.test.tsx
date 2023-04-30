import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Time from "./Time";

describe("<Time />", () => {
  it("should render the time", () => {
    render(<Time milliseconds={180000} format={"MM:SS"} />);
    expect(screen.getByText("03:00")).toBeInTheDocument();
  });

  // it("should update the time when the user changes the time", () => {
  //   render(<Time time={new Date("2021-01-01T00:00:00.000Z")} />);
  //   userEvent.type(screen.getByRole("spinbutton"), "1:00 PM");
  //   expect(screen.getByText("1:00 PM")).toBeInTheDocument();
  // });
});
