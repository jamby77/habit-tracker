import cn from "clsx";
import React from "react";
import { useHabits } from "../lib/HabitProvider";
import { Habit } from "../lib/habits";
import SkippedIcon from "../svg/skippedIcon";
import SuccessIcon from "../svg/successIcon";
import UnknownIcon from "../svg/unknownIcon";

const Icons = {
  success: SuccessIcon,
  fail: SkippedIcon,
  unknown: UnknownIcon,
};
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
    "bg-gradient-to-b h-10 w-10 text-center flex items-center justify-center rounded-lg focus:outline-none border-0 hover:border-2 focus:border-2": true,
    "from-green-100 to-green-200 border-green-600 text-green-600": done,
    "from-red-100 to-red-200 border-red-600 text-red-600": skipped,
    "from-gray-100 to-gray-200 border-gray-600 text-gray-400": unknown,
    "disabled:opacity-50": disabled,
  };
  return (
    <div className="HabitDailyCell ">
      <button
        disabled={disabled}
        key={`${habit.name}-${dateKey}`}
        className={cn(className)}
        onClick={(e) => {
          e.preventDefault();
          toggleHabit(habit, dateKey);
        }}
      >
        <span className={`inline-block h-3/4 w-3/4`}>
          {done ? (
            <Icons.success />
          ) : skipped ? (
            <Icons.fail />
          ) : (
            <Icons.unknown />
          )}
        </span>
      </button>
    </div>
  );
};

export default HabitDailyCell;
