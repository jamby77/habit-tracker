import React from "react";

/**
 * Help circle
 *
 * @see https://materialdesignicons.com/ - help-circle
 * @param props
 * @constructor
 */
const UnknownIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      focusable="false"
      width="1em"
      height="1em"
      style={{
        msTransform: "rotate(360deg)",
        WebkitTransform: "rotate(360deg)",
        transform: "rotate(360deg)",
      }}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M9 16v-6H5l7-7l7 7h-4v6H9m-4 4v-2h14v2H5z" fill="currentColor" />
    </svg>
  );
};

export default UnknownIcon;
