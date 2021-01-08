import React from "react";
import { HabitProvider } from "../lib/HabitProvider";
import DisplayHabits from "../components/DisplayHabits";

const monthly = () => {
  return (
    <HabitProvider>
      <DisplayHabits type={"month"} />
    </HabitProvider>
  );
};

export default monthly;
