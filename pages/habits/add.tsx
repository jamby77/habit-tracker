import { nanoid } from "nanoid";
import React, { useState } from "react";
import slug from "slug";
import Form from "~c/habits/Form";
import { useUser } from "~l/auth";
import { useHabits } from "~l/HabitProvider";
import { addHabit, baseHabit } from "~l/habits";
import { useLayout, useTitle } from "~l/layout";

const Add = () => {
  const { user } = useUser();
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
    <Form
      initialHabit={habit}
      handleSubmit={handleSubmit}
      submitting={submitting}
    />
  );
};

export default Add;
