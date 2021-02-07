import { useRouter } from "next/router";
import queryString from "query-string";
import React, { createContext, useContext, useEffect, useState } from "react";
import { createUser, loadUser, userUpdate } from "./db";
import firebase from "./firebase";
import { useLayout } from "./layout";

export type CloudinaryPic = {
  access_mode: string;
  asset_id: string;
  bytes: number;
  created_at: string;
  etag: string;
  format: string;
  height: number;
  original_filename: string;
  public_id: string;
  secure_url: string;
  signature: string;
  version: number;
  version_id: string;
  width: number;
};
export interface User extends firebase.User {
  firstName?: string;
  lastName?: string;
  name?: string;
  provider?: string;
  imageUrl?: string;
  profilePic?: CloudinaryPic;
}

export interface AppUser {
  uid: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  provider: string;
  profilePic?: CloudinaryPic;
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
  verifyPassResetCode?: (code?: string) => Promise<string | null>;
  updateUser?: (user: AppUser) => Promise<boolean>;
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
    profilePic: user.profilePic,
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
          .then(() => {
            loadUser(user.uid).then((user) =>
              setUser({ state: "loggedIn", user: user as AppUser })
            );
          })
          .catch((err) => {
            console.dir(err);
            error(err.message);
          });
      } else {
        loadUser(user.uid).then((user) =>
          setUser({ state: "loggedIn", user: user as AppUser })
        );
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

  const verifyPassResetCode = async (code) => {
    const resetCode = code || getFromQueryString("oobCode");

    try {
      return await firebase.auth().verifyPasswordResetCode(resetCode);
    } catch (err) {
      console.dir(err);
      error(err.message);
      return null;
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

  const updateUser = (user: AppUser) => {
    return userUpdate(user)
      .then(() => {
        setUser((prevState) => ({ ...prevState, user }));
        return true;
      })
      .catch(() => false);
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
    verifyPassResetCode,
    updateUser,
  };
}

const getFromQueryString = (key) => {
  return queryString.parse(window.location.search)[key];
};
