import React, { useContext, useEffect, useState } from "react";
import { getHabits, Habit } from "./habits";

type HabitProviderType = {
  habits: Habit[];
  toggleHabit: (habit: Habit, day: string) => void;
};
const habitsContext = React.createContext<HabitProviderType>({
  habits: [],
  toggleHabit: (habit: Habit, day: string) => {},
});

const useHabitsProvider = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  useEffect(() => {
    getHabits().then((serverHabits) => {
      setHabits(serverHabits);
    });
  }, []);

  const toggleHabit = (habit: Habit, day: string) => {
    // change habit complete state
    // every invocation rotate complete state
    // undefined -> true -> false -> true -> false...
    const completed = habit.completed[day] || false;
    const updatedHabit: Habit = {
      ...habit,
      completed: { ...habit.completed, [day]: !completed },
    };
    const updatedHabits = habits.map((h) => {
      if (h === habit) {
        return updatedHabit;
      }
      return h;
    });
    setHabits(updatedHabits);
  };

  return {
    habits,
    toggleHabit,
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
