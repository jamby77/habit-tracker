import { format, formatDistance, isAfter, startOfToday } from "date-fns";
import Link from "next/link";
import React, { useState } from "react";
import { Container, DailyCell, Heading1, Panel } from "~c/index";
import { getDays, today } from "~l/dates";
import { useHabits } from "~l/HabitProvider";
import { dateFormat, HabitType, Occurrence } from "~l/habits";
import {
  getHslBackgroundColor,
  getHslTextColor,
  getRandomInt,
} from "../../utils/helper";

const follow = {
  [Occurrence.Daily]: "day",
  [Occurrence.Weekly]: "week",
  [Occurrence.Monthly]: "month",
  [Occurrence.Yearly]: "year",
};

export const View = ({ habit }: { habit: HabitType }) => {
  const [viewHabit, setHabit] = useState(habit);
  const { userHasAccessToHabit, toggleHabit } = useHabits();
  if (!userHasAccessToHabit(habit)) {
    return null;
  }
  const days = getDays(today, "week");

  const tint = getRandomInt(255);
  return (
    <Container>
      <Panel className="mx-4 sm:mx-10 max-w-3xl">
        <header
          className="text-center px-4 py-8 relative"
          style={{
            backgroundColor: getHslBackgroundColor(tint),
          }}
        >
          <div className="flex absolute right-4 gap-4 w-28 justify-center">
            <Link href={`/habits/edit/${viewHabit.slug}`}>
              <a
                style={{
                  color: getHslTextColor(tint),
                }}
                title={`Edit "${viewHabit.name}"`}
                className="w-6 h-6 hover:underline focus:underline"
              >
                Edit
              </a>
            </Link>
            <Link href={`/habits/delete/${viewHabit.slug}`}>
              <a
                style={{
                  color: getHslTextColor(tint),
                }}
                title={`Delete "${viewHabit.name}"`}
                className="w-6 h-6 hover:underline focus:underline"
              >
                Delete
              </a>
            </Link>
          </div>
          <Heading1 className="">{viewHabit.name}</Heading1>
          <p className="text-gray-600">{viewHabit.description}</p>
        </header>
        <article className="px-4 py-4">
          <p>
            Created:{" "}
            <span>{formatDistance(viewHabit.createdAt, new Date())} ago</span>
          </p>
          <p>
            You should try to execute this habit every{" "}
            {follow[viewHabit.occurrence]}
          </p>
          <div className="flex flex-col gap-2 my-4 h-full overflow-auto max-h-96">
            {/* render current month, there will be potentially weekly view, daily view with option for notes,
           navigation arrows to browse to previous/next period*/}
            {days.map((day) => {
              const key = format(day, dateFormat);
              const disabled = isAfter(day, startOfToday());
              return (
                <div
                  key={key}
                  className="flex items-center h-16 w-full rounded-lg  bg-white hover:bg-gray-50"
                >
                  <div
                    className="flex items-center w-44 h-full rounded-l-lg"
                    style={{
                      backgroundColor: getHslBackgroundColor(tint),
                    }}
                  >
                    <p
                      className=" pl-6"
                      style={{
                        color: getHslTextColor(tint),
                      }}
                    >
                      {format(day, "eee, do 'of' MMM")}
                    </p>
                  </div>
                  <div className="flex-grow flex justify-center py-3 px-6 ">
                    <DailyCell
                      habit={viewHabit}
                      dateKey={key}
                      disabled={disabled}
                      handleToggle={() => {
                        toggleHabit(viewHabit, key, (habit) => setHabit(habit));
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </Panel>
    </Container>
  );
};
