/**
 * @fileoverview CRUD 服务测试
 * @description 测试通用 CRUD 操作的正確性
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { CrudService, type BaseEntity } from '../crudService';

/**
 * 测试用实体接口
 */
interface TestEntity extends BaseEntity {
  name: string;
  value?: number;
}

describe('CrudService', () => {
  let service: CrudService<TestEntity>;

  beforeEach(() => {
    service = new CrudService<TestEntity>('TestEntity');
  });

  describe('constructor', () => {
    it('should initialize with empty data', () => {
      expect(service.count()).toBe(0);
    });

    it('should initialize with custom initial data', () => {
      const initialData: TestEntity[] = [
        { id: 1, name: 'Item 1', createdAt: '2026-01-01T00:00:00.000Z' },
        { id: 2, name: 'Item 2', createdAt: '2026-01-01T00:00:00.000Z' },
      ];
      service = new CrudService<TestEntity>('TestEntity', initialData);
      expect(service.count()).toBe(2);
    });
  });

  describe('create', () => {
    it('should create entity with auto-generated id and timestamp', () => {
      const entity = service.create({ name: 'Test Item' });
      
      expect(entity.id).toBe(1);
      expect(entity.name).toBe('Test Item');
      expect(entity.createdAt).toBeDefined();
      expect(new Date(entity.createdAt).getTime()).toBeLessThanOrEqual(Date.now());
    });

    it('should increment id for each creation', () => {
      const entity1 = service.create({ name: 'Item 1' });
      const entity2 = service.create({ name: 'Item 2' });
      
      expect(entity1.id).toBe(1);
      expect(entity2.id).toBe(2);
    });
  });

  describe('getAll', () => {
    it('should return all entities', () => {
      service.create({ name: 'Item 1' });
      service.create({ name: 'Item 2' });
      
      const all = service.getAll();
      expect(all).toHaveLength(2);
      expect(all.map((e) => e.name)).toEqual(['Item 1', 'Item 2']);
    });

    it('should return empty array when no data', () => {
      expect(service.getAll()).toEqual([]);
    });
  });

  describe('getById', () => {
    it('should return entity by id', () => {
      const created = service.create({ name: 'Test Item' });
      const found = service.getById(created.id);
      
      expect(found).toBeDefined();
      expect(found?.name).toBe('Test Item');
    });

    it('should return undefined for non-existent id', () => {
      const found = service.getById(999);
      expect(found).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update entity and set updatedAt', () => {
      const created = service.create({ name: 'Original' });
      
      const updated = service.update(created.id, { name: 'Updated' });
      
      expect(updated?.name).toBe('Updated');
      expect(updated?.updatedAt).toBeDefined();
      expect(new Date(updated!.updatedAt!).getTime()).toBeGreaterThanOrEqual(
        new Date(created.createdAt).getTime()
      );
    });

    it('should return undefined for non-existent id', () => {
      const updated = service.update(999, { name: 'Updated' });
      expect(updated).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('should delete entity and return true', () => {
      const created = service.create({ name: 'To Delete' });
      
      const deleted = service.delete(created.id);
      
      expect(deleted).toBe(true);
      expect(service.count()).toBe(0);
    });

    it('should return false for non-existent id', () => {
      const deleted = service.delete(999);
      expect(deleted).toBe(false);
    });
  });

  describe('count', () => {
    it('should return correct count', () => {
      expect(service.count()).toBe(0);
      
      service.create({ name: 'Item 1' });
      expect(service.count()).toBe(1);
      
      service.create({ name: 'Item 2' });
      expect(service.count()).toBe(2);
      
      service.delete(1);
      expect(service.count()).toBe(1);
    });
  });

  describe('clear', () => {
    it('should remove all entities and reset counter', () => {
      service.create({ name: 'Item 1' });
      service.create({ name: 'Item 2' });
      
      service.clear();
      
      expect(service.count()).toBe(0);
      expect(service.create({ name: 'New Item' }).id).toBe(1);
    });
  });
});
