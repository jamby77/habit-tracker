import { format } from "date-fns";
import React from "react";

const DaysHeading = ({ days = [] }) => {
  return (
    <div className="DaysHeading flex flex-row justify-between h-16 items-center">
      {days.map((day) => {
        return (
          <div
            className="h-10 w-10 text-xs text-center flex-shrink-0"
            key={day.toDateString()}
          >
            <div>{format(day, "dd")}</div>
            <div>{format(day, "EE")}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DaysHeading;
