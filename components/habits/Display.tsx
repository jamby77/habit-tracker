import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from "date-fns";
import React from "react";
import { useHabits } from "../../lib/HabitProvider";
import { HabitDisplayType } from "../../lib/habits";
import { DailyRow, DaysHeading } from "../index";

const Display = ({ type }: { type: HabitDisplayType }) => {
  const { habits } = useHabits();
  const today = startOfToday();
  const month = format(today, "MMMM");
  const week = format(today, "wo");
  const start =
    type === "week"
      ? startOfWeek(today, { weekStartsOn: 1 })
      : startOfMonth(today);
  const end =
    type === "week" ? endOfWeek(today, { weekStartsOn: 1 }) : endOfMonth(today);
  const days = eachDayOfInterval({
    start,
    end,
  });
  return (
    <div className="DisplayHabits py-4 px-4 sm:px-8 overflow-hidden h-screen w-screen">
      <h2 className="text-3xl text-center py-4">{`Daily habits (${
        type === "week" ? "weekly" : "monthly"
      })`}</h2>
      <div className="tracker overflow-hidden w-full h-full border-8 border-red-50 flex flex-col">
        <div className="tracker-heading w-full flex flex-col px-4 gap-1">
          <div className="flex flex-row h-8 w-full">
            <div className="w-1/2 sm:w-40" />
            <div className="flex-grow font-bold">{`${month}, ${week} week`}</div>
          </div>
          <div className="flex flex-row h-10 flex-nowrap">
            <div className="w-1/2 sm:w-40 h-10 flex-shrink-0 font-bold">
              Habits
            </div>
            <DaysHeading days={days} />
          </div>
        </div>
        <div className="tracker-body flex flex-col gap-1 w-full">
          {habits.map((habit) => {
            return <DailyRow key={habit.name} days={days} habit={habit} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Display;
