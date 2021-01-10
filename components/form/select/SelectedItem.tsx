import React from "react";
import * as ReactIs from "react-is";
import Arrows from "./Arrows";
import { OptionType } from "./OptionsList";

export const renderValue = (value, options: OptionType[]) => {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    (typeof value === "object" && value.label)
  ) {
    let displayValue = options.find((opt) => {
      if (typeof opt === "object") {
        if (opt.value === undefined) {
          return false;
        }
        return opt.value === value || opt.value === value.value;
      }
      return opt === value || opt === value.value;
    });

    // @ts-ignore-
    const display = displayValue.label || displayValue || value;
    return (
      <span className="flex items-center w-full">
        <span className="ml-3 block truncate">{display}</span>
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
  options,
}: {
  toggleOpen: () => void;
  value: string | { label: string } | JSX.Element;
  options: OptionType[];
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
      {renderValue(value, options)}
      <Arrows />
    </button>
  );
};

export default SelectedItem;
