import React, { useState, useMemo } from 'react';
import { useData } from '../../hooks/useData';
import Sidebar from './Sidebar';
import Header from './Header';
import SummaryCards from './SummaryCards';
import ExpenseChart from './ExpenseChart';
import TransactionList from '../transactions/TransactionList';
import SavingsGoals from '../savings/SavingsGoals';
import BadgeCollection from '../gamification/BadgeCollection';
import ScratchCardModal from '../gamification/ScratchCardModal';
import ProfilePage from '../profile/ProfilePage';
import { TransactionType } from '../../types';

const Dashboard: React.FC = () => {
  const { data, addTransaction, updateTransaction, deleteTransaction, addGoal, deleteGoal, lastUnlockedBadge, clearLastUnlockedBadge } = useData();
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { totalIncome, totalExpense, totalSavings } = useMemo(() => {
    const income = data.transactions
      .filter((t) => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = data.transactions
      .filter((t) => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      totalIncome: income,
      totalExpense: expense,
      totalSavings: income - expense,
    };
  }, [data.transactions]);
  
  const renderContent = () => {
    switch (activeView) {
      case 'transactions':
        return <TransactionList 
                  transactions={data.transactions} 
                  categories={data.categories}
                  onAdd={addTransaction} 
                  onUpdate={updateTransaction} 
                  onDelete={deleteTransaction}
                />;
      case 'goals':
        return <SavingsGoals 
                  goals={data.goals}
                  totalSavings={totalSavings}
                  onAddGoal={addGoal}
                  onDeleteGoal={deleteGoal}
                />;
      case 'badges':
        return <BadgeCollection unlockedBadges={data.unlockedBadges}/>;
      case 'profile':
        return <ProfilePage />;
      case 'dashboard':
      default:
        return (
          <div className="space-y-6">
            <SummaryCards 
                totalIncome={totalIncome}
                totalExpense={totalExpense}
                totalSavings={totalSavings}
            />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3">
                  <TransactionList 
                    transactions={data.transactions.slice(0,5)} // Show recent 5
                    categories={data.categories}
                    onAdd={addTransaction}
                    onUpdate={updateTransaction}
                    onDelete={deleteTransaction}
                    isDashboard={true}
                    onViewAll={() => setActiveView('transactions')}
                  />
              </div>
              <div className="lg:col-span-2">
                 <ExpenseChart transactions={data.transactions} categories={data.categories} />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Sidebar activeView={activeView} setActiveView={setActiveView} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
      {lastUnlockedBadge && <ScratchCardModal badge={lastUnlockedBadge} onClose={clearLastUnlockedBadge} />}
    </div>
  );
};

export default Dashboard;