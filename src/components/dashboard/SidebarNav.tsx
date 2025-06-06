import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  QrCode,
  Settings,
  BarChart,
  CreditCard,
  Building2,
} from "lucide-react";
import UserAvatar from "../common/UserAvatar";
import { useAuth } from "../../hooks/auth/useAuth";

const navigation = [
  // { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "QR Codes", href: "/dashboard", icon: QrCode },
  { name: "Restaurants", href: "/dashboard/restaurants", icon: Building2 },
  // { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  // { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarNavProps {
  isExpanded: boolean;
}

const SidebarNav = ({ isExpanded }: SidebarNavProps) => {
  const location = useLocation();
  const { profile } = useAuth();

  return (
    <nav className={`flex flex-col justify-between p-3`}>
      <div className="my-2">
        <Link
          to="/dashboard/profile"
          className={`group flex items-center rounded cursor-pointer h-10 w-auto ${
            location.pathname === "/dashboard/profile"
              ? "bg-black text-white"
              : "text-black hover:bg-[#ecf0f1] hover:text-gray-900"
          }
            ${isExpanded ? "rounded-lg" : "rounded-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="ml-1">
            <UserAvatar
              imageUrl={profile?.img_url}
              size="sm"
              className="items-center flex-shrink-0"
            />
          </div>
          <span
            className={`ml-2 text-sm font-medium ${
              isExpanded
                ? "transition-opacity opacity-100 duration-500"
                : "opacity-0"
            }`}
          >
            {profile?.first_name
              ? `${profile?.first_name} ${profile?.last_name}`
              : "Profile"}
          </span>
          {!isExpanded && (
            <span className="absolute left-full ml-2 w-auto min-w-max origin-left scale-0 rounded-md bg-[#ecf0f1] px-2 py-1 text-xs font-medium text-gray-900 shadow-sm transition-all duration-300 group-hover:scale-100">
              Profile Settings
            </span>
          )}
        </Link>
      </div>

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
