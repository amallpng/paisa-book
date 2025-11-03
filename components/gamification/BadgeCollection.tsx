
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { BADGE_MILESTONES } from '../../constants';

interface BadgeCollectionProps {
  unlockedBadges: number[];
}

const BadgeCard: React.FC<{name: string, description: string, icon: string, unlocked: boolean}> = ({name, description, icon, unlocked}) => {
    const IconComponent = (LucideIcons as any)[icon] || LucideIcons.HelpCircle;

    return (
        <div className={`rounded-lg p-6 text-center transition-all duration-300 ${unlocked ? 'bg-white dark:bg-slate-800 shadow-lg scale-105' : 'bg-slate-100 dark:bg-slate-700 opacity-60'}`}>
            <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${unlocked ? 'bg-primary-100 dark:bg-primary-900' : 'bg-slate-200 dark:bg-slate-600'}`}>
                <IconComponent className={`h-8 w-8 ${unlocked ? 'text-primary' : 'text-slate-400'}`} />
            </div>
            <h3 className={`mt-4 text-lg font-semibold ${unlocked ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>{name}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
    );
};

const BadgeCollection: React.FC<BadgeCollectionProps> = ({ unlockedBadges }) => {
  return (
    <div className="space-y-6">
        <h3 className="text-xl font-bold">Badge Collection</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {BADGE_MILESTONES.map(badge => (
                <BadgeCard
                    key={badge.id}
                    name={badge.name}
                    description={badge.description}
                    icon={badge.icon}
                    unlocked={unlockedBadges.includes(badge.id)}
                />
            ))}
        </div>
    </div>
  );
};

export default BadgeCollection;
