import React, { useState } from "react";
import { Icon, Input, Label, SuccessButton } from "~c/form";
import { Container, FormContainer, FormGroup, FormRow, Panel } from "~c/index";
import PageHeader from "~c/PageHeader";

const ResetPasswordEmail = ({ handleSubmit, submitting = false }) => {
  const [email, setEmail] = useState("");
  const handleKeydown = (event: KeyboardEvent) => {
    const { code } = event;
    if (code === "Enter") {
      handleSubmit(email);
    }
  };
  return (
    <Container>
      <Panel className="max-w-md h-full w-full">
        <PageHeader title={"Reset password for"} />
        <FormContainer>
          <FormRow className="my-12">
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <div className="flex">
                <Icon
                  icon="mdi-email-outline"
                  className="w-10 z-10 pl-1 text-center text-purple-500"
                />
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="johnsmith@example.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  onKeyDown={handleKeydown}
                />
              </div>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <SuccessButton
                onClick={() => handleSubmit(email)}
                disabled={submitting}
              >
                Send reset email
              </SuccessButton>
            </FormGroup>
          </FormRow>
        </FormContainer>
      </Panel>
    </Container>
  );
};

export default ResetPasswordEmail;
