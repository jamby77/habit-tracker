import { useRouter } from "next/router";
import queryString from "query-string";
import React, { createContext, useContext, useEffect, useState } from "react";
import { createUser } from "./db";
import firebase from "./firebase";
import { useLayout } from "./layout";

const authContext = createContext<{
  user?: User;
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

export const useUser = (redirectTo?: string) => {
  const { user } = useAuth();
  const router = useRouter();
  const path = router.pathname;
  useEffect(() => {
    if (!user && user !== undefined) {
      router.push("/signin");
    } else {
      router.push(redirectTo || path);
    }
  }, [user]);
  return user;
};

export interface User extends firebase.User {
  firstName?: string;
  lastName?: string;
}

const formatUser = (user: User) => {
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
  const [user, setUser] = useState(undefined);
  const { error } = useLayout();

  const handleUser = (rawUser: User | false | null, create = false) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      if (create) {
        createUser(user.uid, user)
          .then(() => setUser(user))
          .catch((err) => {
            console.dir(err);
            error(err.message);
          });
      } else {
        setUser(user);
      }
      return user;
    }

    setUser(false);
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

  const signup = ({ email, password, firstName, lastName }) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        return handleUser({ ...response.user, firstName, lastName }, true);
      })
      .catch((err) => {
        console.dir(err);
        error(err.message);
        return false;
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser(false);
        return true;
      })
      .catch((err) => {
        console.dir(err);
        error(err.message);
        return false;
      });
  };

  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.dir(err);
        error(err.message);
        return false;
      });
  };

  const confirmPasswordReset = (password, code) => {
    const resetCode = code || getFromQueryString("oobCode");

    return firebase
      .auth()
      .confirmPasswordReset(resetCode, password)
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.dir(err);
        error(err.message);
        return false;
      });
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
