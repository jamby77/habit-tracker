import Link from "next/link";
import React from "react";
import { useUser } from "~l/auth";
import { useHabits } from "~l/HabitProvider";
import { useTitle } from "~l/layout";
import { Panel } from "../components";

const Dashboard = () => {
  useTitle("Dashboard");
  const { state, user } = useUser();
  const { habits } = useHabits();
  if (state === "init") {
    return <div>Loading ...</div>;
  }
  if (!user) {
    return null;
  }
  return (
    <div className="h-full w-full">
      <h1 className="text-3xl font-bold text-center py-4">Dashboard</h1>
      <Panel className="py-4 sm:py-10 px-4 sm:px-8 bg-white">
        <h2 className="text-2xl font-semibold">Summary</h2>
        <h3>{`You have ${habits.length} habits configured`}</h3>
        <p>See performance by:</p>
        <ul>
          <li>
            <Link href="/weekly">
              <a className="font-bold">Week</a>
            </Link>
          </li>
          <li>
            <Link href="/monthly">
              <a className="font-bold">Month</a>
            </Link>
          </li>
        </ul>
      </Panel>
    </div>
  );
};

export default Dashboard;
