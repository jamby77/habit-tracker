import { Error, Success, Warning } from "../components/alerts";
import Notification, { NotificationType } from "../components/Notification";
import { useUser } from "../lib/auth";
import { useTitle } from "../lib/layout";

const Dashboard = () => {
  useTitle("Dashboard");
  const user = useUser();
  if (user === undefined) {
    return <div>Loading ...</div>;
  }
  if (!user) {
    return null;
  }
  return (
    <div className="h-full w-full">
      <h1 className="text-3xl font-bold text-center py-4">Dashboard</h1>
      <div className="text-center">
        <Notification
          type={NotificationType.Info}
          title="Alternative title"
          message={"Sample info"}
        />
        <Success message={"Sample Success"} />
        <Warning message={"Sample warning"} />
        <Error message={"Sample error"} />
      </div>
    </div>
  );
};

export default Dashboard;
