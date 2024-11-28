import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { BarChart3, TrendingUp, Users } from 'lucide-react';

const stats = [
  { name: 'Total Scans', value: '2,345', change: '+12.3%', trend: 'up', icon: Users },
  { name: 'Peak Hours', value: '7-9 PM', change: '', icon: TrendingUp },
  { name: 'Most Viewed', value: 'Main Menu', change: '+5.4%', trend: 'up', icon: BarChart3 },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Welcome back!</h1>
          <p className="mt-1 text-sm text-gray-500">Here's what's happening with your menu</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <dt>
                <div className="absolute rounded-lg bg-indigo-600 p-3">
                  <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                {stat.change && (
                  <p className={`ml-2 flex items-baseline text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
                )}
              </dd>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl bg-white shadow-sm">
          <div className="p-6">
            <h2 className="text-base font-semibold text-gray-900">Recent Activity</h2>
            <div className="mt-6 flow-root">
              <ul role="list" className="-my-5 divide-y divide-gray-100">
                <li className="py-5">
                  <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Menu Updated
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">Added new items to dinner menu</p>
                  </div>
                </li>
                <li className="py-5">
                  <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                    <h3 className="text-sm font-semibold text-gray-800">
                      New QR Code Generated
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">Created QR code for table service</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <a
                href="#"
                className="flex w-full items-center justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors duration-200"
              >
                View all
              </a>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;