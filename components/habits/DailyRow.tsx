import { format, isAfter, startOfToday } from "date-fns";
import Link from "next/link";
import React, { useState } from "react";
import { dateFormat, HabitType } from "../../lib/habits";
import DeleteIcon from "../../svg/deleteIcon";
import EditIcon from "../../svg/editIcon";
import { DailyCell } from "../index";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const DailyRow: React.FC<{
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
      <div className="w-1/2 sm:w-40 h-full flex-shrink-0 pr-2 flex flex-row items-center justify-between">
        <div
          className="truncate h-8 flex-grow"
          title={`${habit.name} - ${habit.description}`}
        >
          <Link href={`/habits/${habit.slug}`}>
            <a>{habit.name}</a>
          </Link>
        </div>
        <div className="flex flex-col flex-shrink-0 flex-grow-0 w-10 h-14 py-1 pl-2 items-center justify-between">
          <Link href={`/habits/edit/${habit.slug}`}>
            <a
              title={`Edit "${habit.name}"`}
              className="w-6 h-6 sm:text-gray-200 text-gray-400 hover:text-gray-400 focus:text-gray-400"
            >
              <span className="sr-only">{habit.name}</span>
              <EditIcon />
            </a>
          </Link>
          <Link href={`/habits/delete/${habit.slug}`}>
            <a
              title={`Delete "${habit.name}"`}
              className="w-6 h-6 sm:text-gray-200 text-gray-400 hover:text-gray-400 focus:text-gray-400"
            >
              <span className="sr-only">{habit.name}</span>
              <DeleteIcon />
            </a>
          </Link>
        </div>
      </div>
      <div className="flex flex-row flex-shrink-0 items-center justify-between flex-grow">
        {days.map((day) => {
          const key = format(day, dateFormat);
          const disabled = isAfter(day, startOfToday());
          return (
            <DailyCell
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

export default DailyRow;
