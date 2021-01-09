import React from "react";
import { format, isAfter, startOfToday } from "date-fns";
import { dateFormat, Habit } from "../lib/habits";
import HabitDailyCell from "./HabitDailyCell";

const HabitDailyRow: React.FC<{
  habit: Habit;
  days: Date[];
}> = ({ habit, days }) => {
  return (
    <div className="HabitDailyRow flex flex-row flex-shrink-0 bg-white p-4 gap-1 overflow-x-auto">
      <div
        className="w-1/2 sm:w-40 h-8 flex-shrink-0 truncate static pr-4"
        title={habit.name}
      >
        {habit.name}
      </div>
      <div className="flex flex-row flex-shrink-0 justify-between flex-grow">
        {days.map((day) => {
          const key = format(day, dateFormat);
          const disabled = isAfter(day, startOfToday());
          return (
            <HabitDailyCell
              habit={habit}
              dateKey={key}
              disabled={disabled}
              key={key}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HabitDailyRow;
