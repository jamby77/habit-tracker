import React, { useState } from "react";
import Label from "./form/Label";
import Icon from "./form/Icon";
import Input from "./form/Input";
import Button from "./form/Button";

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
    <div className="w-full py-10 px-5 md:px-10">
      <div className="text-center mb-10">
        <h1 className="font-bold text-3xl text-gray-900 uppercase">Log In</h1>
        <p>Welcome Back!</p>
      </div>
      <div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-5">
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
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-12">
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
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-5">
            <Button onClick={handleSubmit} disabled={submitting}>
              Log In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
