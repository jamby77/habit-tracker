import { useRouter } from "next/router";
import queryString from "query-string";
import React, { createContext, useContext, useEffect, useState } from "react";
import { createUser } from "./db";
import firebase from "./firebase";
import { useLayout } from "./layout";

export interface User extends firebase.User {
  firstName?: string;
  lastName?: string;
  name?: string;
  provider?: string;
  imageUrl?: string;
}

export interface AppUser {
  uid: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  provider: string;
}

export type UserStateType = "init" | "loggedIn" | "loggedOut";

export const acctmgmtModes = {
  RESET_PASSWORD: "resetPassword",
  RECOVER_EMAIL: "recoverEmail",
  VERIFY_EMAIL: "verifyEmail",
};

const authContext = createContext<{
  user?: { state: UserStateType; user: AppUser };
  signin?: (user: {
    email: string;
    password: string;
  }) => Promise<
    | {
        uid: string;
        firstName: string;
        lastName: string;
        provider: string;
        name: string;
        email: string;
      }
    | boolean
  >;
  signup?: (user: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<
    | {
        uid: string;
        firstName: string;
        lastName: string;
        provider: string;
        name: string;
        email: string;
      }
    | boolean
  >;
  signout?: () => Promise<boolean>;
  sendPasswordResetEmail?: (email: string) => Promise<boolean>;
  confirmPasswordReset?: (password: string, code?: string) => Promise<boolean>;
}>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

export const useUser = () => {
  const { user } = useAuth();
  const router = useRouter();
  const path = router.pathname;
  const signInPath = "/signin";

  useEffect(() => {
    // if user is logged out, and path is not sign in path
    if (path !== signInPath && user.state === "loggedOut") {
      router.push(signInPath);
    } else if (path === signInPath && user.state === "loggedIn") {
      router.back();
    }
  }, [user]);
  return user;
};

const formatUser = (user: User): AppUser => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    firstName: user.firstName,
    lastName: user.lastName,
    provider: user.providerData[0].providerId,
  };
};

function useProvideAuth() {
  const [user, setUser] = useState<{ state: UserStateType; user: AppUser }>({
    state: "init",
    user: null,
  });
  const { error } = useLayout();

  const handleUser = (rawUser: User | false | null, create = false) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      if (create) {
        createUser(user.uid, user)
          .then(() => setUser({ state: "loggedIn", user }))
          .catch((err) => {
            console.dir(err);
            error(err.message);
          });
      } else {
        setUser({ state: "loggedIn", user });
      }
      return user;
    }

    setUser({ state: "loggedOut", user: null });
    return false;
  };

  const signin = ({ email, password }) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        return handleUser(response.user);
      })
      .catch((err) => {
        console.dir(err);
        error(err.message);
        return false;
      });
  };

  const signup = async ({ email, password, firstName, lastName }) => {
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      return handleUser({ ...response.user, firstName, lastName }, true);
    } catch (err) {
      console.dir(err);
      error(err.message);
      return false;
    }
  };

  const signout = async () => {
    try {
      await firebase.auth().signOut();
      handleUser(false);
      return true;
    } catch (err) {
      console.dir(err);
      error(err.message);
      return false;
    }
  };

  const sendPasswordResetEmail = async (email) => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      return true;
    } catch (err) {
      console.dir(err);
      error(err.message);
      return false;
    }
  };

  const confirmPasswordReset = async (password, code) => {
    const resetCode = code || getFromQueryString("oobCode");

    try {
      await firebase.auth().confirmPasswordReset(resetCode, password);
      return true;
    } catch (err) {
      console.dir(err);
      error(err.message);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      handleUser(user);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}

const getFromQueryString = (key) => {
  return queryString.parse(window.location.search)[key];
};
