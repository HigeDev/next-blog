"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Dropdown, DropdownItem } from "flowbite-react";
import { FaMoon, FaSun } from "react-icons/fa";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Hindari render sampai client-side
  }
  return (
    <Dropdown
      label={
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600">
          {theme === "dark" ? (
            <FaMoon className="h-5 w-5" />
          ) : (
            <FaSun className="h-5 w-5" />
          )}
        </span>
      }
      inline
    >
      <DropdownItem onClick={() => setTheme("light")}>Light</DropdownItem>
      <DropdownItem onClick={() => setTheme("dark")}>Dark</DropdownItem>
    </Dropdown>
  );
}
