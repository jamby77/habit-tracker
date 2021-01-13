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
import { useAuth } from "../../../lib/auth";
import { useHabits } from "../../../lib/HabitProvider";
import { removeHabit, useHabit } from "../../../lib/habits";
import { useLayout, useTitle } from "../../../lib/layout";

const DeleteHabit = () => {
  const { user } = useAuth();
  useTitle("Delete Habit");
  const router = useRouter();
  const { success } = useLayout();
  const { refreshHabits } = useHabits();

  const { slug } = router.query;
  const habit = useHabit(slug as string);

  const handleDelete = (habitDelete) => {
    removeHabit(habitDelete).then(() => {
      success(`${habitDelete.name} deleted!`);
      refreshHabits(user.uid);
      setTimeout(() => {
        router.push("/dashboard");
      }, 100);
    });
  };

  if (!user || !habit) {
    console.log({ user, habit });
    return null;
  }
  return (
    <Container>
      <Panel className="mx-4 sm:mx-10">
        <FormContainer>
          <Heading1>{`Are you sure you want to delete ${habit.name}?`}</Heading1>
          <FormRow>
            <PrimaryButton
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Cancel and return to dashboard
            </PrimaryButton>
            <DangerButton onClick={handleDelete}>
              Delete this habit
            </DangerButton>
          </FormRow>
        </FormContainer>
      </Panel>
    </Container>
  );
};

export default DeleteHabit;
