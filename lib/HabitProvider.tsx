import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./auth";
import { editHabit, getHabits, HabitType } from "./habits";

type HabitProviderType = {
  habits?: HabitType[];
  toggleHabit?: (habit: HabitType, day: string) => void;
};
const habitsContext = React.createContext<HabitProviderType>({});

const useHabitsProvider = () => {
  const [habits, setHabits] = useState<HabitType[]>([]);
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      return;
    }
    getHabits(user.uid).then((serverHabits) => {
      setHabits(serverHabits);
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
    editHabit(updatedHabit).then(() => {
      const updatedHabits = habits.map((h) => {
        if (h === habit) {
          return updatedHabit;
        }
        return h;
      });
      setHabits(updatedHabits);
    });
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
