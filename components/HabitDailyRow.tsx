import React from "react";
import cn from "clsx";
import { format } from "date-fns";
import { dateFormat, Habit } from "../pages/daily";

const HabitDailyRow: React.FC<{
  habit: Habit;
  daysOfMonth: Date[];
}> = ({ habit, daysOfMonth }) => {
  return (
    <div className="flex flex-row flex-shrink-0">
      <div className="w-1/2 sm:w-40 h-8 flex-shrink-0">{habit.name}</div>
      {daysOfMonth.map((day) => {
        const key = format(day, dateFormat);
        const done = habit.completed[key] === true;
        const skipped = habit.completed[key] === false;
        const unknown = habit.completed[key] === undefined;
        const className = {
          "w-8 h-8 flex-shrink-0 text-center flex items-center justify-center": true,
          "bg-green-500": done,
          "bg-red-600": skipped,
          "bg-gray-300": unknown,
        };
        return (
          <div key={`${habit.name}-${key}`} className={cn(className)}>
            {done ? "✔️" : skipped ? "💩" : "❓"}
          </div>
        );
      })}
    </div>
  );
};

export default HabitDailyRow;
