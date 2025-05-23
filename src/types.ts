export interface User {
  name: string;
}

export interface Request {
  id: string;
  from: string;
  to: string;
  amount: number;
  description: string;
  type: 'borrow' | 'lend';
  timestamp: number;
}

export interface AppState {
  currentUser: string;
  requests: Request[];
}