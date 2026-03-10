/**
 * @fileoverview 任务 API 测试
 * @description 测试任务相关的 RESTful API 端点
 */

import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { tasksRoutes } from '../../routes/tasks';

/**
 * 创建测试用 Express 应用
 */
function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/tasks', tasksRoutes);
  return app;
}

describe('Tasks API', () => {
  let app: express.Express;

  beforeEach(() => {
    app = createTestApp();
  });

  describe('GET /api/tasks', () => {
    it('should return all tasks', async () => {
      const response = await request(app).get('/api/tasks');
      
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should return a task by id', async () => {
      const response = await request(app).get('/api/tasks/1');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('title');
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app).get('/api/tasks/999');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for invalid id format', async () => {
      const response = await request(app).get('/api/tasks/abc');
      
      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task with valid data', async () => {
      const newTask = {
        title: 'Test Task',
        description: 'Test Description',
        status: 'pending',
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(newTask);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Test Task');
      expect(response.body).toHaveProperty('createdAt');
    });

    it('should return 400 for missing title', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ description: 'No title' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for empty title', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: '' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for invalid status', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .send({ title: 'Test', status: 'invalid' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update an existing task', async () => {
      const update = {
        title: 'Updated Title',
        status: 'completed',
      };

      const response = await request(app)
        .put('/api/tasks/1')
        .send(update);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Updated Title');
      expect(response.body.status).toBe('completed');
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app)
        .put('/api/tasks/999')
        .send({ title: 'Update' });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete an existing task', async () => {
      // First create a task to delete
      const createResponse = await request(app)
        .post('/api/tasks')
        .send({ title: 'To Delete' });
      
      const taskId = createResponse.body.id;

      const response = await request(app).delete(`/api/tasks/${taskId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);

      // Verify it's deleted
      const getResponse = await request(app).get(`/api/tasks/${taskId}`);
      expect(getResponse.status).toBe(404);
    });

    it('should return 404 for non-existent task', async () => {
      const response = await request(app).delete('/api/tasks/999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });
});
