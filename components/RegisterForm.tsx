import React from "react";
import Label from "./form/Label";
import Icon from "./form/Icon";
import Input from "./form/Input";
import Button from "./form/Button";

const RegisterForm = () => {
  return (
    <div className="w-full py-10 px-5 md:px-10">
      <div className="text-center mb-10">
        <h1 className="font-bold text-3xl text-gray-900 uppercase">Register</h1>
        <p>Enter your information to register</p>
      </div>
      <div>
        <div className="flex -mx-3">
          <div className="w-1/2 px-3 mb-5">
            <Label htmlFor="first-name">First name</Label>
            <div className="flex">
              <Icon icon={"mdi-account-outline"} />
              <Input
                id="first-name"
                name="first-name"
                type="text"
                placeholder="John"
              />
            </div>
          </div>
          <div className="w-1/2 px-3 mb-5">
            <Label htmlFor="last-name">Last name</Label>
            <div className="flex">
              <Icon icon={"mdi-account-outline"} />
              <Input
                type="text"
                id="last-name"
                name="last-name"
                placeholder="Smith"
              />
            </div>
          </div>
        </div>
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
              />
            </div>
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-5">
            <Button>REGISTER NOW</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
