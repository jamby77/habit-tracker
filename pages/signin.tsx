import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import Button from "../components/form/Button";

const LOGIN = false;
const REGISTER = true;

const Signin = () => {
  const [loginOrRegister, setLogin] = useState(LOGIN);

  return (
    <div className="min-w-full min-h-full w-full h-full bg-red-100 flex items-center justify-center">
      <div
        className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
        style={{ maxWidth: "400px", minHeight: "630px" }}
      >
        <div className="flex flex-row w-full pt-10 px-5 md:px-10 gap-1">
          <Button
            className="rounded-r-none"
            onClick={() => {
              setLogin(LOGIN);
            }}
          >
            Log in
          </Button>
          <Button
            className="rounded-l-none"
            onClick={() => {
              setLogin(REGISTER);
            }}
          >
            Register
          </Button>
        </div>
        <div className="md:flex w-full">
          {loginOrRegister === REGISTER && <RegisterForm />}
          {loginOrRegister === LOGIN && <LoginForm />}
        </div>
      </div>
    </div>
  );
};

export default Signin;
