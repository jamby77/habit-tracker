import React, { useState } from "react";
import Select from "~c/form/Select";
import {
  Container,
  FormContainer,
  FormGroup,
  FormRow,
  Heading1,
  Panel,
} from "~c/index";
import { Occurrence } from "~l/habits";
import { getHslBackgroundColor, getRandomInt } from "../../utils/helper";
import { Icon, Input, Label, SuccessButton, Textarea } from "../form";

const Form = ({ initialHabit, handleSubmit, submitting }) => {
  const [habit, setHabit] = useState(initialHabit);
  const handleKeydown = (event: KeyboardEvent) => {
    const { code } = event;
    if (code === "Enter") {
      handleSubmit(habit);
    }
  };
  const tint = getRandomInt(360);

  return (
    <Container>
      <Panel className="mx-0 max-w-md w-full h-full">
        <header
          className="text-left px-4 py-10"
          style={{
            backgroundColor: getHslBackgroundColor(tint),
          }}
        >
          <Heading1 className="text-left">
            {habit.uid ? habit.name : "Add habit"}
          </Heading1>
          <p>Enter habit details and save it</p>
        </header>
        <FormContainer className="bg-white">
          <FormRow className="pt-8">
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
          <FormRow className="">
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
          <FormRow className="">
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
          <FormRow className="">
            <FormGroup>
              <SuccessButton
                onClick={() => handleSubmit(habit)}
                disabled={submitting}
              >
                Save habit
              </SuccessButton>
            </FormGroup>
          </FormRow>
        </FormContainer>
      </Panel>
    </Container>
  );
};

export default Form;
