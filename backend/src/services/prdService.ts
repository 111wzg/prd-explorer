import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const PRD_PATH = path.join(__dirname, '../../../docs/prd.md');

export const getPrd = (req: Request, res: Response) => {
  try {
    const content = fs.readFileSync(PRD_PATH, 'utf-8');
    res.json({ 
      version: 'v0.1',
      status: 'draft',
      createdAt: '2026-03-10',
      content 
    });
  } catch (error) {
    res.status(404).json({ error: 'PRD not found' });
  }
};

export const updatePrd = (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    fs.writeFileSync(PRD_PATH, content, 'utf-8');
    res.json({ success: true, message: 'PRD updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update PRD' });
  }
};
