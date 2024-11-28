import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  QrCode,
  Settings,
  BarChart,
  CreditCard,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'QR Codes', href: '/dashboard/qr-codes', icon: QrCode },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

interface SidebarNavProps {
  isExpanded: boolean;
}

const SidebarNav = ({ isExpanded }: SidebarNavProps) => {
  const location = useLocation();

  return (
    <nav
      className={`flex flex-col ${
        isExpanded ? 'px-2 py-3' : 'items-center py-3'
      } space-y-1`}
    >
      {navigation.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            className={`group flex items-center rounded-lg transition-all duration-300 ease-in-out cursor-pointer ${
              isExpanded ? 'px-2 py-2 w-full' : 'h-10 w-10 justify-center'
            } ${
              isActive
                ? 'bg-[#ecf0f1] text-gray-900'
                : 'text-gray-600 hover:bg-[#ecf0f1] hover:text-gray-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <item.icon
              className={`h-4 w-4 flex-shrink-0 transition-colors duration-300 ${
                isActive ? 'text-gray-900' : 'group-hover:text-gray-900'
              }`}
            />
            <span
              className={`ml-3 text-sm font-medium transition-all duration-300 ${
                isExpanded
                  ? 'opacity-100 w-auto'
                  : 'opacity-0 w-0 overflow-hidden'
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
        );
      })}
    </nav>
  );
};

export default SidebarNav;
