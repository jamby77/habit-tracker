import React, { useState } from "react";
import { Occurrence } from "../pages/habits/add";
import { Button, Icon, Input, Label, Textarea } from "./form";
import Select from "./form/Select";
import {
  Container,
  FormContainer,
  FormGroup,
  FormRow,
  Heading1,
  Panel,
} from "./index";

const HabitForm = ({ initialHabit, handleSubmit, submitting }) => {
  const [habit, setHabit] = useState(initialHabit);
  const handleKeydown = (event: KeyboardEvent) => {
    const { code } = event;
    console.log(code);
    if (code === "Enter") {
      handleSubmit(habit);
    }
  };
  return (
    <Container>
      <Panel className="mx-4 sm:mx-10">
        <FormContainer>
          <div className="text-center mb-10">
            <Heading1 className="text-center">
              {habit.uid ? `Edit "${habit.name}"` : "Add habit"}
            </Heading1>
            <p>Enter habit details and save it</p>
          </div>
          <FormRow>
            <FormGroup>
              <Label htmlFor="habitName">Habit name *</Label>
              <div className="flex">
                <Icon
                  icon="mdi-debug-step-over"
                  className="w-10 z-10 pl-1 text-center text-purple-500"
                />
                <Input
                  placeholder="Drink 3l of water"
                  id="habitName"
                  name="habitName"
                  value={habit.name}
                  onChange={(event) => {
                    const name = event.target.value;
                    setHabit({ ...habit, name });
                  }}
                  onKeyDown={handleKeydown}
                />
              </div>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label htmlFor="habitDescription">Habit description</Label>
              <div className="flex">
                <Textarea
                  id="habitDescription"
                  name="habitDescription"
                  placeholder="Drink at least 3l of water during the day"
                  value={habit.description}
                  onChange={(event) => {
                    const description = event.target.value;
                    setHabit({ ...habit, description });
                  }}
                />
              </div>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label htmlFor="habitName">Habit occurs</Label>
              <div className="flex">
                <Select
                  onChange={(occurrence) => {
                    setHabit({ ...habit, occurrence });
                  }}
                  placeholder="Select habit occurrence"
                  name="habitOccurrence"
                  value={habit.occurrence}
                  options={[
                    { value: Occurrence.Daily, label: "Daily" },
                    { value: Occurrence.Weekly, label: "Weekly" },
                    { value: Occurrence.Monthly, label: "Monthly" },
                    { value: Occurrence.Yearly, label: "Yearly" },
                  ]}
                />
              </div>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Button onClick={() => handleSubmit(habit)} disabled={submitting}>
                Save habit
              </Button>
            </FormGroup>
          </FormRow>
        </FormContainer>
      </Panel>
    </Container>
  );
};

export default HabitForm;
