
import React, { useState, useEffect } from 'react';
import { Transaction, Category, TransactionType } from '../../types';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Transaction | Omit<Transaction, 'id'>) => void;
  transaction: Transaction | null;
  categories: Category[];
}

const TransactionForm: React.FC<TransactionFormProps> = ({ isOpen, onClose, onSave, transaction, categories }) => {
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    if (transaction) {
      setType(transaction.type);
      setAmount(String(transaction.amount));
      setDescription(transaction.description);
      setDate(new Date(transaction.date).toISOString().split('T')[0]);
      setCategoryId(transaction.categoryId);
    } else {
      setType(TransactionType.EXPENSE);
      setAmount('');
      setDescription('');
      setDate(new Date().toISOString().split('T')[0]);
      setCategoryId(categories.length > 0 ? categories[0].id : '');
    }
  }, [transaction, isOpen, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const transactionData = {
      type,
      amount: parseFloat(amount),
      description,
      date,
      categoryId,
    };
    if (transaction) {
      onSave({ ...transactionData, id: transaction.id });
    } else {
      onSave(transactionData);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={transaction ? 'Edit Transaction' : 'Add Transaction'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setType(TransactionType.EXPENSE)}
              className={`w-full rounded-l-md px-4 py-2 text-sm font-medium ${type === TransactionType.EXPENSE ? 'bg-red-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setType(TransactionType.INCOME)}
              className={`w-full rounded-r-md px-4 py-2 text-sm font-medium ${type === TransactionType.INCOME ? 'bg-green-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}
            >
              Income
            </button>
          </div>
        </div>

        <Input id="amount" label="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <Input id="description" label="Description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        
        <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
            <select id="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm dark:bg-slate-700 dark:border-slate-600">
                {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </select>
        </div>
        
        <Input id="date" label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  );
};

export default TransactionForm;
