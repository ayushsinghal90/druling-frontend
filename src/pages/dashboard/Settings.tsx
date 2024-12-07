import React from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import NotificationSettings from "../../components/settings/NotificationSettings";
import SecuritySettings from "../../components/settings/SecuritySettings";
import { ChevronDown } from "lucide-react";

const Settings = () => {
  const [expandedSection, setExpandedSection] = React.useState<string | null>(
    null
  );

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account preferences and security settings
          </p>
        </div>

        <div className="space-y-6">
          {/* Notification Preferences */}
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <button
              onClick={() => toggleSection("notifications")}
              className="w-full flex items-center justify-between p-6 text-left border-b border-gray-100"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                Notification Preferences
              </h2>
              <ChevronDown
                className={`h-5 w-5 text-gray-500 transition-transform ${
                  expandedSection === "notifications" ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedSection === "notifications" && (
              <div className="p-6">
                <NotificationSettings />
              </div>
            )}
          </div>

          {/* Security Settings */}
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <button
              onClick={() => toggleSection("security")}
              className="w-full flex items-center justify-between p-6 text-left border-b border-gray-100"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                Security Settings
              </h2>
              <ChevronDown
                className={`h-5 w-5 text-gray-500 transition-transform ${
                  expandedSection === "security" ? "rotate-180" : ""
                }`}
              />
            </button>
            {expandedSection === "security" && (
              <div className="p-6">
                <SecuritySettings />
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
