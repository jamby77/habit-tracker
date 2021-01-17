import Home from "../pages/index";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("Render home page", () => {
  const { getByText } = render(<Home />);
  expect(getByText("Habit tracker")).toBeInTheDocument();
});
