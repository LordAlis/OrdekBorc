import { useState } from 'react';
import { Request } from '../types';

interface RequestFormProps {
  currentUser: string;
  onSubmit: (request: Omit<Request, 'id' | 'timestamp'>) => void;
}

export function RequestForm({ currentUser, onSubmit }: RequestFormProps) {
  const [type, setType] = useState<'borrow' | 'lend'>('borrow');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [to, setTo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && description && to) {
      onSubmit({
        from: currentUser,
        to,
        amount: parseFloat(amount),
        description,
        type,
      });
      setAmount('');
      setDescription('');
      setTo('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setType('borrow')}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              type === 'borrow'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Borrow
          </button>
          <button
            type="button"
            onClick={() => setType('lend')}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              type === 'lend'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Lend
          </button>
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label htmlFor="to" className="block text-sm font-medium text-gray-700">
            {type === 'borrow' ? 'Borrow from' : 'Lend to'}
          </label>
          <input
            type="text"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter name"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="What's this for?"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Submit Request
        </button>
      </div>
    </form>
  );
}