import React, { useState } from "react";
import { Icon, Input, Label, SuccessButton } from "~c/form";
import { Container, FormContainer, FormGroup, FormRow, Panel } from "~c/index";
import PageHeader from "~c/PageHeader";

const ResetPasswordNewPassword = ({
  email,
  handleSubmit,
  submitting = false,
}) => {
  const [pass, setPass] = useState("");
  const handleKeydown = (event: KeyboardEvent) => {
    const { code } = event;
    if (code === "Enter") {
      handleSubmit(pass);
    }
  };
  return (
    <Container>
      <Panel className="max-w-md h-full w-full">
        <PageHeader title={`Set password for ${email}`} />
        <FormContainer>
          <FormRow className="my-12">
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <div className="flex">
                <Icon
                  icon="mdi-lock-outline"
                  className="w-10 z-10 pl-1 text-center text-purple-500"
                />
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="************"
                  value={pass}
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                  onKeyDown={handleKeydown}
                />
              </div>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <SuccessButton
                onClick={() => handleSubmit(pass)}
                disabled={submitting}
              >
                Set new password
              </SuccessButton>
            </FormGroup>
          </FormRow>
        </FormContainer>
      </Panel>
    </Container>
  );
};

export default ResetPasswordNewPassword;
