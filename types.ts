
export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface SavingsGoal {
  id:string;
  name: string;
  targetAmount: number;
  currentAmount: number; 
}

export interface Badge {
  id: number;
  name: string;
  threshold: number;
  icon: string;
  description: string;
}

export interface User {
  username: string;
}

export interface AppData {
  transactions: Transaction[];
  categories: Category[];
  goals: Omit<SavingsGoal, 'currentAmount'>[];
  unlockedBadges: number[];
}
