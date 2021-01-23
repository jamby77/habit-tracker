import { useRouter } from "next/router";
import { ResetPasswordNewPassword } from "~c/auth";
import { acctmgmtModes } from "~l/auth";

const Index = () => {
  const router = useRouter();
  const { mode, oobCode } = router.query;

  if (mode === acctmgmtModes.RESET_PASSWORD) {
    // clicked the email link
    return <ResetPasswordNewPassword code={oobCode as string} />;
  }
  return <div>{`${mode}, ${oobCode}`}</div>;
};

export default Index;
