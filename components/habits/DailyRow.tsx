import React, { ForwardedRef, forwardRef } from "react";
import HabitRowDays from "~c/habits/HabitRowDays";
import HabitRowName from "~c/habits/HabitRowName";
import { HabitType } from "~l/habits";
import { getHslBackgroundColor, getRandomInt } from "../../utils/helper";

const DailyRow = forwardRef(
  (
    { habit, days }: { habit: HabitType; days: Date[] },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const tint = getRandomInt(360);

    return (
      <div
        ref={ref}
        className="HabitDailyRow flex flex-row flex-shrink-0 bg-white p-4 gap-1 overflow-x-auto"
        style={{
          backgroundColor: getHslBackgroundColor(tint),
        }}
      >
        <HabitRowName habit={habit} tint={tint} />
        <HabitRowDays habit={habit} days={days} />
      </div>
    );
  }
);

export default DailyRow;
