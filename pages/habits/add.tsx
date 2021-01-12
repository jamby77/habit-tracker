import { nanoid } from "nanoid";
import React, { useState } from "react";
import slug from "slug";
import HabitForm from "../../components/HabitForm";
import { useUser } from "../../lib/auth";
import { useHabits } from "../../lib/HabitProvider";
import { addHabit } from "../../lib/habits";
import { useLayout, useTitle } from "../../lib/layout";

export const Occurrence = {
  Daily: "d",
  Weekly: "w",
  Monthly: "m",
  Yearly: "y",
};
const baseHabit = {
  uid: "",
  name: "",
  description: "",
  occurrence: Occurrence.Daily,
  slug: "",
  completed: {},
};
const Add = () => {
  const user = useUser();
  const { success } = useLayout();
  const { refreshHabits } = useHabits();
  useTitle("Add Habit");
  const [submitting, setSubmitting] = useState(false);

  const [habit, setHabit] = useState(baseHabit);

  const handleSubmit = (habit) => {
    setSubmitting(true);
    const userHabit = { ...habit, uid: user.uid };
    userHabit.slug = `${slug(userHabit.name)}-${nanoid(5)}`;
    addHabit(userHabit).then((result) => {
      success(`${result.name} added! Do you want to add another one?`);
      setHabit({ ...baseHabit });
      setSubmitting(false);
      refreshHabits(user.uid);
    });
  };

  if (!user) {
    return null;
  }
  return (
    <HabitForm
      initialHabit={habit}
      handleSubmit={handleSubmit}
      submitting={submitting}
    />
  );
};

export default Add;
