"use client";

import React from "react";
import { useUser } from "@clerk/clerk-react";
import { 
  Mail, 
  Shield, 
  Key, 
  Activity, 
  Clock, 
  Fingerprint, 
  Server,
  Edit3,
  BadgeCheck
} from "lucide-react";

// Helper component for data rows
const InfoRow = ({ icon: Icon, label, value, isBadge = false }) => (
  <div className="flex items-center p-3 transition-colors rounded-lg hover:bg-gray-50">
    <div className="flex items-center justify-center w-10 h-10 mr-4 bg-blue-50 text-blue-600 rounded-full shrink-0 border border-blue-100">
      <Icon className="w-5 h-5" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      {isBadge ? (
         <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mt-1">
            {value}
         </span>
      ) : (
         <p className="text-sm font-semibold text-gray-900 truncate">{value || "N/A"}</p>
      )}
    </div>
  </div>
);

const AdminProfile = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
     return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
     )
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      
      {/* --- Header Section --- */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100">
        
        {/* Banner Gradient - Darker Blue for Admin Authority */}
        <div className="h-40 md:h-52 w-full bg-gradient-to-r from-blue-800 via-blue-600 to-indigo-600 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>

        {/* Profile Info Bar */}
        <div className="px-6 md:px-10 pb-8">
            <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 mb-4 relative">
                
                {/* Avatar */}
                <div className="relative group">
                    <img 
                        src={user?.imageUrl} 
                        alt="Profile" 
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover bg-white"
                    />
                    {/* Admin Shield Badge on Avatar */}
                    <div className="absolute bottom-2 right-2 bg-blue-600 w-8 h-8 rounded-full border-2 border-white shadow-sm flex items-center justify-center" title="Admin">
                        <Shield className="w-4 h-4 text-white" />
                    </div>
                </div>

                {/* Name & Role */}
                <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {user?.firstName} {user?.lastName}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-gray-600">
                        <span className="flex items-center gap-1 text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-medium border border-indigo-100">
                            <Key className="w-3 h-3" /> Super Admin
                        </span>
                        <span className="text-sm text-gray-500">
                             ID: {user?.id}
                        </span>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-6 md:mt-0 flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all shadow-sm">
                        <Edit3 className="w-4 h-4" /> Edit Settings
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* --- Main Content Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Personal Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <Fingerprint className="w-5 h-5 text-blue-600" /> Account Details
            </h3>
            <div className="space-y-2">
                <InfoRow icon={Mail} label="Primary Email" value={user?.primaryEmailAddress?.emailAddress} />
                <InfoRow icon={Clock} label="Last Sign In" value={user?.lastSignInAt ? new Date(user.lastSignInAt).toLocaleString() : "First Session"} />
                <InfoRow icon={BadgeCheck} label="Verification" value="Verified" isBadge={true} />
            </div>
        </div>

        {/* Column 2: System Permissions (Static Mock for Admin context) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <Shield className="w-5 h-5 text-indigo-600" /> Privileges
            </h3>
            <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">User Management</span>
                    <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">System Configuration</span>
                    <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Financial Reports</span>
                    <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                </div>
                 <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg opacity-60">
                    <span className="text-sm font-medium text-gray-700">Root Access</span>
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                </div>
            </div>
        </div>

        {/* Column 3: Recent Activity Log */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <Activity className="w-5 h-5 text-emerald-600" /> Recent Activity
            </h3>
            
            <div className="relative pl-4 border-l-2 border-gray-100 space-y-6">
                
                {/* Timeline Item 1 */}
                <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
                    <p className="text-sm font-semibold text-gray-900">Session Started</p>
                    <p className="text-xs text-gray-500 mt-1">Logged in via Dashboard</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">Just now</span>
                </div>

                 {/* Timeline Item 2 */}
                 <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 bg-gray-300 rounded-full border-2 border-white"></div>
                    <p className="text-sm font-semibold text-gray-900">Profile Updated</p>
                    <p className="text-xs text-gray-500 mt-1">Changed avatar image</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">2 hours ago</span>
                </div>

                 {/* Timeline Item 3 */}
                 <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 bg-gray-300 rounded-full border-2 border-white"></div>
                    <p className="text-sm font-semibold text-gray-900">System Check</p>
                    <p className="text-xs text-gray-500 mt-1">Verified server status</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">Yesterday</span>
                </div>

            </div>
        </div>

      </div>
    </div>
  );
};

export default AdminProfile;