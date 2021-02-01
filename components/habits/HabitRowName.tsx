import Link from "next/link";
import React from "react";
import { HabitType } from "~l/habits";
import DeleteIcon from "~s/deleteIcon";
import EditIcon from "~s/editIcon";
import { getHslBackgroundColor, getHslTextColor } from "../../utils/helper";

const HabitRowName = ({ habit, tint }: { habit: HabitType; tint: number }) => {
  return (
    <div
      className="w-full h-16 flex-shrink-0 flex flex-row items-center justify-between"
      style={{
        backgroundColor: getHslBackgroundColor(tint),
      }}
    >
      <div
        className="truncate h-8 flex-grow pl-4"
        title={`${habit.name} - ${habit.description}`}
      >
        <Link href={`/habits/${habit.slug}`}>
          <a className="hover:underline">{habit.name}</a>
        </Link>
      </div>
      <div className="flex flex-col flex-shrink-0 flex-grow-0 w-10 h-14 py-1 pl-2 items-center justify-between">
        <Link href={`/habits/edit/${habit.slug}`}>
          <a
            title={`Edit "${habit.name}"`}
            className="w-6 h-6"
            style={{
              color: getHslTextColor(tint),
            }}
          >
            <span className="sr-only">{`Edit "${habit.name}"`}</span>
            <EditIcon />
          </a>
        </Link>
        <Link href={`/habits/delete/${habit.slug}`}>
          <a
            title={`Delete "${habit.name}"`}
            className="w-6 h-6"
            style={{
              color: getHslTextColor(tint),
            }}
          >
            <span className="sr-only">{`Delete "${habit.name}"`}</span>
            <DeleteIcon />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default HabitRowName;
