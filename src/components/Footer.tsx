import React from "react";
import Logo from "./Logo";
import { XIcon, LinkedInIcon, InstagramIcon, YouTubeIcon } from "./SocialIcons";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <a
            href="https://x.com/druling"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-black transition-colors duration-200"
          >
            <span className="sr-only">X (formerly Twitter)</span>
            <XIcon className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com/company/druling"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-black transition-colors duration-200"
          >
            <span className="sr-only">LinkedIn</span>
            <LinkedInIcon className="h-5 w-5" />
          </a>
          <a
            href="https://instagram.com/druling"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-black transition-colors duration-200"
          >
            <span className="sr-only">Instagram</span>
            <InstagramIcon className="h-5 w-5" />
          </a>
          <a
            href="https://youtube.com/@druling"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-black transition-colors duration-200"
          >
            <span className="sr-only">YouTube</span>
            <YouTubeIcon className="h-7 w-7 -mt-1" />
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
