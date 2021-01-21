import { useRouter } from "next/router";
import React from "react";
import { DangerButton, PrimaryButton } from "~c/form";
import { Container, FormContainer, FormRow, Heading1, Panel } from "~c/index";
import { useUser } from "~l/auth";
import { useHabits } from "~l/HabitProvider";
import { removeHabit, useHabit } from "~l/habits";
import { useLayout, useTitle } from "~l/layout";

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
      <Panel className="mx-0 sm:mx-10 max-w-md w-full h-full">
        <FormContainer className="w-full mx-auto bg-white h-full flex flex-col justify-between">
          <div>
            <Heading1 className="text-left">{`Are you sure you want to delete this habit?`}</Heading1>
            <p className="text-center text-xl font-bold italic mt-20">
              {habit.name}
            </p>
          </div>
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
