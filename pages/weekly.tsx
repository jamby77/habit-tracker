import React from "react";
import { DisplayHabits } from "../components";
import { useUser } from "../lib/auth";
import { useTitle } from "../lib/layout";

const weekly = () => {
  useTitle("Weekly habits");
  const { user } = useUser();
  if (!user) {
    return null;
  }
  return <DisplayHabits type={"week"} />;
};

export default weekly;
