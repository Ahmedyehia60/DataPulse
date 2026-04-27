import React from "react";
import { User, Bell, Shield, Palette } from "lucide-react";

const Settings = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">⚙️ Settings</h1>
        <p className="text-sm text-slate-500">
          Manage your account preferences and application settings
        </p>
      </div>

      <div className="grid gap-6 max-w-4xl">
        {/* PROFILE SECTION */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
              <User size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">
                Profile Information
              </h3>
              <p className="text-sm text-slate-500">
                Update your name, email and photo
              </p>
            </div>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
            Edit Profile
          </button>
        </div>

        {/* ACCOUNT SETTINGS */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-semibold text-slate-800 text-sm uppercase tracking-wider">
              System Preferences
            </h3>
          </div>

          <div className="divide-y divide-slate-100">
            {/* Notifications */}
            <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <Bell size={20} className="text-slate-400" />
                <span className="text-slate-700">Push Notifications</span>
              </div>
              <input
                type="checkbox"
                className="w-10 h-5 bg-slate-200 rounded-full appearance-none checked:bg-indigo-600 cursor-pointer relative transition-all before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 checked:before:left-5 before:transition-all"
                defaultChecked
              />
            </div>

            {/* Security */}
            <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <Shield size={20} className="text-slate-400" />
                <span className="text-slate-700">
                  Two-Factor Authentication
                </span>
              </div>
              <button className="text-indigo-600 text-sm font-medium">
                Enable
              </button>
            </div>

            {/* Appearance */}
            <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <Palette size={20} className="text-slate-400" />
                <span className="text-slate-700">Dark Mode</span>
              </div>
              <input
                type="checkbox"
                className="w-10 h-5 bg-slate-200 rounded-full appearance-none checked:bg-indigo-600 cursor-pointer relative transition-all before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 checked:before:left-5 before:transition-all"
              />
            </div>
          </div>
        </div>

        {/* DANGER ZONE */}
        <div className="bg-red-50 border border-red-100 p-6 rounded-xl">
          <h3 className="text-red-800 font-semibold mb-2">Danger Zone</h3>
          <p className="text-sm text-red-600 mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
