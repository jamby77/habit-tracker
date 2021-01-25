import { format, isAfter, startOfToday } from "date-fns";
import React from "react";
import { DailyCell } from "~c/index";
import { useHabits } from "~l/HabitProvider";
import { dateFormat, HabitType } from "~l/habits";

const HabitRowDays = ({ habit, days }: { habit: HabitType; days: Date[] }) => {
  const { toggleHabit } = useHabits();
  return (
    <div className="flex flex-row flex-shrink-0 items-center justify-between flex-grow h-16 ">
      {days.map((day) => {
        const key = format(day, dateFormat);
        const disabled = isAfter(day, startOfToday());
        return (
          <DailyCell
            habit={habit}
            dateKey={key}
            disabled={disabled}
            key={key}
            handleToggle={() => {
              toggleHabit(habit, key);
            }}
          />
        );
      })}
    </div>
  );
};

export default HabitRowDays;
