import React from 'react';
import { PiggyBank } from 'lucide-react';

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center space-x-2 text-primary dark:text-primary-400 ${className}`}>
      <PiggyBank className="h-8 w-8" />
      <span className="text-2xl font-bold text-slate-800 dark:text-white">Paisabook</span>
    </div>
  );
};

export default Logo;
