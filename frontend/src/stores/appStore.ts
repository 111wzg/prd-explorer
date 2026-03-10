import { create } from 'zustand';
import type { Task, Issue, Validation } from '../types';

interface AppState {
  tasks: Task[];
  issues: Issue[];
  validations: Validation[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  addIssue: (issue: Omit<Issue, 'id' | 'createdAt'>) => void;
  updateIssue: (id: string, updates: Partial<Issue>) => void;
  addValidation: (validation: Omit<Validation, 'id'>) => void;
  updateValidation: (id: string, updates: Partial<Validation>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  tasks: [],
  issues: [],
  validations: [],
  
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }]
  })),
  
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map(t => 
      t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
    )
  })),
  
  addIssue: (issue) => set((state) => ({
    issues: [...state.issues, {
      ...issue,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    }]
  })),
  
  updateIssue: (id, updates) => set((state) => ({
    issues: state.issues.map(i => 
      i.id === id ? { ...i, ...updates } : i
    )
  })),
  
  addValidation: (validation) => set((state) => ({
    validations: [...state.validations, {
      ...validation,
      id: crypto.randomUUID()
    }]
  })),
  
  updateValidation: (id, updates) => set((state) => ({
    validations: state.validations.map(v => 
      v.id === id ? { ...v, ...updates } : v
    )
  }))
}));
