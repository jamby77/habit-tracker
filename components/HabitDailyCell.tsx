import cn from "clsx";
import React from "react";
import { useHabits } from "../lib/HabitProvider";
import { HabitType } from "../lib/habits";
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
  habit: HabitType;
  dateKey: string;
  disabled: boolean;
}) => {
  const { toggleHabit } = useHabits();
  const done = habit.completed[dateKey] === true;
  const skipped = habit.completed[dateKey] === false;
  const unknown = habit.completed[dateKey] === undefined;
  const className = {
    "focus:ring-1 bg-white h-10 w-10 text-center flex items-center justify-center rounded-lg focus:outline-none border-2": true,
    "focus:ring-green-400 hover:bg-green-200 border-green-600 text-green-600": done,
    "focus:ring-red-400 hover:bg-red-200 border-red-600 text-red-600": skipped,
    "focus:ring-gray-400 hover:bg-gray-200 border-gray-400 text-gray-400": unknown,
    "disabled:opacity-50 disabled:cursor-not-allowed border-none ": disabled,
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
