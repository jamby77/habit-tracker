import cn from "clsx";
import React from "react";
import { useHabits } from "../lib/HabitProvider";
import { Habit } from "../lib/habits";

const HabitDailyCell = ({
  habit,
  dateKey,
  disabled = false,
}: {
  habit: Habit;
  dateKey: string;
  disabled: boolean;
}) => {
  const { toggleHabit } = useHabits();
  const done = habit.completed[dateKey] === true;
  const skipped = habit.completed[dateKey] === false;
  const unknown = habit.completed[dateKey] === undefined;
  const className = {
    "h-10 w-10 text-center flex items-center justify-center ": true,
    "bg-green-500": done,
    "bg-red-600": skipped,
    "bg-gray-300": unknown,
    "disabled:opacity-50": disabled,
  };
  return (
    <div className="HabitDailyCell">
      <button
        disabled={disabled}
        key={`${habit.name}-${dateKey}`}
        className={cn(className)}
        onClick={(e) => {
          e.preventDefault();
          toggleHabit(habit, dateKey);
        }}
      >
        {done ? "✔️" : skipped ? "💩" : "❓"}
      </button>
    </div>
  );
};

export default HabitDailyCell;
