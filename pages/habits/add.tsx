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

const Add = () => {
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = () => {
    setSubmitting(true);
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
                <Input placeholder="Drink 3l of water" />
              </div>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label htmlFor="habitName">Habit description</Label>
              <div className="flex">
                <Textarea placeholder="Drink at least 3l of water during the day" />
              </div>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label htmlFor="habitName">Habit occurs</Label>
              <div className="flex">
                <Select
                  className=""
                  placeholder="Select habit occurrence"
                  name="habitOccurrence"
                  value={"Daily"}
                  options={["Daily", "Weekly", "Monthly", "Yearly"]}
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
