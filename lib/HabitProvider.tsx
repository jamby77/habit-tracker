import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./auth";
import { getHabits, HabitType } from "./habits";

type HabitProviderType = {
  habits?: HabitType[];
  toggleHabit?: (habit: HabitType, day: string) => void;
};
const habitsContext = React.createContext<HabitProviderType>({});

const useHabitsProvider = () => {
  const [habits, setHabits] = useState<HabitType[]>([]);
  const { user } = useAuth();
  console.log(user);
  useEffect(() => {
    console.log(user);
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

  const toggleHabit = (habit: HabitType, day: string) => {
    // change habit complete state
    // every invocation rotate complete state
    // undefined -> true -> false -> true -> false...
    const completed = habit.completed[day] || false;
    const updatedHabit: HabitType = {
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
  const context = useContext(habitsContext);
  console.log(context);
  return context;
};

export const HabitProvider: React.FC = ({ children }) => {
  const habits = useHabitsProvider();
  return (
    <habitsContext.Provider value={habits}>{children}</habitsContext.Provider>
  );
};
