import { useState, useEffect, useMemo } from 'react';
import { AppData, Transaction, TransactionType, SavingsGoal, Badge } from '../types';
import { DEFAULT_CATEGORIES, BADGE_MILESTONES } from '../constants';
import { useAuth } from './useAuth';

const generateId = () => `id-${new Date().getTime()}-${Math.random()}`;

export const useData = () => {
  const { user } = useAuth();
  const storageKey = useMemo(() => user ? `paisabook-data-${user.username}` : '', [user]);

  const [data, setData] = useState<AppData>(() => {
    if (!storageKey) {
        return { transactions: [], categories: DEFAULT_CATEGORIES, goals: [], unlockedBadges: [] };
    }
    try {
      const item = window.localStorage.getItem(storageKey);
      if (item) {
        const parsedData = JSON.parse(item);
        if (!parsedData.categories || parsedData.categories.length === 0) {
            parsedData.categories = DEFAULT_CATEGORIES;
        }
        return parsedData;
      }
    } catch (error) {
      console.error("Error reading from localStorage", error);
    }
    return { transactions: [], categories: DEFAULT_CATEGORIES, goals: [], unlockedBadges: [] };
  });

  const [lastUnlockedBadge, setLastUnlockedBadge] = useState<Badge | null>(null);

  useEffect(() => {
    if (storageKey) {
        try {
            window.localStorage.setItem(storageKey, JSON.stringify(data));
        } catch (error) {
            console.error("Error writing to localStorage", error);
        }
    }
  }, [data, storageKey]);

  const totalSavings = useMemo(() => {
    const income = data.transactions
      .filter((t) => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = data.transactions
      .filter((t) => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);
    return income - expense;
  }, [data.transactions]);

  const checkBadges = (currentSavings: number) => {
    const newlyUnlocked = BADGE_MILESTONES.find(
      (badge) => currentSavings >= badge.threshold && !data.unlockedBadges.includes(badge.id)
    );

    if (newlyUnlocked) {
        setData(prevData => ({ ...prevData, unlockedBadges: [...prevData.unlockedBadges, newlyUnlocked.id].sort((a,b) => a-b) }));
        setLastUnlockedBadge(newlyUnlocked);
    }
  };
  
  useEffect(() => {
    checkBadges(totalSavings);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSavings, data.unlockedBadges]);


  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: generateId() };
    setData(prevData => ({
      ...prevData,
      transactions: [newTransaction, ...prevData.transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    }));
  };

  const updateTransaction = (updatedTransaction: Transaction) => {
    setData(prevData => ({
      ...prevData,
      transactions: prevData.transactions.map(t =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    }));
  };

  const deleteTransaction = (id: string) => {
    setData(prevData => ({
      ...prevData,
      transactions: prevData.transactions.filter(t => t.id !== id),
    }));
  };

  const addGoal = (goal: Omit<SavingsGoal, 'id' | 'currentAmount'>) => {
    const newGoal = { ...goal, id: generateId() };
    setData(prevData => ({
      ...prevData,
      goals: [...prevData.goals, newGoal],
    }));
  };
  
  const deleteGoal = (id: string) => {
    setData(prevData => ({
      ...prevData,
      goals: prevData.goals.filter(g => g.id !== id),
    }));
  };
  
  const clearLastUnlockedBadge = () => {
      setLastUnlockedBadge(null);
  };


  return { data, addTransaction, updateTransaction, deleteTransaction, addGoal, deleteGoal, lastUnlockedBadge, clearLastUnlockedBadge };
};
