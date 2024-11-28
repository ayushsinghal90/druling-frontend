import React from "react";
import Logo from "./Logo";
import { TwitterIcon, GithubIcon } from "./SocialIcons";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <a
            href="#"
            className="text-gray-400 hover:text-black transition-colors duration-200"
          >
            <span className="sr-only">Twitter</span>
            <TwitterIcon className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-black transition-colors duration-200"
          >
            <span className="sr-only">GitHub</span>
            <GithubIcon className="h-6 w-6" />
          </a>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Logo color="text-black" textSize="text-2xl" />
          </div>
          <p className="mt-2 text-center text-xs leading-5 text-gray-500 md:text-left">
            &copy; 2024 Druling, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
