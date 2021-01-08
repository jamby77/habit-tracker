import React from "react";
import cn from "clsx";
import { format } from "date-fns";
import { dateFormat, Habit } from "../lib/habits";

const HabitDailyRow: React.FC<{
  habit: Habit;
  days: Date[];
}> = ({ habit, days }) => {
  return (
    <div className="HabitDailyRow flex flex-row flex-shrink-0 bg-white p-4 gap-1 overflow-x-auto">
      <div className="w-1/2 sm:w-40 h-8 flex-shrink-0 truncate static pr-4">
        {habit.name}
      </div>
      <div className="flex flex-row flex-shrink-0 justify-between">
        {days.map((day) => {
          const key = format(day, dateFormat);
          const done = habit.completed[key] === true;
          const skipped = habit.completed[key] === false;
          const unknown = habit.completed[key] === undefined;
          const className = {
            "h-8 text-center flex items-center justify-center": true,
            "bg-green-500": done,
            "bg-red-600": skipped,
            "bg-gray-300": unknown,
          };
          return (
            <button key={`${habit.name}-${key}`} className={cn(className)}>
              {done ? "✔️" : skipped ? "💩" : "❓"}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HabitDailyRow;
