import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import slugify from "slug";
import Form from "~c/habits/Form";
import { useUser } from "~l/auth";
import { useHabits } from "~l/HabitProvider";
import { editHabit, findHabit, HabitType } from "~l/habits";
import { useLayout, useTitle } from "~l/layout";

const EditHabit = () => {
  const { user } = useUser();
  const [habit, setHabit] = useState<HabitType>(null);
  useTitle("Edit Habit");
  const router = useRouter();
  const { refreshHabits } = useHabits();
  const { success } = useLayout();
  const [submitting, setSubmitting] = useState(false);

  const { slug } = router.query;
  useEffect(() => {
    findHabit(slug as string).then((serverHabit) => {
      console.log({ serverHabit });
      if (!serverHabit) {
        return;
      }
      setHabit(serverHabit as HabitType);
    });
  }, [slug]);

  const { userHasAccessToHabit } = useHabits();
  if (!userHasAccessToHabit(habit)) {
    return null;
  }
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

  return (
    <Form
      initialHabit={habit}
      handleSubmit={handleSubmit}
      submitting={submitting}
    />
  );
};

export default EditHabit;
