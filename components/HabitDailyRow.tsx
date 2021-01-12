import { format, isAfter, startOfToday } from "date-fns";
import React, { useState } from "react";
import { dateFormat, HabitType } from "../lib/habits";
import HabitDailyCell from "./HabitDailyCell";
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
const HabitDailyRow: React.FC<{
  habit: HabitType;
  days: Date[];
}> = ({ habit, days }) => {
  const [tint] = useState(getRandomInt(255));
  return (
    <div
      className="HabitDailyRow flex flex-row flex-shrink-0 bg-white p-4 gap-1 overflow-x-auto rounded-lg"
      style={{
        backgroundColor: `hsl(${tint}, 100%, 90%)`,
      }}
    >
      <div
        className="w-1/2 sm:w-40 h-8 flex-shrink-0 truncate static pr-4"
        title={`${habit.name} - ${habit.description}`}
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
