import { useState } from 'react';
import { Header } from './components/Header';
import { UserEntry } from './components/UserEntry';
import { RequestForm } from './components/RequestForm';
import { RequestList } from './components/RequestList';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Request, AppState } from './types';

const initialState: AppState = {
  currentUser: '',
  requests: [],
};

function App() {
  const [state, setState] = useLocalStorage<AppState>('ordekborc-state', initialState);

  const handleUserSubmit = (name: string) => {
    setState({ ...state, currentUser: name });
  };

  const handleRequestSubmit = (request: Omit<Request, 'id' | 'timestamp'>) => {
    const newRequest: Request = {
      ...request,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    setState({ ...state, requests: [...state.requests, newRequest] });
  };

  if (!state.currentUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <UserEntry onSubmit={handleUserSubmit} />
      </div>
    );
  }

  const debts = state.requests.filter(
    (r) =>
      (r.type === 'borrow' && r.from === state.currentUser) ||
      (r.type === 'lend' && r.to === state.currentUser)
  );

  const credits = state.requests.filter(
    (r) =>
      (r.type === 'lend' && r.from === state.currentUser) ||
      (r.type === 'borrow' && r.to === state.currentUser)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold mb-4">New Request</h2>
            <RequestForm currentUser={state.currentUser} onSubmit={handleRequestSubmit} />
          </div>
          <div>
            <RequestList
              title="Money You Owe"
              requests={debts}
              currentUser={state.currentUser}
            />
          </div>
        </div>
        <div className="mt-8">
          <RequestList
            title="Money Owed to You"
            requests={credits}
            currentUser={state.currentUser}
          />
        </div>
      </main>
    </div>
  );
}

export default App;