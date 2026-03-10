import { Router } from 'express';
import { 
  getIssues, 
  getIssue, 
  createIssue, 
  updateIssue, 
  deleteIssue 
} from '../services/issuesService';

export const issuesRoutes = Router();

issuesRoutes.get('/', getIssues);
issuesRoutes.get('/:id', getIssue);
issuesRoutes.post('/', createIssue);
issuesRoutes.put('/:id', updateIssue);
issuesRoutes.delete('/:id', deleteIssue);
