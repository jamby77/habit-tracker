import { useRouter } from "next/router";
import { useState } from "react";
import { ResetPasswordEmail, ResetPasswordNewPassword } from "~c/auth";
import { acctmgmtModes, useAuth } from "~l/auth";

const Index = () => {
  const router = useRouter();
  const { sendPasswordResetEmail } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const { mode, oobCode } = router.query;
  const handlePasswordResetSendEmail = (email: string) => {
    setSubmitting(true);
    console.log(`Handle email reset with fb.auth, ${email}`);
    sendPasswordResetEmail(email).then(() => setSubmitting(false));
  };
  if (mode === acctmgmtModes.RESET_PASSWORD && !oobCode) {
    return (
      <ResetPasswordEmail
        submitting={submitting}
        handleSubmit={handlePasswordResetSendEmail}
      />
    );
  }
  if (mode === acctmgmtModes.RESET_PASSWORD && oobCode) {
    // clicked the email link
    return (
      <ResetPasswordNewPassword
        email={"todo"}
        submitting={submitting}
        handleSubmit={handlePasswordResetSendEmail}
      />
    );
  }
  return <div>{`${mode}, ${oobCode}`}</div>;
};

export default Index;
