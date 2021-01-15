import { useEffect, useState } from "react";
import {
  createHabit,
  deleteHabit,
  getHabitBySlug,
  getUserHabits,
  updateHabit,
} from "./db";

export const dateFormat = "yyyy-MM-dd";

export enum Occurrence {
  Daily = "d",
  Weekly = "w",
  Monthly = "m",
  Yearly = "y",
}

export const baseHabit = {
  uid: "",
  name: "",
  description: "",
  occurrence: Occurrence.Daily,
  slug: "",
  completed: {},
};

export type HabitType = {
  id?: string;
  uid?: string;
  slug: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  toggledOn?: Date;
  occurrence: Occurrence;
  completed: {
    [date: string]: boolean;
  };
};

export type HabitDisplayType = "week" | "month";

export const getHabits = async (uid) => {
  return getUserHabits(uid);
};

export const useHabit = (habitSlug: string) => {
  const [habit, setHabit] = useState<HabitType>(null);
  useEffect(() => {
    findHabit(habitSlug).then((serverHabit) => {
      if (!serverHabit) {
        return;
      }
      setHabit(serverHabit as HabitType);
    });
  }, [habitSlug]);
  return habit;
};

export const addHabit = async (habit) => {
  if (!habit.uid) {
    return;
  }
  return createHabit(habit);
};

export const editHabit = async (habit) => {
  if (!habit.id) {
    return;
  }
  return updateHabit(habit.id, habit);
};

export const findHabit = async (slug: string) => {
  if (!slug) {
    return;
  }
  return getHabitBySlug(slug);
};

export const removeHabit = async (habit) => {
  if (!habit.id) {
    return;
  }
  return deleteHabit(habit.id);
};
