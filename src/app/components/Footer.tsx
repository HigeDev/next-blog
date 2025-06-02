"use client";

import {
  Footer,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import Link from "next/link";
import { BsInstagram, BsTwitterX, BsGithub, BsYoutube } from "react-icons/bs";
import { RiStockFill } from "react-icons/ri";
export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              href="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Hige
              </span>
              San
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle title="About" />
              <FooterLinkGroup col>
                <FooterLink
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About me
                </FooterLink>
                <FooterLink
                  href="/project"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Projects
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Follow us" />
              <FooterLinkGroup col>
                <FooterLink
                  href="https://github.com/HigeDev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </FooterLink>
                <FooterLink href="#">Discord</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Legal" />
              <FooterLinkGroup col>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright
            href="#"
            by="HigeSan"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <FooterIcon
              href="https://www.instagram.com/dominicus_agfid/"
              icon={BsInstagram}
            />
            <FooterIcon
              href="https://x.com/Dominicus_Agfid"
              icon={BsTwitterX}
            />
            <FooterIcon href="https://github.com/HigeDev" icon={BsGithub} />
            <FooterIcon
              href="https://www.youtube.com/@Hige_San"
              icon={BsYoutube}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
