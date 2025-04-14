"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
  Button,
} from "flowbite-react";
import * as React from "react";
import { AiOutlineSearch, AiOutlineLogin } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function NavbarTop() {
  const path = usePathname();
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Hindari render sampai client-side
  }
  return (
    <Navbar fluid rounded>
      <NavbarBrand href="https://flowbite-react.com">
        <img
          src="/favicon.ico"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span>
      </NavbarBrand>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex md:order-2">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <FaMoon className="h-5 w-5" />
          ) : (
            <FaSun className="h-5 w-5" />
          )}
        </button>

        <SignedIn>
          <UserButton userProfileUrl="/dashboard?tab=profile" />
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">
            <Button color="alternative">
              <AiOutlineLogin className="me-2 h-4 w-4" />
              Login
            </Button>
          </Link>
        </SignedOut>

        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink href="/" active={path === "/"}>
          Home
        </NavbarLink>
        <NavbarLink href="/about" active={path === "/about"}>
          About
        </NavbarLink>
        <NavbarLink href="/projects" active={path === "/projects"}>
          Projects
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
