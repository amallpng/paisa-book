import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Banknote } from 'lucide-react';

interface SummaryCardsProps {
    totalIncome: number;
    totalExpense: number;
    totalSavings: number;
}

const SummaryCard: React.FC<{ title: string; amount: number; icon: React.ReactNode; color: string; }> = ({ title, amount, icon, color }) => (
    <div className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl">
        <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
            <span className={color}>{icon}</span>
        </div>
        <p className="mt-2 text-3xl font-bold">
            ₹{amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
    </div>
);


const SummaryCards: React.FC<SummaryCardsProps> = ({ totalIncome, totalExpense, totalSavings }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SummaryCard 
                title="Total Income" 
                amount={totalIncome} 
                icon={<ArrowUpCircle size={24} />}
                color="text-green-500"
            />
            <SummaryCard 
                title="Total Expenses" 
                amount={totalExpense} 
                icon={<ArrowDownCircle size={24} />}
                color="text-red-500"
            />
            <SummaryCard 
                title="Total Savings" 
                amount={totalSavings} 
                icon={<Banknote size={24} />}
                color="text-indigo-500"
            />
        </div>
    );
};

export default SummaryCards;