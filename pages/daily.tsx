import React from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  startOfToday,
} from "date-fns";
import HabitDailyRow from "../components/HabitDailyRow";
import Logo from "../components/Logo";

export const dateFormat = "yyyy-MM-dd";
export type Habit = {
  name: string;
  completed: {
    [date: string]: boolean;
  };
};
const Daily = () => {
  const today = startOfToday();
  const month = format(today, "MMMM");
  const days = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });
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
  return (
    <div className="py-4 px-4 sm:px-8 overflow-hidden h-screen w-screen">
      <h2 className="text-3xl text-center py-4">Daily habits</h2>
      <div className="flex justify-center">
        <Logo />
      </div>
      <div className="overflow-x-auto w-full h-full border-8 border-red-50">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="flex flex-row h-8">
              <div className="w-1/2 sm:w-40" />
              <div className="flex-grow font-bold">{month}</div>
            </div>
            <div className="flex flex-row h-10 flex-nowrap">
              <div className="w-1/2 sm:w-40 h-10 flex-shrink-0 font-bold">
                Habits
              </div>
              {days.map((day) => {
                return (
                  <div
                    className="w-8 h-10 flex-shrink-0 text-xs text-center"
                    key={day.toDateString()}
                  >
                    <div>{format(day, "dd")}</div>
                    <div>{format(day, "EEEEE")}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            {habits.map((habit) => {
              return (
                <HabitDailyRow
                  key={habit.name}
                  daysOfMonth={days}
                  habit={habit}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Daily;
