import Link from "next/link";
import React, { useState } from "react";
import { FormContainer, FormGroup, FormRow, Heading1 } from "~c/index";
import { useLayout } from "~l/layout";
import { Icon, Input, Label, SuccessButton } from "./form";

const LoginForm = ({
  onLogin,
  submitting = false,
}: {
  onLogin: (user) => void;
  submitting: boolean;
}) => {
  const { error } = useLayout();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    const user = { email, password };
    if (!email || !password) {
      error("Missing required data. Email and password are required");
      return;
    }
    onLogin(user);
  };

  const handleKeydown = (event: KeyboardEvent) => {
    const { code } = event;
    if (code === "Enter") {
      handleSubmit();
    }
  };
  return (
    <FormContainer className="LoginForm">
      <div className="text-center my-10">
        <Heading1>Log In</Heading1>
        <p>Welcome Back!</p>
      </div>
      <div>
        <FormRow>
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
          <FormGroup className="mb-12">
            <Link href="/acctmgmt/forgot-password">
              <a className="text-secondary underline">Forgot Your Password?</a>
            </Link>
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <SuccessButton onClick={handleSubmit} disabled={submitting}>
              Log In
            </SuccessButton>
          </FormGroup>
        </FormRow>
      </div>
    </FormContainer>
  );
};

export default LoginForm;
