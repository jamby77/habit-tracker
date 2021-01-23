import cn from "clsx";
import React, { useState } from "react";
import { HabitType } from "~l/habits";
import NoteIcon from "~s/noteIcon";
import SkippedIcon from "~s/skippedIcon";
import SuccessIcon from "~s/successIcon";
import UnknownIcon from "~s/unknownIcon";

const Icons = {
  success: SuccessIcon,
  fail: SkippedIcon,
  unknown: UnknownIcon,
};

const TodayHabitCard = ({
  habit,
  dateKey = "",
  toggleHabit,
}: {
  habit: HabitType;
  dateKey: string;
  toggleHabit: () => void;
}) => {
  const [editNote, setEditNote] = useState(false);
  const done = habit.completed[dateKey].state === true;
  const skipped = habit.completed[dateKey].state === false;
  const unknown = habit.completed[dateKey] === undefined;
  const className = {
    "focus:ring-1 bg-white w-8 h-8 block flex items-center justify-center rounded-full focus:outline-none": true,
    "focus:ring-green-400 hover:bg-green-200 border-green-600 text-green-600": done,
    "focus:ring-red-400 hover:bg-red-200 border-red-600 text-red-600": skipped,
    "focus:ring-gray-400 hover:bg-gray-200 border-gray-200 text-gray-400": unknown,
  };
  return (
    <div className="mx-4 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="px-4 py-6">{habit.name}</div>
        <div className="pr-4 flex flex-row items-center">
          <button className={cn(className)} onClick={toggleHabit}>
            <span className="w-full h-full block">
              {done ? (
                <Icons.success />
              ) : skipped ? (
                <Icons.fail />
              ) : (
                <Icons.unknown />
              )}
            </span>
          </button>{" "}
          <button
            className="focus:outline-none rounded-full focus:ring-1 ring-gray-300 flex justify-center items-center text-gray-300 bg-white w-8 h-8 block"
            onClick={() => {
              console.log("Add note");
              setEditNote(!editNote);
            }}
          >
            <span className="w-3/4 h-3/4 block">
              <NoteIcon />
            </span>
          </button>
        </div>
      </div>
      {editNote && (
        <div className="flex flex-col justify-start">
          <label className="px-4 py-2" htmlFor="note">
            Note:
          </label>
          <div className="px-4 pb-4 h-20">
            <textarea
              name="note"
              id="note"
              className="rounded w-full h-full border-gray-200"
              placeholder="Add your comment ..."
            >
              {""}
            </textarea>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayHabitCard;
