import React from "react";
import { Shield, Key, Smartphone } from "lucide-react";

const SecuritySettings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Key className="h-5 w-5 text-gray-400" />
          <div>
            <p className="font-medium text-gray-900">
              Two-Factor Authentication
            </p>
            <p className="text-sm text-gray-500">
              Add an extra layer of security to your account
            </p>
          </div>
        </div>
        <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
          Enable
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-gray-400" />
          <div>
            <p className="font-medium text-gray-900">Login History</p>
            <p className="text-sm text-gray-500">
              View and manage your active sessions
            </p>
          </div>
        </div>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
          View History
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Smartphone className="h-5 w-5 text-gray-400" />
          <div>
            <p className="font-medium text-gray-900">Trusted Devices</p>
            <p className="text-sm text-gray-500">
              Manage devices that can access your account
            </p>
          </div>
        </div>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
          Manage Devices
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;
