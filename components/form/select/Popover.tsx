import React from "react";
import OptionsList from "./OptionsList";

/**
 * Select popover, show/hide based on select state.
 */
const Popover = ({ options, selectedValue, onChange }) => {
  return (
    <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
      <OptionsList
        options={options}
        selectedValue={selectedValue}
        onItemSelected={(v) => {
          onChange(v);
        }}
      />
    </div>
  );
};

export default Popover;
