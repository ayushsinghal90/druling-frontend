import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  QrCode,
  Settings,
  BarChart,
  CreditCard,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "QR Codes", href: "/dashboard/qr-codes", icon: QrCode },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarNavProps {
  isExpanded: boolean;
}

const SidebarNav = ({ isExpanded }: SidebarNavProps) => {
  const location = useLocation();

  return (
    <nav className={`flex flex-col justify-between p-3`}>
      {navigation.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <div className="my-2" key={item.name}>
            <Link
              to={item.href}
              className={`group flex items-center rounded-lg cursor-pointer h-10 w-auto ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-black hover:bg-[#ecf0f1] hover:text-gray-900"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-6 w-6 ml-2">
                <item.icon
                  className={`items-center flex-shrink-0 transition-colors duration-300 ${
                    isActive
                      ? "text-white"
                      : "group-hover:text-gray-900 text-black"
                  }`}
                />
              </div>
              <span
                className={`ml-3 text-sm font-medium ${
                  isExpanded
                    ? "transition-opacity opacity-100 duration-500"
                    : "opacity-0"
                }`}
              >
                {item.name}
              </span>
              {!isExpanded && (
                <span className="absolute left-full ml-2 w-auto min-w-max origin-left scale-0 rounded-md bg-[#ecf0f1] px-2 py-1 text-xs font-medium text-gray-900 shadow-sm transition-all duration-300 group-hover:scale-100">
                  {item.name}
                </span>
              )}
            </Link>
          </div>
        );
      })}
    </nav>
  );
};

export default SidebarNav;
