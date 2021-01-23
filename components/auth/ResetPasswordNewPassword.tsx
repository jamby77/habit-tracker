import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Icon, Input, Label, SuccessButton } from "~c/form";
import { Container, FormContainer, FormGroup, FormRow, Panel } from "~c/index";
import PageHeader from "~c/PageHeader";
import { useAuth } from "~l/auth";
import { useLayout } from "~l/layout";

const ResetPasswordNewPassword = ({ code = "" }) => {
  const router = useRouter();
  const { success } = useLayout();
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { verifyPassResetCode, confirmPasswordReset } = useAuth();

  function handleSubmit(pass: string) {
    if (submitting) {
      return;
    }
    setSubmitting(true);
    confirmPasswordReset(pass, code)
      .then(() => {
        success("Password changed, please login");
        router.push("/signin");
      })
      .catch(() => setSubmitting(false));
  }

  const handleKeydown = (event: KeyboardEvent) => {
    const { code } = event;
    if (code === "Enter") {
      handleSubmit(pass);
    }
  };

  useEffect(() => {
    verifyPassResetCode(code).then((email) => {
      setEmail(email);
    });
  }, [code]);
  if (!email) {
    return null;
  }
  return (
    <Container>
      <Panel className="max-w-md h-full w-full">
        <PageHeader title={`Set password for ${email}`} />
        <FormContainer>
          <FormRow className="my-12">
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
                  value={pass}
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                  onKeyDown={handleKeydown}
                />
              </div>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <SuccessButton
                onClick={() => handleSubmit(pass)}
                disabled={submitting}
              >
                Set new password
              </SuccessButton>
            </FormGroup>
          </FormRow>
        </FormContainer>
      </Panel>
    </Container>
  );
};

export default ResetPasswordNewPassword;
