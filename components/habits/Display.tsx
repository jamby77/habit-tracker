import React, { createRef } from "react";
import Animator from "~c/Animator";
import { Container, DailyRow, DaysHeading, Panel } from "~c/index";
import PageHeader from "~c/PageHeader";
import {
  currentMonthAsString,
  currentWeekAsString,
  getDays,
  today,
} from "~l/dates";
import { useHabits } from "~l/HabitProvider";
import { HabitDisplayType } from "~l/habits";

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
        <div className="DisplayHabits bg-white mx-auto overflow-hidden h-full w-full">
          <PageHeader
            title={`Daily habits (${type === "week" ? "weekly" : "monthly"})`}
          />
          <div className="tracker overflow-hidden w-full h-full flex flex-col">
            <div className="tracker-heading w-full flex flex-col px-4 pt-6 gap-1">
              <div className="flex flex-row h-8 w-full">
                <div className="w-1/2 sm:w-40" />
                <div className="flex-grow font-bold">{`${currentMonthAsString}, ${currentWeekAsString} week`}</div>
              </div>
              <div className="flex flex-row h-10 flex-nowrap">
                <div className="w-1/2 sm:w-40 h-10 flex-shrink-0 font-bold">
                  Habits
                </div>
                <DaysHeading days={days} />
              </div>
            </div>
            <div className="tracker-body flex flex-col gap-1 w-full">
              <Animator>
                {sortedHabits.map((habit) => {
                  return (
                    <DailyRow
                      ref={createRef<HTMLDivElement>()}
                      key={habit.name}
                      days={days}
                      habit={habit}
                    />
                  );
                })}
              </Animator>
            </div>
          </div>
        </div>
      </Panel>
    </Container>
  );
};

export default Display;
