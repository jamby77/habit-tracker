import { useTitle } from "../lib/layout";

const Home = () => {
  // const auth = useAuth();
  useTitle("Dashboard");
  return (
    <div className="h-full w-full">
      <h1 className="text-3xl font-bold text-center py-4">Habit tracker</h1>
      <div className="text-center">
        <pre>TODO: dashboard here</pre>
      </div>
    </div>
  );
};

export default Home;
