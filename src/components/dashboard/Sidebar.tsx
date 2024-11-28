import React from "react";
import { Link } from "react-router-dom";
import LogoImg from "../LogoImg";
import SidebarNav from "./SidebarNav";
import { LogOut } from "lucide-react";

interface SidebarProps {
  isExpanded: boolean;
  toggleExpanded: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, toggleExpanded }) => {
  return (
    <>
      <div
        className={`sidebar-container fixed inset-y-0 left-0 z-40 flex h-full flex-col bg-white border-r border-gray-200 transition-[width] duration-300 ease-in-out ${
          isExpanded ? "w-48" : "w-16"
        }`}
        onClick={toggleExpanded}
      >
        {/* Logo */}
        <div>
          <Link
            to="/"
            className="relative flex h-16 items-center border-b border-gray-200 cursor-pointer px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <LogoImg className="h-8 w-8 text-black" />

            <div
              className={`absolute inset-0 flex items-center justify-center ${
                isExpanded
                  ? "transition-opacity opacity-100 duration-500"
                  : "opacity-0"
              }`}
            >
              <span className="text-2xl font-bold text-black font-comfortaa p-2 pl-4">
                druling
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-hidden">
          <SidebarNav isExpanded={isExpanded} />
        </div>

        {/* Logout */}
        <div
          className="relative flex h-16 items-center border-t border-gray-200 cursor-pointer p-3"
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            to="/logout"
            className="group flex items-center rounded-lg cursor-pointer h-10 w-full p-2 hover:bg-[#ecf0f1]"
          >
            <LogOut className="h-6 w-6 text-gray-700 group-hover:text-gray-900" />
            <div
              className={`w-0 ${
                isExpanded
                  ? "transition-opacity opacity-100 duration-500"
                  : "opacity-0"
              }`}
            >
              <span className="text-sm font-medium text-gray-900 p-2 ml-4">
                Logout
              </span>
            </div>
            {!isExpanded && (
              <span className="absolute left-full ml-2 w-auto min-w-max origin-left scale-0 rounded-md bg-[#ecf0f1] px-2 py-1 text-xs font-medium text-gray-900 shadow-sm transition-all duration-200 group-hover:scale-100">
                Logout
              </span>
            )}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
