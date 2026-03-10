import { Request, Response } from 'express';

// In-memory storage (replace with database in production)
let issues: any[] = [];
let idCounter = 1;

export const getIssues = (req: Request, res: Response) => {
  res.json(issues);
};

export const getIssue = (req: Request, res: Response) => {
  const issue = issues.find(i => i.id === parseInt(req.params.id));
  if (!issue) {
    return res.status(404).json({ error: 'Issue not found' });
  }
  res.json(issue);
};

export const createIssue = (req: Request, res: Response) => {
  const issue = {
    id: idCounter++,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  issues.push(issue);
  res.status(201).json(issue);
};

export const updateIssue = (req: Request, res: Response) => {
  const index = issues.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Issue not found' });
  }
  issues[index] = { ...issues[index], ...req.body };
  res.json(issues[index]);
};

export const deleteIssue = (req: Request, res: Response) => {
  const index = issues.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Issue not found' });
  }
  issues.splice(index, 1);
  res.json({ success: true });
};
