import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthContext';
import { Mail, Briefcase, User, Edit3, Camera } from 'lucide-react';

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  const profileImage = user?.photoURL || "https://via.placeholder.com/150";
  const profession = user?.profession || "Member";

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Page Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Account Profile</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Update your personal details and public information.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Banner with Profile Picture */}
        <div className="h-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
           <button className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-all">
             <Edit3 size={18} />
           </button>
        </div>

        <div className="px-8 pb-10">
          <div className="relative -mt-16 mb-6 inline-block group">
            <img
              src={profileImage}
              alt={user?.displayName}
              className="w-32 h-32 rounded-3xl object-cover border-4 border-white dark:border-gray-800 shadow-2xl transition-transform group-hover:scale-[1.02]"
            />
            {/* Avatar Edit Overlay */}
            <button className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Camera size={24} />
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{user?.displayName || "User Name"}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Verified
                </span>
                <span className="text-gray-400 text-sm">•</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">{profession}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableField 
              icon={<User size={18} />} 
              label="Full Name" 
              value={user?.displayName} 
            />
            <EditableField 
              icon={<Mail size={18} />} 
              label="Email Address" 
              value={user?.email} 
            />
            <EditableField 
              icon={<Briefcase size={18} />} 
              label="Current Profession" 
              value={profession} 
            />
            <EditableField 
              icon={<Edit3 size={18} />} 
              label="Bio / Description" 
              value="Helping communities reduce food waste, one plate at a time." 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const EditableField = ({ icon, label, value }) => (
  <div className="group relative p-5 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-900/20 hover:bg-white dark:hover:bg-gray-700 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-500/30 transition-all cursor-pointer">
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm text-blue-600 dark:text-blue-400">
          {icon}
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            {label}
          </p>
          <p className="text-gray-900 dark:text-gray-100 font-semibold mt-0.5">
            {value || "Not specified"}
          </p>
        </div>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-gray-400 hover:text-blue-600">
        <Edit3 size={16} />
      </div>
    </div>
  </div>
);

export default MyProfile;