import React from "react";
import Option from "./Option";

export type ComplexOptionType = { value: string | number; label: string };
export type OptionType = ComplexOptionType | string | number;

/**
 * Select list, show/hide based on select state.
 *
 * Entering: ""
 *   From: ""
 *   To: ""
 * Leaving: "transition ease-in duration-100"
 *   From: "opacity-100"
 *   To: "opacity-0"
 */
const OptionsList = ({
  options,
  selectedValue,
  onItemSelected,
  OptionRenderer,
}: {
  options: OptionType[];
  selectedValue?: string | number;
  onItemSelected: (v: any) => void;
  OptionRenderer?: JSX.Element;
}) => {
  return (
    <ul
      tabIndex={-1}
      role="listbox"
      aria-labelledby="listbox-label"
      aria-activedescendant="listbox-item-3"
      className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
    >
      {options.map((opt, idx) => {
        let value = opt;
        if (typeof value === "object") {
          // @ts-ignore
          value = opt?.value;
        }

        let optionValue = opt;
        if (OptionRenderer) {
          // @ts-ignore
          optionValue = <OptionRenderer value={opt} />;
        }
        return (
          <Option
            key={idx}
            value={optionValue}
            selected={value === selectedValue}
            onClick={() => {
              if (selectedValue === value) {
                // item selected, deselect it
                onItemSelected(null);
                return;
              }
              onItemSelected(value);
            }}
          />
        );
      })}
    </ul>
  );
};

export default OptionsList;
