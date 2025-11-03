import React from 'react';
import { LayoutDashboard, Wallet, Target, Award, LogOut, X, CircleUserRound } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Logo from '../ui/Logo';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, sidebarOpen, setSidebarOpen }) => {
  const { logout } = useAuth();

  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'transactions', label: 'Transactions', icon: Wallet },
    { key: 'goals', label: 'Savings Goals', icon: Target },
    { key: 'badges', label: 'Badges', icon: Award },
    { key: 'profile', label: 'Profile', icon: CircleUserRound },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white dark:bg-slate-800 shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
            <Logo />
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-500 dark:text-slate-400">
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.key}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveView(item.key);
                  setSidebarOpen(false);
                }}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  activeView === item.key
                    ? 'bg-primary-50 text-primary-600 dark:bg-slate-700 dark:text-primary'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
          <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-700">
             <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <LogOut className="mr-3 h-5 w-5" />
                <span>Logout</span>
              </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;