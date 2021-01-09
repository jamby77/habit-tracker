import { useTitle } from "../lib/layout";
import { useUser } from "../lib/auth";

const Dashboard = () => {
  useTitle("Dashboard");
  const user = useUser();
  if (!user) {
    return null;
  }
  return (
    <div className="h-full w-full">
      <h1 className="text-3xl font-bold text-center py-4">Dashboard</h1>
      <div className="text-center">
        <pre>TODO: dashboard here</pre>
      </div>
    </div>
  );
};

export default Dashboard;
