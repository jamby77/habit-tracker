import React from "react";
import { HabitProvider } from "../lib/HabitProvider";
import DisplayHabits from "../components/DisplayHabits";
import { useTitle } from "../lib/layout";

const weekly = () => {
  useTitle("Weekly habits");
  return (
    <HabitProvider>
      <DisplayHabits type={"week"} />
    </HabitProvider>
  );
};

export default weekly;
