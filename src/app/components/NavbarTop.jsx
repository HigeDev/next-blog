"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";

export default function NavbarTop() {
  const path = usePathname();
  return (
    <Navbar fluid rounded>
      <NavbarBrand href="https://flowbite-react.com">
        <img
          src="/favicon.ico"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white md:hidden sm:hidden lg:inline">
          Flowbite React
        </span>
      </NavbarBrand>
      <form className="flex max-w-md flex-col gap-4">
        <div>
          <TextInput
            type="text"
            placeholder="Search . . ."
            rightIcon={AiOutlineSearch}
          />
        </div>
      </form>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </DropdownHeader>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem>
          <DropdownDivider />
          <DropdownItem>Sign out</DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </div>
      <Button className="w-12 h-10 hidden sm:inline" color="gray" pill></Button>
      <NavbarCollapse>
        <Link href="/">
          <NavbarLink active={path === "/"} as={"div"}>
            Home
          </NavbarLink>
        </Link>
        <Link href="/about">
          <NavbarLink active={path === "/about"} as={"div"}>
            About
          </NavbarLink>
        </Link>
        <Link href="services">
          <NavbarLink active={path === "/services"} as={"div"}>
            Services
          </NavbarLink>
        </Link>
        <Link href="pricing">
          <NavbarLink active={path === "/pricing"} as={"div"}>
            Pricing
          </NavbarLink>
        </Link>
        <Link href="contact">
          <NavbarLink active={path === "/contact"} as={"div"}>
            Contact
          </NavbarLink>
        </Link>
      </NavbarCollapse>
    </Navbar>
  );
}
