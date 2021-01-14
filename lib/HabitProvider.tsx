import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./auth";
import { editHabit, getHabits, HabitType } from "./habits";

type HabitProviderType = {
  habits?: HabitType[];
  toggleHabit?: (habit: HabitType, day: string) => void;
  refreshHabits?: (userId: string) => void;
  userHasAccessToHabit?: (habit: HabitType) => boolean;
};
const habitsContext = React.createContext<HabitProviderType>({});

const useHabitsProvider = () => {
  const [habits, setHabits] = useState<HabitType[]>([]);
  const {
    user: { user },
  } = useAuth();
  const refreshHabits = (uid) => {
    getHabits(uid).then((serverHabits) => {
      setHabits(serverHabits);
    });
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    refreshHabits(user.uid);
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

  const userHasAccessToHabit = (habit) => {
    return habit && user && user.uid === habit.uid;
  };

  return {
    habits,
    toggleHabit,
    refreshHabits,
    userHasAccessToHabit,
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
