import { Request, Response } from 'express';

// In-memory storage (replace with database in production)
let tasks: any[] = [];
let idCounter = 1;

export const getTasks = (req: Request, res: Response) => {
  res.json(tasks);
};

export const getTask = (req: Request, res: Response) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
};

export const createTask = (req: Request, res: Response) => {
  const task = {
    id: idCounter++,
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  tasks.push(task);
  res.status(201).json(task);
};

export const updateTask = (req: Request, res: Response) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks[index] = { 
    ...tasks[index], 
    ...req.body, 
    updatedAt: new Date().toISOString() 
  };
  res.json(tasks[index]);
};

export const deleteTask = (req: Request, res: Response) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks.splice(index, 1);
  res.json({ success: true });
};
