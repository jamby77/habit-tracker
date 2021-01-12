import Image from "next/image";
import React from "react";
import { useAuth } from "../lib/auth";

const ProfileTop = () => {
  const { user, signout } = useAuth();
  return (
    <div className="flex flex-col items-center">
      <Image
        alt={user.firstName}
        width={40}
        height={40}
        className="rounded-full"
        src={`https://unavatar.now.sh/${user.email}`}
      />
      <button onClick={() => signout()}>Sign Out</button>
    </div>
  );
};

export default ProfileTop;