import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { HabitDisplayType } from "./habits";

export const today = startOfToday();
export const currentMonthAsString = format(today, "MMMM");
export const currentWeekAsString = format(today, "wo");
export const getDays = (forDate: Date, ofType: HabitDisplayType) => {
  const start =
    ofType === "week"
      ? startOfWeek(forDate, { weekStartsOn: 1 })
      : startOfMonth(forDate);
  const end =
    ofType === "week"
      ? endOfWeek(forDate, { weekStartsOn: 1 })
      : endOfMonth(forDate);
  return eachDayOfInterval({
    start,
    end,
  });
};
