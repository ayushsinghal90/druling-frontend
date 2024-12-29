import React from "react";
import {
  XIcon,
  LinkedInIcon,
  InstagramIcon,
  YouTubeIcon,
  FacebookIcon,
  GlobalIcon,
} from "../icons/SocialIcons";
import Logo from "../Logo";
import { SocialLinks } from "../../types/menu";

interface MenuFooterProps {
  socialLinks?: SocialLinks;
  variant?: "default" | "classic" | "modern";
}

const MenuFooter = ({ socialLinks, variant = "default" }: MenuFooterProps) => {
  const styles = {
    default: {
      wrapper: "bg-white border-t border-gray-200",
      container: "text-gray-600",
      icon: "text-gray-400 hover:text-gray-600",
      logo: "text-black",
    },
    modern: {
      wrapper: "bg-[#111] border-t border-[#333]",
      container: "text-[#00ff9d]/60",
      icon: "text-[#00ff9d]/60 hover:text-[#00ff9d]",
      logo: "text-[#00ff9d]",
    },
    scrolling: {
      wrapper: "bg-[#1a1a1a] border-t border-amber-500/20",
      container: "text-amber-500/60",
      icon: "text-amber-500/60 hover:text-amber-500",
      logo: "text-amber-500",
    },
  };

  const style = styles[variant];

  return (
    <footer className={`mt-auto py-6 ${style.wrapper}`}>
      <div
        className={`max-w-7xl mx-auto px-4 flex flex-col items-center ${style.container}`}
      >
        {/* Social Links */}
        {socialLinks && (
          <div>
            <div className="mb-6 text-center">
              <p className="font-medium font-comfortaa">Connect With us</p>
            </div>

            <div className="flex space-x-6 mb-6">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors duration-200 ${style.icon}`}
                >
                  <FacebookIcon className="h-5 w-5" />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors duration-200 ${style.icon}`}
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors duration-200 ${style.icon}`}
                >
                  <XIcon className="h-5 w-5" />
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors duration-200 ${style.icon}`}
                >
                  <YouTubeIcon className="h-5 w-5" />
                </a>
              )}
              {socialLinks.linkedIn && (
                <a
                  href={socialLinks.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors duration-200 ${style.icon}`}
                >
                  <LinkedInIcon className="h-5 w-5" />
                </a>
              )}
              {socialLinks.website && (
                <a
                  href={socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors duration-200 ${style.icon}`}
                >
                  <GlobalIcon className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        )}
        {/* Powered by */}
        <div className="mt-2 text-xs">Powered by</div>
        {/* Logo and Restaurant Info */}
        <a href="/" target="_blank" rel="noopener noreferrer">
          <div className="flex flex-col items-center">
            <Logo color={`${style.logo}`} textSize="text-2xl" />
          </div>
        </a>
      </div>
    </footer>
  );
};

export default MenuFooter;
