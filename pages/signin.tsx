import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import { PrimaryButton, SecondaryButton } from "../components/form";
import LoginForm from "../components/LoginForm";
import Notification, { NotificationType } from "../components/Notification";
import Panel from "../components/Panel";
import RegisterForm from "../components/RegisterForm";
import { useAuth } from "../lib/auth";

const LOGIN = false;
const REGISTER = true;

const Signin = () => {
  const { signup, signin, user } = useAuth();
  const router = useRouter();
  const [loginOrRegister, setLogin] = useState(LOGIN);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, []);
  return (
    <Container>
      <Panel className="login-panel">
        <div className="flex flex-row w-full pt-10 px-5 md:px-10">
          {loginOrRegister === REGISTER ? (
            <PrimaryButton
              className="rounded-r-none"
              onClick={() => {
                setLogin(LOGIN);
              }}
            >
              Log in
            </PrimaryButton>
          ) : (
            <SecondaryButton disabled className="rounded-r-none">
              Log in
            </SecondaryButton>
          )}

          {loginOrRegister === LOGIN ? (
            <PrimaryButton
              className="rounded-l-none"
              onClick={() => {
                setLogin(REGISTER);
              }}
            >
              Register
            </PrimaryButton>
          ) : (
            <SecondaryButton disabled className="rounded-l-none">
              Register
            </SecondaryButton>
          )}
        </div>
        {submitting && (
          <div className="flex flex-row w-full pt-10 px-5 md:px-10">
            <Notification
              message="Your info is on the way"
              type={NotificationType.Info}
            />
          </div>
        )}
        <div className="md:flex w-full">
          {loginOrRegister === REGISTER && (
            <RegisterForm
              submitting={submitting}
              onRegister={(user) => {
                setSubmitting(true);
                signup(user).then((result) => {
                  if (!result) {
                    setSubmitting(false);
                  } else {
                    router.push("/dashboard");
                  }
                });
              }}
            />
          )}
          {loginOrRegister === LOGIN && (
            <LoginForm
              submitting={submitting}
              onLogin={(user) => {
                setSubmitting(true);
                signin(user).then((result) => {
                  if (!result) {
                    setSubmitting(false);
                  } else {
                    router.push("/dashboard");
                  }
                });
              }}
            />
          )}
        </div>
      </Panel>
    </Container>
  );
};

export default Signin;
