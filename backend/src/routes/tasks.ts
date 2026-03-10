import { Router } from 'express';
import { 
  getTasks, 
  getTask, 
  createTask, 
  updateTask, 
  deleteTask 
} from '../services/tasksService';

export const tasksRoutes = Router();

tasksRoutes.get('/', getTasks);
tasksRoutes.get('/:id', getTask);
tasksRoutes.post('/', createTask);
tasksRoutes.put('/:id', updateTask);
tasksRoutes.delete('/:id', deleteTask);
