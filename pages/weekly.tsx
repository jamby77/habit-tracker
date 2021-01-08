import React from "react";
import { HabitProvider } from "../lib/HabitProvider";
import DisplayHabits from "../components/DisplayHabits";

const weekly = () => {
  return (
    <HabitProvider>
      <DisplayHabits type={"week"} />
    </HabitProvider>
  );
};

export default weekly;
