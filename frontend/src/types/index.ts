export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  assignee?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Issue {
  id: string;
  category: 'product' | 'technical' | 'business';
  question: string;
  status: 'open' | 'answered' | 'deferred';
  answer?: string;
  createdAt: string;
}

export interface Validation {
  id: string;
  item: string;
  method: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  result?: string;
  priority: 'P0' | 'P1' | 'P2';
}

export interface PrdDocument {
  version: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
  content: string;
}
