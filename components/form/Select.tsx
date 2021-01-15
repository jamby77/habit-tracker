import cn from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { elementParentPath } from "~l/layout";
import Popover from "./select/Popover";
import SelectedItem from "./select/SelectedItem";

/* This example requires Tailwind CSS v2.0+ */
/**
 * Custom select input
 *
 *  Custom select controls like this require a considerable amount of JS to implement from scratch.
 *  We're planning  to build some low-level libraries to make this easier with popular frameworks
 *  like React, Vue, and even Alpine.js in the near future, but in the mean time we recommend these
 *  reference guides when building your implementation:
 *
 *  https://www.w3.org/TR/wai-aria-practices/#Listbox
 *  https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html
 */
const Select = ({
  name,
  options,
  value,
  placeholder = "",
  onChange = (value) => console.log(value),
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const selectRef = useRef();

  const toggleOpen = () => {
    setOpen(!open);
  };

  const selectValue = (value) => {
    toggleOpen();
    setSelectedValue(value);
  };
  // if `value` prop changes, update selected value
  useEffect(() => {
    if (value === selectedValue) {
      return;
    }
    setSelectedValue(value);
  }, [value]);

  // when selected value changes, call on change callback
  useEffect(() => {
    onChange(selectedValue);
  }, [selectedValue]);

  // listen for click events on the document, and if target is not Select, close it
  useEffect(() => {
    if (!window) {
      return;
    }
    const listener = (event) => {
      if (selectRef.current === null) {
        return;
      }
      const target = event.target;
      const select = selectRef.current;
      const parents = elementParentPath(target);
      const b = parents.includes(select);
      if (target !== select && !b) {
        setOpen(false);
      }
    };
    window.addEventListener("click", listener);
    return () => window.removeEventListener("click", listener);
  }, []);

  return (
    <div ref={selectRef} className={cn("Select w-full", name, className)}>
      <div className="mt-1 relative">
        <SelectedItem
          toggleOpen={toggleOpen}
          options={options}
          value={selectedValue || placeholder}
        />
        {open && (
          <Popover
            options={options}
            selectedValue={selectedValue}
            onChange={selectValue}
          />
        )}
      </div>
    </div>
  );
};

export default Select;
