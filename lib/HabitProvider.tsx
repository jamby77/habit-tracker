import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./auth";
import { editHabit, getHabits, HabitType } from "./habits";

type HabitProviderType = {
  habits?: HabitType[];
  toggleHabit?: (
    habit: HabitType,
    day: string,
    callback?: (habit: HabitType) => void
  ) => void;
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

  const toggleHabit = (
    habit: HabitType,
    day: string,
    callback?: (habit: HabitType) => void
  ) => {
    // change habit complete state
    // every invocation rotate complete state
    // undefined -> true -> false -> true -> false...
    let completed = habit.completed[day] || { state: false };
    if (typeof completed === "boolean") {
      // handle case where habit's completion was simply a flag
      completed = { state: completed };
    }
    const updatedHabit: HabitType = {
      ...habit,
      toggledOn: new Date(),
      completed: {
        ...habit.completed,
        [day]: {
          ...completed,
          state: !completed.state,
        },
      },
    };
    editHabit(updatedHabit).then(() => {
      if (callback) {
        callback(updatedHabit);
      }
      const updatedHabits = habits.map((h) => {
        if (h.id === habit.id) {
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
