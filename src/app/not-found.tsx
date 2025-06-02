"use client";

import Link from "next/link";
import { Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="text-center">
        <HiOutlineExclamationCircle className="text-red-500 w-20 h-20 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" passHref>
          <Button color="blue" pill className="mx-auto cursor-pointer">
            Go back home
          </Button>
        </Link>
      </div>
    </div>
  );
}
