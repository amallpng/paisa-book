import { Category, Badge } from './types';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Food & Dining', icon: 'Utensils' },
  { id: 'cat-2', name: 'Housing', icon: 'Home' },
  { id: 'cat-3', name: 'Transportation', icon: 'Car' },
  { id: 'cat-4', name: 'Entertainment', icon: 'Ticket' },
  { id: 'cat-5', name: 'Shopping', icon: 'ShoppingBag' },
  { id: 'cat-6', name: 'Health & Wellness', icon: 'HeartPulse' },
  { id: 'cat-7', name: 'Utilities', icon: 'Lightbulb' },
  { id: 'cat-8', name: 'Salary', icon: 'Briefcase' },
  { id: 'cat-9', name: 'Freelance', icon: 'Laptop' },
  { id: 'cat-10', name: 'Other', icon: 'MoreHorizontal' },
];

export const BADGE_MILESTONES: Badge[] = [
  { id: 1, name: "Bronze Saver", threshold: 100, icon: 'Award', description: "You've saved your first ₹100!" },
  { id: 2, name: "Silver Saver", threshold: 1000, icon: 'Medal', description: "Congrats on saving ₹1,000!" },
  { id: 3, name: "Gold Saver", threshold: 5000, icon: 'Trophy', description: "Wow! ₹5,000 saved!" },
  { id: 4, name: "Platinum Saver", threshold: 10000, icon: 'Gem', description: "₹10,000 in savings, you're a pro!" },
  { id: 5, name: "Diamond Hands", threshold: 25000, icon: 'Diamond', description: "An incredible ₹25,000 saved!" },
  { id: 6, name: "Ruby Investor", threshold: 50000, icon: 'Star', description: "₹50,000! You're on fire!" },
  { id: 7, name: "Emerald Mogul", threshold: 100000, icon: 'Crown', description: "Six-figure saver! ₹100,000 saved!" },
];