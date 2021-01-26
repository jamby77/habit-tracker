import React from "react";
import HabitRowDays from "~c/habits/HabitRowDays";
import HabitRowName from "~c/habits/HabitRowName";
import { Container, DaysHeading, Panel } from "~c/index";
import PageHeader from "~c/PageHeader";
import {
  currentMonthAsString,
  currentWeekAsString,
  getDays,
  today,
} from "~l/dates";
import { useHabits } from "~l/HabitProvider";
import { HabitDisplayType } from "~l/habits";
import { getRandomInt } from "../../utils/helper";

const Display = ({ type }: { type: HabitDisplayType }) => {
  const { habits } = useHabits();
  const days = getDays(today, type);
  const sortedHabits = [...habits];
  sortedHabits.sort((hA, hB) => {
    const { toggledOn: a } = hA;
    const { toggledOn: b } = hB;
    if (!a && !b) {
      return 0;
    }
    if (!a) {
      return 1;
    }
    if (!b) {
      return -1;
    }
    return a.getTime() - b.getTime();
  });
  return (
    <Container>
      <Panel className="max-w-md h-full w-full">
        <div className="DisplayHabits bg-white mx-auto h-full w-full">
          <PageHeader
            title={`Daily habits (${type === "week" ? "weekly" : "monthly"})`}
          />
          <div className="tracker w-full h-full flex flex-col">
            <div className="tracker-heading w-full flex flex-col px-4 pt-6 gap-1">
              <div className="flex flex-row h-8 w-full">
                <div className="w-1/2 sm:w-40" />
                <div className="flex-grow font-bold">{`${currentMonthAsString}, ${currentWeekAsString} week`}</div>
              </div>
            </div>
            <div className="tracker-body flex flex-row w-full">
              <div className="habit-names w-1/2 sm:w-40 flex flex-col">
                <div className="space w-full h-16 font-bold flex items-center justify-center">
                  Habits
                </div>
                {sortedHabits.map((habit) => {
                  const tint = getRandomInt(360);
                  habit["tint"] = tint;
                  return (
                    <HabitRowName
                      tint={tint}
                      key={`name-${habit.name}`}
                      habit={habit}
                    />
                  );
                })}
              </div>
              <div className="habit-days overflow-x-auto flex flex-col flex-grow">
                <DaysHeading days={days} />
                {sortedHabits.map((habit) => {
                  return (
                    <HabitRowDays
                      key={`days-${habit.name}`}
                      days={days}
                      habit={habit}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </Container>
  );
};

export default Display;
