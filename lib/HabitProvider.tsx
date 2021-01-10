import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./auth";
import { getHabits, Habit } from "./habits";

type HabitProviderType = {
  habits?: Habit[];
  toggleHabit?: (habit: Habit, day: string) => void;
};
const habitsContext = React.createContext<HabitProviderType>({});

const useHabitsProvider = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      return;
    }
    getHabits(user.uid).then((serverHabits) => {
      setHabits(
        serverHabits.map((sh) => {
          return { ...sh, id: sh.id, completed: sh.completed, name: sh.name };
        })
      );
    });
  }, [user]);

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
