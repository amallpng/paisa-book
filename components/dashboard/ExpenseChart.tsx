import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Transaction, Category, TransactionType } from '../../types';

interface ExpenseChartProps {
  transactions: Transaction[];
  categories: Category[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ff4d4d', '#4ddbff'];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-md bg-white dark:bg-slate-700 p-2 shadow-lg border border-slate-200 dark:border-slate-600">
          <p className="font-bold">{`${payload[0].name}`}</p>
          <p className="text-sm">{`Amount: ₹${payload[0].value.toFixed(2)}`}</p>
          <p className="text-sm">{`Percentage: ${(payload[0].percent * 100).toFixed(2)}%`}</p>
        </div>
      );
    }
  
    return null;
};

const ExpenseChart: React.FC<ExpenseChartProps> = ({ transactions, categories }) => {
  const chartData = useMemo(() => {
    const expenseData: { [key: string]: number } = {};
    
    transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .forEach(t => {
        if (expenseData[t.categoryId]) {
          expenseData[t.categoryId] += t.amount;
        } else {
          expenseData[t.categoryId] = t.amount;
        }
      });

    return Object.entries(expenseData).map(([categoryId, amount]) => {
        const category = categories.find(c => c.id === categoryId);
        return {
            name: category ? category.name : 'Uncategorized',
            value: amount
        };
    }).sort((a, b) => b.value - a.value);

  }, [transactions, categories]);

  return (
    <div className="rounded-lg bg-white dark:bg-slate-800 p-4 shadow-md h-full">
      <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
      {chartData.length > 0 ? (
         <ResponsiveContainer width="100%" height={300}>
            <PieChart>
            <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
            >
                {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full text-slate-500">
            No expense data to display.
        </div>
      )}
    </div>
  );
};

export default ExpenseChart;