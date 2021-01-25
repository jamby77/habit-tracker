import React from "react";
import PasswordGenerator from "~c/auth/PasswordGenerator";
import { useUser } from "~l/auth";
import { useTitle } from "~l/layout";

const Profile = () => {
  useTitle("Edit profile");
  const { user } = useUser();
  if (!user) {
    return null;
  }
  return (
    <div>
      User profile
      <PasswordGenerator />
    </div>
  );
};

export default Profile;
