import React, { useState } from "react";
import { useLayout } from "../lib/layout";
import { Button, Icon, Input, Label } from "./form";
import FormContainer from "./FormContainer";
import FormGroup from "./FormGroup";
import FormRow from "./FormRow";
import Heading1 from "./Heading1";

const RegisterForm = ({
  onRegister,
  submitting = false,
}: {
  onRegister: (user) => void;
  submitting: boolean;
}) => {
  const { error } = useLayout();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const user = { firstName, lastName, email, password };
    if (!firstName || !lastName || !email || !password) {
      error("Missing required data. All fields are required");
      return;
    }
    onRegister(user);
  };

  const handleKeydown = (event: KeyboardEvent) => {
    const { code } = event;
    if (code === "Enter") {
      handleSubmit();
    }
  };

  return (
    <FormContainer className="RegisterForm">
      <div className="text-center mb-10">
        <Heading1>Register</Heading1>
        <p>Enter your information to register</p>
      </div>
      <div>
        <FormRow>
          <FormGroup full={false} className="w-1/2">
            <Label htmlFor="first-name">First name</Label>
            <div className="flex">
              <Icon
                icon={"mdi-account-outline"}
                className="w-10 z-10 pl-1 text-center text-purple-500"
              />
              <Input
                id="first-name"
                name="first-name"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                onKeyDown={handleKeydown}
              />
            </div>
          </FormGroup>
          <FormGroup full={false} className="w-1/2">
            <Label htmlFor="last-name">Last name</Label>
            <div className="flex">
              <Icon
                icon={"mdi-account-outline"}
                className="w-10 z-10 pl-1 text-center text-purple-500"
              />
              <Input
                type="text"
                id="last-name"
                name="last-name"
                placeholder="Smith"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                onKeyDown={handleKeydown}
              />
            </div>
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <div className="flex">
              <Icon
                icon={"mdi-email-outline"}
                className="w-10 z-10 pl-1 text-center text-purple-500"
              />
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="johnsmith@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onKeyDown={handleKeydown}
              />
            </div>
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup className="mb-12">
            <Label htmlFor="password">Password</Label>
            <div className="flex">
              <Icon
                icon={"mdi-lock-outline"}
                className="w-10 z-10 pl-1 text-center text-purple-500"
              />
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="************"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyDown={handleKeydown}
              />
            </div>
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Button onClick={handleSubmit} disabled={submitting}>
              Register Now
            </Button>
          </FormGroup>
        </FormRow>
      </div>
    </FormContainer>
  );
};

export default RegisterForm;
