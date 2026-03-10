/**
 * @fileoverview 验证项 API 测试
 * @description 测试验证项相关的 RESTful API 端点
 */

import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { validationsRoutes } from '../../routes/validations';

/**
 * 创建测试用 Express 应用
 */
function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/validations', validationsRoutes);
  return app;
}

describe('Validations API', () => {
  let app: express.Express;

  beforeEach(() => {
    app = createTestApp();
  });

  describe('GET /api/validations', () => {
    it('should return all validations', async () => {
      const response = await request(app).get('/api/validations');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/validations/:id', () => {
    it('should return a validation by id', async () => {
      const response = await request(app).get('/api/validations/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('item');
      expect(response.body).toHaveProperty('method');
    });

    it('should return 404 for non-existent validation', async () => {
      const response = await request(app).get('/api/validations/999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for invalid id format', async () => {
      const response = await request(app).get('/api/validations/abc');

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/validations', () => {
    it('should create a new validation with valid data', async () => {
      const newValidation = {
        item: 'Test Validation Item',
        method: 'Test Method',
        priority: 'P0',
      };

      const response = await request(app)
        .post('/api/validations')
        .send(newValidation);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.item).toBe('Test Validation Item');
      expect(response.body).toHaveProperty('createdAt');
    });

    it('should return 400 for missing item', async () => {
      const response = await request(app)
        .post('/api/validations')
        .send({ method: 'No item' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for missing method', async () => {
      const response = await request(app)
        .post('/api/validations')
        .send({ item: 'Test item' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for invalid priority', async () => {
      const response = await request(app)
        .post('/api/validations')
        .send({ item: 'Test', method: 'Test', priority: 'P3' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PUT /api/validations/:id', () => {
    it('should update an existing validation', async () => {
      const update = {
        status: 'completed',
        result: '验证通过',
      };

      const response = await request(app)
        .put('/api/validations/1')
        .send(update);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('completed');
      expect(response.body.result).toBe('验证通过');
    });

    it('should return 404 for non-existent validation', async () => {
      const response = await request(app)
        .put('/api/validations/999')
        .send({ status: 'completed' });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('DELETE /api/validations/:id', () => {
    it('should delete an existing validation', async () => {
      // First create a validation to delete
      const createResponse = await request(app)
        .post('/api/validations')
        .send({ item: 'To Delete', method: 'Test' });

      const validationId = createResponse.body.id;

      const response = await request(app).delete(`/api/validations/${validationId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);

      // Verify it's deleted
      const getResponse = await request(app).get(`/api/validations/${validationId}`);
      expect(getResponse.status).toBe(404);
    });

    it('should return 404 for non-existent validation', async () => {
      const response = await request(app).delete('/api/validations/999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });
});
