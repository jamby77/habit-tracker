import { createHabit, deleteHabit, getUserHabits, updateHabit } from "./db";

export const dateFormat = "yyyy-MM-dd";

export type HabitType = {
  id?: string;
  slug: string;
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
