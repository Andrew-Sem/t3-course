import type { FC, PropsWithChildren } from "react";
import { Header } from "./Header";
import { SignIn, useUser } from "@clerk/nextjs";

export const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  const { isSignedIn } = useUser();
  return (
    <div className="flex flex-col items-center bg-gray-50 text-gray-800 dark:bg-gray-950 dark:text-gray-100">
      <Header />
      {!isSignedIn && (
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      )}
      <main className="container flex w-full flex-col">{children}</main>
    </div>
  );
};
