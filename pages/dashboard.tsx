import Link from "next/link";
import React from "react";
import Container from "~c/Container";
import PageHeader from "~c/PageHeader";
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
    <Container className="">
      <Panel className="bg-white h-full w-full max-w-md mx-auto sm:max-w-full">
        <PageHeader title="Dashboard" />
        <div className="px-4">
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
        </div>
      </Panel>
    </Container>
  );
};

export default Dashboard;
