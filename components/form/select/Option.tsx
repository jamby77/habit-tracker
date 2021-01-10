import cn from "clsx";
import React from "react";
import * as ReactIs from "react-is";
import { OptionType } from "./OptionsList";

export const renderValue = (value, selected = false) => {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    (typeof value === "object" && value.label)
  ) {
    return (
      <div className="w-full">
        <div className="flex items-center">
          {/* Selected: "font-semibold", Not Selected: "font-normal" */}
          <span className="ml-3 block font-normal truncate">
            {value.label || value.value || value}
          </span>
        </div>
        {/*
          Checkmark, only display for selected option.
          Highlighted: "text-white", Not Highlighted: "text-indigo-600"
        */}
        {selected && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-purple-900">
            {/* Heroicon name: check */}
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        )}
      </div>
    );
  }
  if (ReactIs.isValidElementType(value)) {
    return value;
  }
  return value.toString();
};

/**
 * Select option
 *
 * Manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
 * Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
 */
const Option = ({
  value,
  onClick,
  selected = false,
}: {
  value: OptionType | React.Component;
  onClick: () => void;
  selected: boolean;
}) => {
  return (
    <li
      id="listbox-item-0"
      role="option"
      className={cn(
        "cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-purple-400 hover:text-white border-b-2 border-white",
        {
          "bg-purple-400 text-white font-bold": selected,
        },
        {
          "text-gray-900 font-light": !selected,
        }
      )}
      onClick={onClick}
    >
      {renderValue(value, selected)}
    </li>
  );
};

export default Option;
