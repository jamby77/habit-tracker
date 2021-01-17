import Home from "../pages/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Home page", () => {
  it("Renders home page", () => {
    const { getByText } = render(<Home />);
    expect(getByText("Habit tracker")).toBeInTheDocument();
  });

  it("should render todo", function () {
    render(<Home />);
    expect(screen.getByText("TODO: home page here")).toBeInTheDocument();
  });
});
