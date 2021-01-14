import { useRouter } from "next/router";
import React from "react";
import {
  Container,
  FormContainer,
  FormRow,
  Heading1,
  Panel,
} from "../../../components";
import { DangerButton, PrimaryButton } from "../../../components/form";
import { useUser } from "../../../lib/auth";
import { useHabits } from "../../../lib/HabitProvider";
import { removeHabit, useHabit } from "../../../lib/habits";
import { useLayout, useTitle } from "../../../lib/layout";

const DeleteHabit = () => {
  const { user } = useUser();
  useTitle("Delete Habit");
  const router = useRouter();
  const { success } = useLayout();
  const { refreshHabits } = useHabits();

  const { slug } = router.query;
  const habit = useHabit(slug as string);

  const { userHasAccessToHabit } = useHabits();
  if (!userHasAccessToHabit(habit)) {
    return null;
  }

  const handleDelete = (habitDelete) => {
    removeHabit(habitDelete).then(() => {
      success(`"${habitDelete.name}" deleted!`);
      refreshHabits(user.uid);
      setTimeout(() => {
        router.back();
      }, 100);
    });
  };

  return (
    <Container>
      <Panel className="mx-4 sm:mx-10">
        <FormContainer className="max-w-screen-sm mx-auto">
          <Heading1 className="text-center">{`Are you sure you want to delete this habit?`}</Heading1>
          <p className="text-center text-xl font-bold italic">{habit.name}</p>
          <FormRow className="gap-4 mt-20">
            <PrimaryButton
              onClick={() => {
                router.back();
              }}
            >
              Cancel and go back
            </PrimaryButton>
            <DangerButton onClick={() => handleDelete(habit)}>
              Delete this habit
            </DangerButton>
          </FormRow>
        </FormContainer>
      </Panel>
    </Container>
  );
};

export default DeleteHabit;
