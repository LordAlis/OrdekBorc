import { Coins } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-indigo-600 text-white py-4 px-6 shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center gap-2">
        <Coins className="w-8 h-8" />
        <h1 className="text-2xl font-bold">OrdekBorc</h1>
      </div>
    </header>
  );
}