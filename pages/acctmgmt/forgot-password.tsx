import { useRouter } from "next/router";
import { useState } from "react";
import { ResetPasswordEmail } from "~c/auth";
import { useAuth } from "~l/auth";
import { useLayout } from "~l/layout";

const ForgotPassword = () => {
  const router = useRouter();
  const { success } = useLayout();
  const { sendPasswordResetEmail } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const handlePasswordResetSendEmail = (email: string) => {
    setSubmitting(true);
    sendPasswordResetEmail(email)
      .then((result) => {
        setSubmitting(false);
        if (result) {
          success(`Password reset email sent to ${email}`);
          router.push("/");
        }
      })
      .catch(() => setSubmitting(false));
  };

  return (
    <ResetPasswordEmail
      submitting={submitting}
      handleSubmit={handlePasswordResetSendEmail}
    />
  );
};

export default ForgotPassword;
