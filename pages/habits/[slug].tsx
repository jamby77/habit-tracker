import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import React, { useState } from "react";
import slugify from "slug";
import HabitForm from "../../components/HabitForm";
import { useUser } from "../../lib/auth";
import { useHabits } from "../../lib/HabitProvider";
import { editHabit, findHabit, HabitType } from "../../lib/habits";
import { useLayout, useTitle } from "../../lib/layout";

const EditHabit = () => {
  const user = useUser();
  const [habit, setHabit] = useState<HabitType>(null);
  useTitle("Edit Habit");
  const router = useRouter();
  const { refreshHabits } = useHabits();
  const { success } = useLayout();
  const [submitting, setSubmitting] = useState(false);

  const { slug } = router.query;
  findHabit(slug as string).then((habit) => {
    if (!habit) {
      return;
    }
    setHabit(habit as HabitType);
  });

  const handleSubmit = (habitUpdate) => {
    setSubmitting(true);
    const userHabit = { ...habitUpdate };
    if (userHabit.name !== habit.name) {
      userHabit.slug = `${slugify(userHabit.name)}-${nanoid(5)}`;
    }
    editHabit(userHabit).then(() => {
      success(`${userHabit.name} updated! Do you want to do more updates?`);
      setHabit(userHabit);
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

export default EditHabit;
