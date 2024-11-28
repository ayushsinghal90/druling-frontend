import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import SidebarNav from './SidebarNav';
import { LogOut } from 'lucide-react';

interface SidebarProps {
  isExpanded: boolean;
  toggleExpanded: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isExpanded, toggleExpanded }) => {
  return (
    <>
      <div
        className={`sidebar-container fixed inset-y-0 left-0 z-40 flex h-full flex-col bg-white border-r border-gray-200 transition-[width] duration-300 ease-in-out ${
          isExpanded ? 'w-48' : 'w-16'
        }`}
        onClick={toggleExpanded}
      >
        {/* Logo */}
        <div>
          <Link
            to="/"
            className={`flex h-16 items-center ${
              isExpanded ? 'px-4' : 'justify-center'
            } border-b border-gray-200 cursor-pointer`}
            onClick={(e) => e.stopPropagation()}
          >
            <Logo className="h-6 w-6 text-black transition-transform duration-300" />
            <span
              className={`ml-2 font-bold text-black font-comfortaa transition-all duration-300 ${
                isExpanded ? 'opacity-100 text-sm' : 'opacity-0 w-0 text-xs'
              }`}
            >
              druling
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <SidebarNav isExpanded={isExpanded} />
        </div>

        {/* Logout */}
        <div
          className={`flex border-t border-gray-200 py-4 ${
            isExpanded ? 'px-3' : 'items-center justify-center'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            to="/logout"
            className={`group flex items-center rounded-lg transition-all duration-300 ease-in-out hover:bg-[#ecf0f1] ${
              isExpanded ? 'px-3 py-2 w-full' : 'h-10 w-10 justify-center'
            }`}
          >
            <LogOut className="h-4 w-4 text-gray-600 group-hover:text-gray-900 transition-colors duration-200" />
            <span
              className={`ml-3 text-sm font-medium text-gray-900 transition-all duration-300 ${
                isExpanded
                  ? 'opacity-100 w-auto'
                  : 'opacity-0 w-0 overflow-hidden'
              }`}
            >
              Logout
            </span>
            {!isExpanded && (
              <span className="absolute left-full ml-2 w-auto min-w-max origin-left scale-0 rounded-md bg-[#ecf0f1] px-2 py-1 text-xs font-medium text-gray-900 shadow-sm transition-all duration-200 group-hover:scale-100">
                Logout
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Click outside area to collapse */}
      {/* {isExpanded && (
        <div
          className="fixed inset-0 z-30 bg-transparent cursor-pointer"
          onClick={handleBackgroundClick}
        />
      )} */}
    </>
  );
};

export default Sidebar;
