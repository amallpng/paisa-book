
import React from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
    const { user } = useAuth();
    const [isDarkMode, setIsDarkMode] = React.useState(
        () => document.documentElement.classList.contains('dark')
    );
    
    const toggleTheme = () => {
        const newIsDarkMode = !isDarkMode;
        setIsDarkMode(newIsDarkMode);
        if (newIsDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <header className="flex h-16 flex-shrink-0 items-center justify-between p-4 bg-white dark:bg-slate-800 shadow-md">
            <button
                onClick={() => setSidebarOpen(true)}
                className="text-slate-500 focus:outline-none lg:hidden"
            >
                <Menu size={24} />
            </button>
            <div className="flex-1 lg:flex-none">
                <h1 className="text-xl font-semibold text-slate-800 dark:text-white hidden lg:block">Welcome, {user?.username}!</h1>
            </div>
            <div className="flex items-center space-x-4">
                <button onClick={toggleTheme} className="text-slate-500 dark:text-slate-400">
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <div className="text-right">
                    <p className="font-semibold text-sm">{user?.username}</p>
                    <p className="text-xs text-slate-500">Personal Account</p>
                </div>
            </div>
        </header>
    );
};

export default Header;
