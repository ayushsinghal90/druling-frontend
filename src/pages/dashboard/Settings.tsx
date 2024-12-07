import React from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { User, Building2, Bell, Shield } from "lucide-react";

const settingsSections = [
  {
    id: "restaurant",
    title: "Restaurant Details",
    icon: Building2,
    fields: [
      {
        name: "restaurantName",
        label: "Restaurant Name",
        type: "text",
        value: "The Fine Diner",
      },
      {
        name: "address",
        label: "Address",
        type: "text",
        value: "123 Food Street",
      },
      { name: "phone", label: "Phone", type: "tel", value: "+1 234 567 890" },
      {
        name: "email",
        label: "Email",
        type: "email",
        value: "druling@gmail.com",
      },
    ],
  },
];

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account and restaurant settings
          </p>
        </div>

        <div className="space-y-6">
          {settingsSections.map((section) => (
            <div
              key={section.id}
              className="overflow-hidden rounded-xl bg-white shadow-sm"
            >
              <div className="flex items-center gap-3 border-b border-gray-100 p-6">
                <section.icon className="h-5 w-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">
                  {section.title}
                </h2>
              </div>
              <div className="p-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {section.fields.map((field) => (
                    <div key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-700"
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        id={field.name}
                        defaultValue={field.value}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Quick Actions */}
          <div className="grid gap-4 sm:grid-cols-2">
            <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors duration-200">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </button>
            <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors duration-200">
              <Shield className="h-5 w-5" />
              Security Settings
            </button>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors duration-200">
              Cancel
            </button>
            <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 transition-colors duration-200">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
