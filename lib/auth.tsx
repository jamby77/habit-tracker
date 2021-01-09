import React, { useState, useEffect, useContext, createContext } from "react";
import queryString from "query-string";
import firebase from "./firebase";
import { createUser } from "./db";
import { useRouter } from "next/router";

const authContext = createContext(null);

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
  useEffect(() => {
    if (!user) {
      router.push("/signin");
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
  const [user, setUser] = useState(null);

  const handleUser = (rawUser: User | false | null, create = false) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      if (create) {
        createUser(user.uid, user).then(() => setUser(user));
      } else {
        setUser(user);
      }
      return user;
    }

    setUser(false);
    return false;
  };

  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        return handleUser(response.user);
      });
  };

  const signup = ({ email, password, firstName, lastName }) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        return handleUser({ ...response.user, firstName, lastName }, true);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser(false);
      });
  };

  const sendPasswordResetEmail = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (password, code) => {
    const resetCode = code || getFromQueryString("oobCode");

    return firebase
      .auth()
      .confirmPasswordReset(resetCode, password)
      .then(() => {
        return true;
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
