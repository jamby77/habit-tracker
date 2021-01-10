import React, { useEffect, useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import Button from "../components/form/Button";
import { useAuth } from "../lib/auth";
import OutlineButton from "../components/form/OutlineButton";
import { useRouter } from "next/router";
import Notification, { NotificationType } from "../components/Notification";
import Container from "../components/Container";
import Panel from "../components/Panel";

const LOGIN = false;
const REGISTER = true;

const Signin = () => {
  const { signup, signin, user } = useAuth();
  const router = useRouter();
  const [loginOrRegister, setLogin] = useState(LOGIN);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);
  return (
    <Container>
      <Panel className="login-panel">
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
