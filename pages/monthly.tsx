import React from "react";
import { DisplayHabits } from "../components";
import { useUser } from "../lib/auth";
import { useTitle } from "../lib/layout";

const monthly = () => {
  useTitle("Monthly habits");
  const { user } = useUser();
  if (!user) {
    return null;
  }
  return <DisplayHabits type={"month"} />;
};

export default monthly;
