import React from "react";
import Sidebar from "./Sidebar";
import { useSidebar } from "./SidebarContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isExpanded, toggleExpanded } = useSidebar();

  return (
    <div className="flex h-screen">
      <Sidebar isExpanded={isExpanded} toggleExpanded={toggleExpanded} />

      {/* Main content */}
      <div
        className={`flex-1 transition-[margin] duration-300 ease-in-out ${
          isExpanded ? "ml-48" : "ml-16"
        }`}
      >
        <main className="h-full overflow-y-auto bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
