import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuth } from "~l/auth";

const ProfileTop = () => {
  const {
    user: { user },
    signout,
  } = useAuth();
  const profilePicSrc =
    user?.profilePic?.secure_url || `https://unavatar.now.sh/${user.email}`;
  return (
    <div className="flex flex-col items-center">
      <Link href="/acctmgmt/profile">
        <a title="Edit profile">
          <Image
            alt={user.firstName}
            width={40}
            height={40}
            className="rounded-full"
            src={profilePicSrc}
          />
        </a>
      </Link>
      <button onClick={() => signout()}>Sign Out</button>
    </div>
  );
};

export default ProfileTop;
