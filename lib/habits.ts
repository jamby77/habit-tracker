import { createHabit, deleteHabit, getUserHabits, updateHabit } from "./db";

export const dateFormat = "yyyy-MM-dd";

export type Habit = {
  name: string;
  completed: {
    [date: string]: boolean;
  };
};

export type HabitDisplayType = "week" | "month";

export const getHabits = async (uid) => {
  return getUserHabits(uid);
};

export const addHabit = async (habit) => {
  return createHabit(habit);
};

export const editHabit = async (habit) => {
  if (!habit.id) {
    return;
  }
  return updateHabit(habit.id, habit);
};

export const removeHabit = async (habit) => {
  if (!habit.id) {
    return;
  }
  return deleteHabit(habit.id);
};

const habits: Habit[] = [
  {
    name: "Drink 3l of water",
    completed: {
      "2021-01-01": true,
      "2021-01-02": true,
      "2021-01-03": false,
      "2021-01-04": true,
      "2021-01-05": true,
      "2021-01-06": false,
      "2021-01-07": true,
    },
  },
  {
    name: "Stretch at least 5 minutes",
    completed: {
      "2021-01-01": false,
      "2021-01-02": true,
      "2021-01-03": true,
      "2021-01-04": true,
      "2021-01-05": true,
      "2021-01-06": false,
      "2021-01-07": true,
    },
  },
];
