import { Button } from "flowbite-react";
import Image from "next/image";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";

export default function About() {
  return (
    <section className="bg-white dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
        {/* Title */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            About
          </h2>
          <p className="mt-4 mb-10 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">
            Crafted with skill and care to help our clients grow their business!
          </p>
        </div>
        {/* Responsive Layout */}
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* Image Content - 4 columns on lg */}
          <div className="text-center mx-auto lg:col-span-5 col-span-12">
            <Image
              src="/ProfileHige.jpeg"
              width={320}
              height={320}
              alt="Flowbite dashboard"
              className="w-80 h-80 rounded-full border-4 border-white shadow-2xl object-cover mx-auto"
            />
          </div>

          {/* Text Content - 8 columns on lg */}
          <div className="lg:col-span-7 col-span-12">
            <h3 className="text-2xl font-bold mb-2">
              Dominicus Agfid Surya Putra
            </h3>
            <a
              href="https://higesan.store"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              https://higesan.store ↗
            </a>
            <p className="text-gray-400 mt-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus facilis consequatur possimus dolore nostrum ullam,
              debitis, rerum dolor neque ut nulla dolorem cum ea nam
              necessitatibus quia nesciunt! Dolorum, velit.
            </p>
            {/* Icons */}
            <div className="flex justify-center lg:justify-start gap-4 mt-6 text-gray-600 text-xl">
              <BsFacebook className="hover:text-blue-600 transition-colors duration-200 cursor-pointer" />
              <BsInstagram className="hover:text-pink-500 transition-colors duration-200 cursor-pointer" />
              <BsTwitter className="hover:text-sky-500 transition-colors duration-200 cursor-pointer" />
              <BsGithub className="hover:text-gray-900 transition-colors duration-200 cursor-pointer" />
              <BsDribbble className="hover:text-pink-400 transition-colors duration-200 cursor-pointer" />
            </div>

            {/* Button */}
            <div className="mt-6 text-center lg:text-left">
              <Button color="blue">View case study →</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
