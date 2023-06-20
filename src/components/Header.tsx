import { SignOutButton, useUser } from "@clerk/nextjs";
import {
  ArrowRightOnRectangleIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, type FC } from "react";
import { themes } from "~/constants/theme";
import { useTheme } from "~/hooks/useTheme";
import { ListBox } from "./UI/ListBox";

const ThemeSwitcher = () => {
  const { selectedTheme, setSelectedTheme } = useTheme();
  useEffect(() => {
    const themeName = localStorage.getItem("theme") ?? "system"
    const theme = themes[themeName as "light" | "dark" | "system"] || themes.system
    setSelectedTheme(theme)
    
  }, []);
  return (
    <div className={"relative"}>
      <ListBox
        selectedValue={selectedTheme}
        setSelectedValue={setSelectedTheme}
        values={themes}
      >
        <span className={"text-sm capitalize"}>{localStorage.theme}</span>
        {localStorage.theme === "system" ? (
          window.matchMedia("(prefers-color-scheme: dark)").matches ? (
            <MoonIcon className={"h-6 w-6"} />
          ) : (
            <SunIcon className={"h-6 w-6"} />
          )
        ) : (
          <selectedTheme.Icon className={"h-6 w-6"} />
        )}
      </ListBox>
    </div>
  );
};

export const Header: FC = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    !!user && (
      <header className="bg-gray-50 dark:bg-neutral-950 flex w-full">
        <div className="container flex items-end justify-between py-4 mx-auto w-full">
        <h1 className="text-3xl font-semibold">The T3 course app</h1>
        <nav className="flex gap-4">
          <ThemeSwitcher/>
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
        </div>
      </header>
    )
  );
};
