import { format, formatDistance, isAfter, startOfToday } from "date-fns";
import React from "react";
import { getDays, today } from "../../lib/dates";
import { useHabits } from "../../lib/HabitProvider";
import { dateFormat, HabitType, Occurrence } from "../../lib/habits";
import { Container, DailyCell, Heading1, Panel } from "../index";

const follow = {
  [Occurrence.Daily]: "day",
  [Occurrence.Weekly]: "week",
  [Occurrence.Monthly]: "month",
  [Occurrence.Yearly]: "year",
};

export const View = ({ habit }: { habit: HabitType }) => {
  const { userHasAccessToHabit } = useHabits();
  if (!userHasAccessToHabit(habit)) {
    return;
  }
  const days = getDays(today, "week");

  return (
    <Container>
      <Panel className="mx-4 sm:mx-10">
        <header className="text-center px-4 py-4">
          <Heading1>{habit.name}</Heading1>
          <p className="">{habit.description}</p>
        </header>
        <article className="px-4 py-4">
          <p>
            Created:{" "}
            <span>{formatDistance(habit.createdAt, new Date())} ago</span>
          </p>
          <p>
            You should try to execute this habit every{" "}
            {follow[habit.occurrence]}
          </p>
          <div className="flex flex-col gap-4 my-4">
            {/* render current month, there will be potentially weekly view, daily view with option for notes,
           navigation arrows to browse to previous/next period*/}
            {days.map((day) => {
              const key = format(day, dateFormat);
              const disabled = isAfter(day, startOfToday());
              return (
                <div
                  key={key}
                  className="flex items-center w-full py-3 px-6 rounded-lg border-2"
                >
                  <div className="w-36">{format(day, "eee, do 'of' MMM")}</div>
                  <div className="flex-grow flex justify-center">
                    <DailyCell
                      habit={habit}
                      dateKey={key}
                      disabled={disabled}
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
