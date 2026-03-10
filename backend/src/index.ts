import express from 'express';
import cors from 'cors';
import { prdRoutes } from './routes/prd';
import { tasksRoutes } from './routes/tasks';
import { issuesRoutes } from './routes/issues';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/prd', prdRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/issues', issuesRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
