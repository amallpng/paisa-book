import React, { useState } from 'react';
import { Transaction, Category } from '../../types';
import Button from '../ui/Button';
import TransactionForm from './TransactionForm';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  categories: Category[];
  onAdd: (transaction: Omit<Transaction, 'id'>) => void;
  onUpdate: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  isDashboard?: boolean;
  onViewAll?: () => void;
}

const TransactionRow: React.FC<{transaction: Transaction, categoryName: string, onEdit: () => void, onDelete: () => void}> = ({ transaction, categoryName, onEdit, onDelete }) => {
    const isExpense = transaction.type === 'expense';
    const amountColor = isExpense ? 'text-red-500' : 'text-green-500';
    const amountSign = isExpense ? '-' : '+';
    
    return (
        <tr className="border-b border-slate-200 dark:border-slate-700">
            <td className="p-3">
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-slate-500">{categoryName}</p>
            </td>
            <td className={`p-3 font-semibold ${amountColor}`}>
                {amountSign} ₹{transaction.amount.toFixed(2)}
            </td>
            <td className="p-3 text-slate-500 hidden md:table-cell">{new Date(transaction.date).toLocaleDateString()}</td>
            <td className="p-3">
                <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="sm" onClick={onEdit} className="p-2 h-auto"><Edit size={16} /></Button>
                    <Button variant="ghost" size="sm" onClick={onDelete} className="p-2 h-auto text-red-500 hover:text-red-500"><Trash2 size={16} /></Button>
                </div>
            </td>
        </tr>
    );
};


const TransactionList: React.FC<TransactionListProps> = ({ transactions, categories, onAdd, onUpdate, onDelete, isDashboard = false, onViewAll }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleOpenModal = (transaction: Transaction | null = null) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(false);
  };

  const handleSave = (transaction: Transaction | Omit<Transaction, 'id'>) => {
    if ('id' in transaction) {
      onUpdate(transaction as Transaction);
    } else {
      onAdd(transaction);
    }
    handleCloseModal();
  };
  
  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Uncategorized';
  };

  return (
    <div className="rounded-lg bg-white dark:bg-slate-800 p-4 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{isDashboard ? 'Recent Transactions' : 'All Transactions'}</h3>
        <div className="flex items-center space-x-2">
          {isDashboard && onViewAll && (
            <Button variant="ghost" onClick={onViewAll}>View All</Button>
          )}
          <Button onClick={() => handleOpenModal()}>
            <Plus size={16} className="mr-2" /> Add New
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-700 text-xs uppercase text-slate-700 dark:text-slate-400">
                <tr>
                    <th className="p-3">Description</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3 hidden md:table-cell">Date</th>
                    <th className="p-3"></th>
                </tr>
            </thead>
            <tbody>
                {transactions.length > 0 ? transactions.map(t => (
                    <TransactionRow 
                        key={t.id}
                        transaction={t}
                        categoryName={getCategoryName(t.categoryId)}
                        onEdit={() => handleOpenModal(t)}
                        onDelete={() => onDelete(t.id)}
                    />
                )) : (
                    <tr>
                        <td colSpan={4} className="text-center p-6 text-slate-500">No transactions yet.</td>
                    </tr>
                )}
            </tbody>
        </table>
      </div>
      
      <TransactionForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        transaction={editingTransaction}
        categories={categories}
      />
    </div>
  );
};

export default TransactionList;