import React, { useContext, useEffect, useState } from "react";
import { getHabits, Habit } from "./habits";

type HabitProviderType = {
  habits: Habit[];
};
const habitsContext = React.createContext<HabitProviderType>({
  habits: [],
});

const useHabitsProvider = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  useEffect(() => {
    getHabits().then((serverHabits) => {
      setHabits(serverHabits);
    });
  }, []);
  return {
    habits,
  };
};

export const useHabits = () => {
  return useContext(habitsContext);
};

export const HabitProvider: React.FC = ({ children }) => {
  const habits = useHabitsProvider();
  return (
    <habitsContext.Provider value={habits}>{children}</habitsContext.Provider>
  );
};
