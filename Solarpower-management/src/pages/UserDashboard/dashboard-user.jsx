"use client";

import React from "react";
import { useUser } from "@clerk/clerk-react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Zap, 
  Home, 
  CreditCard, 
  User, 
  Edit3,
  ShieldCheck
} from "lucide-react";
import { useGetAllRegisteredUsersByClerkUserIdQuery } from "@/lib/redux/query"; // Adjust path as needed

// Helper component for data rows
const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center p-3 transition-colors rounded-lg hover:bg-gray-50">
    <div className="flex items-center justify-center w-10 h-10 mr-4 bg-blue-100 rounded-full text-blue-600 shrink-0">
      <Icon className="w-5 h-5" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-sm font-semibold text-gray-900 truncate">{value || "N/A"}</p>
    </div>
  </div>
);

const UserProfile = () => {
  const { user } = useUser();
  
  // Fetch data using your hook
  const { 
    data: userData, 
    isLoading, 
    isError 
  } = useGetAllRegisteredUsersByClerkUserIdQuery(user?.id, {
    skip: !user?.id
  });

  // Handle Loading State
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Handle Error State
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-red-500">
        <p>Failed to load user profile. Please try again later.</p>
      </div>
    );
  }

  const profile = Array.isArray(userData) ? userData[0] : userData;

  if (!profile) {
     return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
            <div className="bg-blue-50 p-6 rounded-full mb-4">
                <User className="w-12 h-12 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Profile Not Found</h2>
            <p className="text-gray-600 mt-2 mb-6 max-w-md">
                It looks like you haven't completed the registration form yet. 
                Please register your solar unit to view your profile details.
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Register Now
            </button>
        </div>
     )
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      
      {/* --- Header Section --- */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100">
        
        {/* Banner Gradient */}
        <div className="h-40 md:h-52 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 relative overflow-hidden">
             {/* Abstract Shapes */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>

        {/* Profile Info Bar */}
        <div className="px-6 md:px-10 pb-8">
            <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 mb-4 relative">
                
                {/* Avatar */}
                <div className="relative group">
                    <img 
                        src={user?.imageUrl || "https://github.com/shadcn.png"} 
                        alt="Profile" 
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover bg-white"
                    />
                    <div className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 rounded-full border-2 border-white shadow-sm" title="Active"></div>
                </div>

                {/* Name & Role */}
                <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {profile.firstName} {profile.lastName}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-gray-600">
                        <span className="flex items-center gap-1 text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium border border-blue-100">
                            <ShieldCheck className="w-3 h-3" /> Verified User
                        </span>
                        <span className="text-sm text-gray-500">
                             Member since {new Date(user?.createdAt).getFullYear()}
                        </span>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-6 md:mt-0 flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all shadow-sm">
                        <Edit3 className="w-4 h-4" /> Edit Profile
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* --- Main Content Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Contact & Address */}
        <div className="space-y-6">
            
            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-500" /> Contact Info
                </h3>
                <div className="space-y-1">
                    <InfoRow icon={Mail} label="Email Address" value={profile.email} />
                    <InfoRow icon={Phone} label="Phone Number" value={profile.phoneNumber} />
                </div>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-500" /> Location
                </h3>
                <div className="space-y-1">
                    <InfoRow icon={Home} label="Address" value={profile.address} />
                    <InfoRow icon={MapPin} label="City" value={profile.city} />
                    <InfoRow icon={MapPin} label="Country" value={profile.country} />
                    <InfoRow icon={MapPin} label="Postal Code" value={profile.postalCode} />
                </div>
            </div>

        </div>

        {/* Right Column: Solar Details (Spans 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-500" /> Solar Project Details
                    </h3>
                    <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold uppercase rounded-full border border-yellow-100">
                        {profile.status || "Pending"}
                    </span>
                    <span className="px-3 py-1 bg-yellow-50 text-green-700 text-xs font-bold uppercase rounded-full border border-yellow-100">
                        {profile.solarUnitSerialNo || "Pending"}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                     <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2 mb-3">Property Specs</h4>
                        <InfoRow icon={Home} label="Property Type" value={profile.propertyType} />
                        <InfoRow icon={Home} label="Roof Type" value={profile.roofType} />
                        <InfoRow icon={Zap} label="Avg Consumption" value={`${profile.avgConsumption} kWh/mo`} />
                     </div>

                     <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2 mb-3">System Preferences</h4>
                        <InfoRow icon={Zap} label="System Type" value={profile.systemType} />
                        <InfoRow icon={Calendar} label="Timeline" value={profile.timeline} />
                        <InfoRow icon={CreditCard} label="Budget Estimate" value={`$${Number(profile.budget).toLocaleString()}`} />
                     </div>
                </div>

                {/* Additional Description Box */}
                <div className="mt-8">
                     <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Additional Notes</h4>
                     <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-600 italic">
                        "{profile.description || "No additional notes provided."}"
                     </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;