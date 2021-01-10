import React, { useState } from "react";
import Label from "./form/Label";
import Icon from "./form/Icon";
import Input from "./form/Input";
import Button from "./form/Button";
import Heading1 from "./Heading1";
import FormContainer from "./FormContainer";
import FromRow from "./FormRow";
import FormGroup from "./FormGroup";
import FromGroup from "./FormGroup";

const RegisterForm = ({
  onRegister,
  submitting = false,
}: {
  onRegister: (user) => void;
  submitting: boolean;
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const user = { firstName, lastName, email, password };
    if (!firstName || !lastName || !email || !password) {
      console.info("Missing required data", user);
      return;
    }
    onRegister(user);
  };
  return (
    <FormContainer>
      <div className="text-center mb-10">
        <Heading1>Register</Heading1>
        <p>Enter your information to register</p>
      </div>
      <FromRow>
        <FromRow>
          <FormGroup full={false} className="w-1/2">
            <Label htmlFor="first-name">First name</Label>
            <div className="flex">
              <Icon icon={"mdi-account-outline"} />
              <Input
                id="first-name"
                name="first-name"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
          </FormGroup>
          <FormGroup full={false} className="w-1/2">
            <Label htmlFor="last-name">Last name</Label>
            <div className="flex">
              <Icon icon={"mdi-account-outline"} />
              <Input
                type="text"
                id="last-name"
                name="last-name"
                placeholder="Smith"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
          </FormGroup>
        </FromRow>
        <FromRow>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <div className="flex">
              <Icon icon={"mdi-email-outline"} />
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
        </FromRow>
        <FromRow>
          <FormGroup className="mb-12">
            <Label htmlFor="password">Password</Label>
            <div className="flex">
              <Icon icon={"mdi-lock-outline"} />
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
        </FromRow>
        <FromRow>
          <FromGroup>
            <Button onClick={handleSubmit} disabled={submitting}>
              Register Now
            </Button>
          </FromGroup>
        </FromRow>
      </FromRow>
    </FormContainer>
  );
};

export default RegisterForm;
