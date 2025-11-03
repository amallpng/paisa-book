import React, { useState } from 'react';
import { SavingsGoal } from '../../types';
import Button from '../ui/Button';
import { Plus, Target, Trash2 } from 'lucide-react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';

interface SavingsGoalsProps {
  goals: SavingsGoal[];
  totalSavings: number;
  onAddGoal: (goal: Omit<SavingsGoal, 'id' | 'currentAmount'>) => void;
  onDeleteGoal: (id: string) => void;
}

const GoalCard: React.FC<{goal: SavingsGoal, onDelete: () => void}> = ({ goal, onDelete }) => {
    const progress = goal.targetAmount > 0 ? Math.min((goal.currentAmount / goal.targetAmount) * 100, 100) : 0;
    return (
        <div className="rounded-lg bg-white dark:bg-slate-800 p-4 shadow-md">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Target className="text-primary"/>
                    <h4 className="font-semibold">{goal.name}</h4>
                </div>
                <Button variant="ghost" size="sm" onClick={onDelete} className="p-2 h-auto text-red-500 hover:text-red-500"><Trash2 size={16} /></Button>
            </div>
            <div className="mt-4">
                <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 mb-1">
                    <span>₹{goal.currentAmount.toLocaleString('en-IN')}</span>
                    <span>₹{goal.targetAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-right text-xs mt-1 font-semibold">{progress.toFixed(1)}%</p>
            </div>
        </div>
    );
}

const SavingsGoals: React.FC<SavingsGoalsProps> = ({ goals, totalSavings, onAddGoal, onDeleteGoal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  
  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    onAddGoal({ name: goalName, targetAmount: parseFloat(targetAmount) });
    setGoalName('');
    setTargetAmount('');
    setIsModalOpen(false);
  };
  
  const updatedGoals = goals.map(goal => ({...goal, currentAmount: totalSavings > 0 ? totalSavings : 0}));

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Your Savings Goals</h3>
        <Button onClick={() => setIsModalOpen(true)}>
            <Plus size={16} className="mr-2" /> Add Goal
        </Button>
      </div>

      {updatedGoals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {updatedGoals.map(goal => (
                <GoalCard key={goal.id} goal={goal} onDelete={() => onDeleteGoal(goal.id)} />
            ))}
        </div>
      ) : (
        <div className="text-center py-10 rounded-lg bg-white dark:bg-slate-800">
            <Target className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-white">No savings goals</h3>
            <p className="mt-1 text-sm text-slate-500">Get started by creating a new goal.</p>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create a New Savings Goal">
        <form onSubmit={handleAddGoal} className="space-y-4">
            <Input id="goalName" label="Goal Name" value={goalName} onChange={e => setGoalName(e.target.value)} required />
            <Input id="targetAmount" label="Target Amount (₹)" type="number" value={targetAmount} onChange={e => setTargetAmount(e.target.value)} required />
            <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit">Create Goal</Button>
            </div>
        </form>
      </Modal>
    </div>
  );
};

export default SavingsGoals;