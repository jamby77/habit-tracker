import React from "react";
import { useUser } from "~l/auth";
import { useTitle } from "~l/layout";
import { DisplayHabits } from "../components";

const monthly = () => {
  useTitle("Monthly habits");
  const { user } = useUser();
  if (!user) {
    return null;
  }
  return <DisplayHabits type={"month"} />;
};

export default monthly;
