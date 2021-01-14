import { useRouter } from "next/router";
import React from "react";
import { View } from "../../components/habits/View";
import { useUser } from "../../lib/auth";
import { useHabits } from "../../lib/HabitProvider";
import { useHabit } from "../../lib/habits";

const ViewHabit = () => {
  useUser();
  const router = useRouter();

  const { slug } = router.query;
  const habit = useHabit(slug as string);

  const { userHasAccessToHabit } = useHabits();
  if (!userHasAccessToHabit(habit)) {
    return null;
  }
  return <View habit={habit} />;
};

export default ViewHabit;
