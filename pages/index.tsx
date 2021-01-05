import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useAuth } from "../lib/auth";

export default function Home() {
  const auth = useAuth();
  return (
    <div className={styles.container}>
      <Head>
        <title>Habit tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Habit tracker</h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <button
            onClick={() => {
              auth.signup("test@user.com", "testPass");
            }}
          >
            Sign Up with test@user.com / testPass
          </button>
          <button
            onClick={() => {
              auth.signin("test@user.com", "testPass");
            }}
          >
            Sign In with test@user.com / testPass
          </button>
          {auth.user && (
            <button
              onClick={() => {
                auth.signout();
              }}
            >
              Sign Out
            </button>
          )}
          <div>
            <h2>{auth?.user?.email || "No user"}</h2>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <pre>{auth?.user?.email || "No user"}</pre>
      </footer>
    </div>
  );
}
