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
import { AiOutlineSearch, AiOutlineLogin } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState, Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

// Komponen untuk membaca searchParams dan sync ke state
function SearchParamsReader({
  onParamsRead,
}: {
  onParamsRead: (val: string) => void;
}) {
  const searchParams = useSearchParams();
  const searchTermFromUrl = searchParams.get("searchTerm") || "";

  useEffect(() => {
    onParamsRead(searchTermFromUrl);
  }, [searchTermFromUrl, onParamsRead]);

  return null;
}

export default function Header() {
  const path = usePathname();
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleParamsRead = useCallback((val: string) => {
    setSearchTerm(val);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    if (searchTerm) urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Navbar fluid rounded>
      <Suspense fallback={null}>
        <SearchParamsReader onParamsRead={handleParamsRead} />
      </Suspense>

      <NavbarBrand href={process.env.NEXT_PUBLIC_URL}>
        <Image
          src="/Hige-Logo.png"
          className="mr-3 h-6 sm:h-9"
          width={40}
          height={40}
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span>
      </NavbarBrand>

      <SignedIn>
        <form onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <Button className="w-12 h-10 lg:hidden" color="gray" pill>
          <AiOutlineSearch />
        </Button>
      </SignedIn>

      <div className="flex md:order-2">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 mx-2"
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

        <SignedIn>
          <NavbarToggle />
        </SignedIn>
      </div>

      <SignedIn>
        <NavbarCollapse>
          <NavbarLink href="/" active={path === "/"}>
            Home
          </NavbarLink>
          <NavbarLink href="/about" active={path === "/about"}>
            About
          </NavbarLink>
          <NavbarLink href="/project" active={path === "/project"}>
            Projects
          </NavbarLink>
        </NavbarCollapse>
      </SignedIn>
    </Navbar>
  );
}
