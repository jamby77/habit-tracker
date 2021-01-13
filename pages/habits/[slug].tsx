import { useRouter } from "next/router";
import React from "react";
import { HabitView } from "../../components/HabitView";
import { useAuth } from "../../lib/auth";
import { useHabit } from "../../lib/habits";

const ViewHabit = () => {
  const { user } = useAuth();
  const router = useRouter();

  const { slug } = router.query;
  const habit = useHabit(slug as string);

  if (!user || !habit) {
    console.log({ user, habit });
    return null;
  }
  return <HabitView habit={habit} />;
};

export default ViewHabit;
