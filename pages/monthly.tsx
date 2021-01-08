import React from "react";
import { HabitProvider } from "../lib/HabitProvider";
import DisplayHabits from "../components/DisplayHabits";
import { useTitle } from "../lib/layout";

const monthly = () => {
  useTitle("Monthly habits");

  return (
    <HabitProvider>
      <DisplayHabits type={"month"} />
    </HabitProvider>
  );
};

export default monthly;
