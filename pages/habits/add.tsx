import React, { useState } from "react";
import {
  Container,
  FormContainer,
  FormGroup,
  FormRow,
  Heading1,
  Panel,
} from "../../components";
import { Button, Icon, Input, Label, Textarea } from "../../components/form";
import Select from "../../components/form/Select";
import { useUser } from "../../lib/auth";
import { useTitle } from "../../lib/layout";

export const Occurrence = {
  Daily: "d",
  Weekly: "w",
  Monthly: "m",
  Yearly: "y",
};

const Add = () => {
  const user = useUser();
  useTitle("Add Habit");
  const [submitting, setSubmitting] = useState(false);
  const [habit, setHabit] = useState({
    uid: "",
    name: "",
    description: "",
    occurrence: Occurrence.Daily,
  });

  const handleSubmit = () => {
    setSubmitting(true);
    const userHabit = { ...habit, uid: user.uid };
    console.log(userHabit);
  };
  return (
    <Container>
      <Panel className="mx-4 sm:mx-10">
        <FormContainer>
          <div className="text-center mb-10">
            <Heading1 className="text-center">Add habit</Heading1>
            <p>Enter habit details and save it</p>
          </div>
          <FormRow>
            <FormGroup>
              <Label htmlFor="habitName">Habit name *</Label>
              <div className="flex">
                <Icon icon="mdi-debug-step-over" />
                <Input
                  placeholder="Drink 3l of water"
                  id="habitName"
                  name="habitName"
                  value={habit.name}
                  onChange={(event) => {
                    const name = event.target.value;
                    setHabit({ ...habit, name });
                  }}
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
              <Button onClick={handleSubmit} disabled={submitting}>
                Save habit
              </Button>
            </FormGroup>
          </FormRow>
        </FormContainer>
      </Panel>
    </Container>
  );
};

export default Add;
