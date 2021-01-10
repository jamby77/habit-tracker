import React, { useState } from "react";
import Heading1 from "./Heading1";
import FormContainer from "./FormContainer";
import FormRow from "./FormRow";
import FormGroup from "./FormGroup";
import { Button, Icon, Input, Label } from "./form";

const LoginForm = ({
  onLogin,
  submitting = false,
}: {
  onLogin: (user) => void;
  submitting: boolean;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    const user = { email, password };
    if (!email || !password) {
      console.info("Missing required data", user);
      return;
    }
    onLogin(user);
  };
  return (
    <FormContainer>
      <div className="text-center mb-10">
        <Heading1>Log In</Heading1>
        <p>Welcome Back!</p>
      </div>
      <div>
        <FormRow>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <div className="flex">
              <Icon icon="mdi-email-outline" />
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="johnsmith@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup className="mb-12">
            <Label htmlFor="password">Password</Label>
            <div className="flex">
              <Icon icon="mdi-lock-outline" />
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="************"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Button onClick={handleSubmit} disabled={submitting}>
              Log In
            </Button>
          </FormGroup>
        </FormRow>
      </div>
    </FormContainer>
  );
};

export default LoginForm;
