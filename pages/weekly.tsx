import React from "react";
import { DisplayHabits } from "~c/index";
import { useUser } from "~l/auth";
import { useTitle } from "~l/layout";

const weekly = () => {
  useTitle("Weekly habits");
  const { user } = useUser();
  if (!user) {
    return null;
  }
  return <DisplayHabits type={"week"} />;
};

export default weekly;
