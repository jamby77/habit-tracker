import React from "react";
import * as ReactIs from "react-is";
import Arrows from "./Arrows";

export const renderValue = (value) => {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    (typeof value === "object" && value.label)
  ) {
    return (
      <span className="flex items-center w-full">
        <span className="ml-3 block truncate">
          {value.label || value.value || value}
        </span>
      </span>
    );
  }
  if (ReactIs.isValidElementType(value)) {
    return value;
  }
  return value.toString();
};

const SelectedItem = ({
  toggleOpen,
  value,
}: {
  toggleOpen: () => void;
  value: string | { label: string } | React.Component;
}) => {
  return (
    <button
      onClick={toggleOpen}
      type="button"
      aria-haspopup="listbox"
      aria-expanded="true"
      aria-labelledby="listbox-label"
      className="SelectedItem relative w-full pl-3 pr-10 py-2 bg-white border-2 border-gray-200 rounded-md shadow-sm text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-12"
    >
      {renderValue(value)}
      <Arrows />
    </button>
  );
};

export default SelectedItem;
