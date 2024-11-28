import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { Calendar, Clock, MapPin, TrendingUp, Users } from 'lucide-react';

const timeStats = [
  { label: 'Today', value: '234', trend: '+12.3%' },
  { label: 'This Week', value: '1,456', trend: '+8.2%' },
  { label: 'This Month', value: '5,789', trend: '+15.3%' },
];

const popularTimes = [
  { hour: '12 PM', percentage: 45 },
  { hour: '1 PM', percentage: 60 },
  { hour: '2 PM', percentage: 35 },
  { hour: '3 PM', percentage: 25 },
  { hour: '4 PM', percentage: 30 },
  { hour: '5 PM', percentage: 45 },
  { hour: '6 PM', percentage: 85 },
  { hour: '7 PM', percentage: 100 },
  { hour: '8 PM', percentage: 90 },
  { hour: '9 PM', percentage: 70 },
  { hour: '10 PM', percentage: 40 },
];

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">Track your menu's performance and customer engagement</p>
        </div>

        {/* Time-based Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {timeStats.map((stat) => (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <dt>
                <div className="absolute rounded-lg bg-indigo-600 p-3">
                  <Users className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.label}</p>
              </dt>
              <dd className="ml-16 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  {stat.trend}
                </p>
              </dd>
            </div>
          ))}
        </div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Popular Times Chart */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Popular Times</h2>
                <p className="mt-1 text-sm text-gray-500">When customers view your menu most</p>
              </div>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-6 h-[200px] flex items-end gap-2">
              {popularTimes.map((time) => (
                <div key={time.hour} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-indigo-100 rounded-t transition-all duration-300 hover:bg-indigo-200"
                    style={{ height: `${time.percentage}%` }}
                  />
                  <span className="text-xs text-gray-500 -rotate-45 origin-top-left">
                    {time.hour}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Location Stats */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Top Locations</h2>
                <p className="mt-1 text-sm text-gray-500">Where your menu is being viewed from</p>
              </div>
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-6 space-y-4">
              {[
                { city: 'Mumbai', percentage: 35 },
                { city: 'Delhi', percentage: 28 },
                { city: 'Bangalore', percentage: 20 },
                { city: 'Others', percentage: 17 },
              ].map((location) => (
                <div key={location.city}>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{location.city}</span>
                    <span className="font-medium text-gray-900">{location.percentage}%</span>
                  </div>
                  <div className="mt-2 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-indigo-600"
                      style={{ width: `${location.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Trend */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Daily Trend</h2>
                <p className="mt-1 text-sm text-gray-500">Menu views over the past week</p>
              </div>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-6 h-[200px] flex items-end gap-2">
              {[65, 45, 78, 52, 63, 89, 94].map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-green-100 rounded-t transition-all duration-300 hover:bg-green-200"
                    style={{ height: `${value}%` }}
                  />
                  <span className="text-xs text-gray-500">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar View */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Monthly Overview</h2>
                <p className="mt-1 text-sm text-gray-500">Performance calendar view</p>
              </div>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-6 grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }, (_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-lg p-2 text-center text-sm ${
                    Math.random() > 0.5 ? 'bg-green-100' : 'bg-gray-100'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;