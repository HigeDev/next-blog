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
import { useEffect, useState, Suspense, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Komponen untuk membaca searchParams dan sync ke state
function SearchParamsReader({
  onParamsRead,
}: {
  onParamsRead: (val: string) => void;
}) {
  const searchParams = useSearchParams();
  const searchTermFromUrl = searchParams.get("searchTerm") || "";
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Kalau klik di luar formRef
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }

    // Tambahkan listener klik ke dokumen
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Hapus listener saat komponen unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

      {!(
        isSearchOpen &&
        typeof window !== "undefined" &&
        window.innerWidth < 1024
      ) && (
        <NavbarBrand href={process.env.NEXT_PUBLIC_URL}>
          <img
            src="/Hige-Logo.png"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            HigeSan
          </span>
        </NavbarBrand>
      )}

      <SignedIn>
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2"
          ref={formRef}
        >
          {(isSearchOpen ||
            (typeof window !== "undefined" && window.innerWidth >= 1024)) && (
            <TextInput
              type="text"
              placeholder="Search..."
              className={`${
                isSearchOpen && window.innerWidth < 1024
                  ? "flex-1"
                  : "w-40 hidden lg:inline"
              }`}
              value={searchTerm}
              rightIcon={AiOutlineSearch}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus={isSearchOpen}
            />
          )}

          {!isSearchOpen && (
            <button
              type="button"
              className="w-10 lg:hidden h-10 p-0 inline-flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 mx-2 cursor-pointer"
              onClick={() => setIsSearchOpen(true)}
            >
              <AiOutlineSearch size={20} />
            </button>
          )}
        </form>
      </SignedIn>

      <div className="flex md:order-2">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 mx-2 cursor-pointer"
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
            <Button color="alternative" className="cursor-pointer">
              <AiOutlineLogin className="me-2 h-4 w-4" />
              Login
            </Button>
          </Link>
        </SignedOut>

        <SignedIn>
          <NavbarToggle className="cursor-pointer" />
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
