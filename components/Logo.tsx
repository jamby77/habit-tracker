import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <Image
      className="self-center fill-current text-red-700"
      src={"/habit.svg"}
      alt="Habit"
      width={50}
      height={50}
      layout="intrinsic"
    />
  );
};

export default Logo;
