
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';
import { User, ShieldCheck, Landmark, Activity, Award } from 'lucide-react';

const StatCard: React.FC<{ label: string; value: string | number; icon: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="flex items-center p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
    <div className="p-3 mr-4 text-primary bg-primary-100 dark:bg-slate-800 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</p>
      <p className="text-lg font-semibold text-slate-800 dark:text-white">{value}</p>
    </div>
  </div>
);

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { data } = useData();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <div className="flex flex-col items-center sm:flex-row sm:items-start">
            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                <div className="relative w-24 h-24 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-slate-500" />
                    <div className="absolute bottom-0 right-0 p-1 bg-green-500 rounded-full border-2 border-white dark:border-slate-800">
                        <ShieldCheck className="w-4 h-4 text-white" />
                    </div>
                </div>
            </div>
            <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{user?.username}</h2>
                <p className="text-slate-500 dark:text-slate-400">Welcome to your financial dashboard.</p>
            </div>
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Your Financial Snapshot</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard label="Total Transactions" value={data.transactions.length} icon={<Activity size={20} />} />
            <StatCard label="Active Goals" value={data.goals.length} icon={<Landmark size={20} />} />
            <StatCard label="Badges Earned" value={data.unlockedBadges.length} icon={<Award size={20} />} />
        </div>
      </div>
      
      <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Settings</h3>
        <p className="text-slate-500">
            Profile settings and customization options will be available here in a future update.
        </p>
      </div>

    </div>
  );
};

export default ProfilePage;
