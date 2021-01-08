import React from "react";
import { format } from "date-fns";

const DaysHeading = ({ days = [] }) => {
  return (
    <div className="flex flex-row justify-between flex-grow">
      {days.map((day) => {
        return (
          <div className="h-10 text-xs text-center" key={day.toDateString()}>
            <div>{format(day, "dd")}</div>
            <div>{format(day, "EEEEE")}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DaysHeading;
