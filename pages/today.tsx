import { format } from "date-fns";
import React from "react";
import { Container, Heading1 } from "~c/index";
import { useUser } from "~l/auth";
import { getDays, today } from "~l/dates";
import { useHabits } from "~l/HabitProvider";
import { useTitle } from "~l/layout";

const Today = () => {
  useTitle(today);
  const days = getDays(today, "week");
  const { habits } = useHabits();
  const { user } = useUser();
  if (!user) {
    return null;
  }

  return (
    <Container>
      <div className="max-w-md h-full w-full flex flex-col items-center">
        <div className="text-left w-full">
          <Heading1 className="my-4 ml-4">Today</Heading1>
        </div>
        <div className="flex flex-row gap-1">
          {days.map((day) => {
            const isToday = day.getDate() === today.getDate();
            const classNames = isToday
              ? "bg-white border-red-400 border"
              : "bg-gray-100 text-gray-400";
            return (
              <div
                className={`rounded-lg flex flex-col w-14 h-14 justify-center items-center ${classNames}`}
                key={day.toDateString()}
              >
                <p className="text-sm leading-3">{format(day, "dd")}</p>
                <p className="text-sm">{format(day, "E")}</p>
              </div>
            );
          })}
        </div>
        <div className="w-full">
          {habits.map((habit) => {
            return <div key={habit.id}>{habit.name}</div>;
          })}
        </div>
      </div>
    </Container>
  );
};

export default Today;
