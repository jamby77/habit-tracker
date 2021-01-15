import React, { createRef, useState } from "react";
import Animator from "~c/Animator";
const initialState = [
  {
    key: "a1",
    val: "A 1",
  },
  {
    key: "a2",
    val: "A 2",
  },
  {
    key: "a3",
    val: "A 3",
  },
  {
    key: "a4",
    val: "A 4",
  },
];

const Temp = () => {
  const [items, setItems] = useState(initialState);
  const reorder = (key) => {
    // take element with key and put it in the back
    const update = [...items].filter((item) => key !== item.key);
    setItems([...update, items.find((item) => key === item.key)]);
  };

  return (
    <div className="flex flex-col w-full bg-pink-500 h-full items-center justify-center gap-4">
      <Animator>
        {items.map((item) => {
          return (
            <div
              ref={createRef()}
              key={item.key}
              id={item.key}
              className="bg-white rounded p-4 w-40 flex justify-between"
            >
              <div className="text-gray-600">{item.val}</div>
              <button onClick={() => reorder(item.key)}>Toggle</button>
            </div>
          );
        })}
      </Animator>
    </div>
  );
};

export default Temp;
