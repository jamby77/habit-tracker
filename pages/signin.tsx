import React, { useEffect, useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import Button from "../components/form/Button";
import { useAuth } from "../lib/auth";
import OutlineButton from "../components/form/OutlineButton";
import { useRouter } from "next/router";

const LOGIN = false;
const REGISTER = true;

const Signin = () => {
  const { signup, signin, user } = useAuth();
  const router = useRouter();
  const [loginOrRegister, setLogin] = useState(LOGIN);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);
  return (
    <div className="min-w-full min-h-full w-full h-full bg-red-100 flex items-center justify-center">
      <div
        className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
        style={{ maxWidth: "400px", minHeight: "630px" }}
      >
        <div className="flex flex-row w-full pt-10 px-5 md:px-10">
          {loginOrRegister === REGISTER ? (
            <Button
              className="rounded-r-none"
              onClick={() => {
                setLogin(LOGIN);
              }}
            >
              Log in
            </Button>
          ) : (
            <OutlineButton disabled className="rounded-r-none">
              Log in
            </OutlineButton>
          )}

          {loginOrRegister === LOGIN ? (
            <Button
              className="rounded-l-none"
              onClick={() => {
                setLogin(REGISTER);
              }}
            >
              Register
            </Button>
          ) : (
            <OutlineButton disabled className="rounded-l-none">
              Register
            </OutlineButton>
          )}
        </div>
        <div className="md:flex w-full">
          {loginOrRegister === REGISTER && (
            <RegisterForm
              onRegister={(user) => {
                signup(user);
              }}
            />
          )}
          {loginOrRegister === LOGIN && <LoginForm />}
        </div>
      </div>
    </div>
  );
};

export default Signin;
