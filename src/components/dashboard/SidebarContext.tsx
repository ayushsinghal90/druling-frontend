import React, { createContext, useContext, useState, useEffect } from "react";

interface SidebarContextProps {
  isExpanded: boolean;
  toggleExpanded: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isWindowSmall = () => {
    return window.innerWidth < 768;
  };

  const [isExpanded, setIsExpanded] = useState(!isWindowSmall());

  useEffect(() => {
    const handleResize = () => {
      if (isWindowSmall()) {
        setIsExpanded(false);
      }
    };

    // Set initial value based on screen width
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleExpanded = () => {
    if (window.innerWidth < 768) {
      // Block the function execution for small screens
      return;
    }
    setIsExpanded((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isExpanded, toggleExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
