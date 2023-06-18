import { SignOutButton, useUser } from "@clerk/nextjs";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { FC } from "react";

export const Header: FC = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    !!user && (
      <header className="flex items-end justify-between py-4">
        <h1 className="text-3xl font-semibold">The T3 course app</h1>
        <nav className="flex gap-4">
          <SignOutButton>
            <button className="flex cursor-pointer items-center gap-2 rounded-lg bg-white px-4 py-2 font-semibold text-gray-900 hover:bg-gray-200 ">
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span>SignOut</span>
            </button>
          </SignOutButton>
          <Image
            src={user.profileImageUrl}
            alt="Profile image"
            className="h-10 w-10 rounded-full"
            width={56}
            height={56}
          />
        </nav>
      </header>
    )
  );
};
