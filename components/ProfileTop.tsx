import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuth } from "~l/auth";

const ProfileTop = () => {
  const {
    user: { user },
    signout,
  } = useAuth();
  return (
    <div className="flex flex-col items-center">
      <Link href="/acctmgmt/profile">
        <a title="Edit profile">
          <Image
            alt={user.firstName}
            width={40}
            height={40}
            className="rounded-full"
            src={`https://unavatar.now.sh/${user.email}`}
          />
        </a>
      </Link>
      <button onClick={() => signout()}>Sign Out</button>
    </div>
  );
};

export default ProfileTop;
