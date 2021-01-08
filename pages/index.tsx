import Link from "next/link";
import { useLayout } from "../lib/layout";

const Home = () => {
  // const auth = useAuth();
  const { setTitle } = useLayout();
  setTitle("Dashboard");
  return (
    <div className="h-full w-full">
      <h1 className="text-3xl font-bold text-center py-4 ">Habit tracker</h1>
      <Link href="/weekly">
        <a>Weekly</a>
      </Link>
    </div>
  );
};

export default Home;
