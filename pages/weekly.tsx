import React from "react";
import { HabitProvider } from "../lib/HabitProvider";
import DisplayHabits from "../components/DisplayHabits";
import { useTitle } from "../lib/layout";
import { useUser } from "../lib/auth";

const weekly = () => {
  useTitle("Weekly habits");
  const user = useUser();
  if (!user) {
    return null;
  }
  return (
    <HabitProvider>
      <DisplayHabits type={"week"} />
    </HabitProvider>
  );
};

export default weekly;
