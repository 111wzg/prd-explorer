/**
 * @fileoverview 通用 CRUD 服务基类
 * @description 提供通用的内存存储 CRUD 操作，减少代码重复
 */

import { type Request, type Response } from 'express';

/**
 * 基础实体接口
 * @description 所有实体必须包含的基本字段
 */
export interface BaseEntity {
  /** 实体唯一标识符 */
  id: number;
  /** 创建时间 */
  createdAt: string;
  /** 更新时间（可选） */
  updatedAt?: string;
}

/**
 * 通用 CRUD 服务类
 * @description 提供内存存储的增删改查操作
 * @template T - 实体类型，必须继承 BaseEntity
 */
export class CrudService<T extends BaseEntity> {
  /** 数据存储数组 */
  protected data: T[] = [];
  /** 自增 ID 计数器 */
  protected idCounter: number = 1;
  /** 实体名称（用于日志） */
  protected entityName: string;

  /**
   * 构造函数
   * @param entityName - 实体名称
   * @param initialData - 初始数据（可选）
   */
  constructor(entityName: string, initialData: T[] = []) {
    this.entityName = entityName;
    this.data = initialData;
    this.idCounter = initialData.length > 0 
      ? Math.max(...initialData.map((item) => item.id)) + 1 
      : 1;
  }

  /**
   * 获取所有实体
   * @returns 实体数组
   */
  getAll(): T[] {
    return this.data;
  }

  /**
   * 根据 ID 获取实体
   * @param id - 实体 ID
   * @returns 实体对象，未找到返回 undefined
   */
  getById(id: number): T | undefined {
    return this.data.find((item) => item.id === id);
  }

  /**
   * 创建新实体
   * @param entity - 实体数据（不包含 id、createdAt）
   * @returns 创建的实体
   */
  create(entity: Omit<T, 'id' | 'createdAt'>): T {
    const newEntity = {
      ...entity,
      id: this.idCounter++,
      createdAt: new Date().toISOString(),
    } as T;
    this.data.push(newEntity);
    return newEntity;
  }

  /**
   * 更新实体
   * @param id - 实体 ID
   * @param updates - 要更新的字段
   * @returns 更新后的实体，未找到返回 undefined
   */
  update(id: number, updates: Partial<T>): T | undefined {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) return undefined;

    this.data[index] = {
      ...this.data[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return this.data[index];
  }

  /**
   * 删除实体
   * @param id - 实体 ID
   * @returns 是否删除成功
   */
  delete(id: number): boolean {
    const index = this.data.findIndex((item) => item.id === id);
    if (index === -1) return false;

    this.data.splice(index, 1);
    return true;
  }

  /**
   * 获取实体数量
   * @returns 实体总数
   */
  count(): number {
    return this.data.length;
  }

  /**
   * 清空所有数据
   * @description 用于测试环境
   */
  clear(): void {
    this.data = [];
    this.idCounter = 1;
  }

  /**
   * 获取实体名称
   * @returns 实体名称
   */
  getEntityName(): string {
    return this.entityName;
  }
}

/**
 * 创建 Express 路由处理器
 * @description 为 CrudService 生成标准的 RESTful 路由处理器
 * @template T - 实体类型
 * @param service - CrudService 实例
 * @returns 路由处理器对象
 */
export function createCrudHandlers<T extends BaseEntity>(service: CrudService<T>) {
  const entityName = service.getEntityName();
  
  return {
    /**
     * 获取所有实体
     */
    getAll: (_req: Request, res: Response) => {
      res.json(service.getAll());
    },

    /**
     * 获取单个实体
     */
    getById: (req: Request, res: Response) => {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }

      const entity = service.getById(id);
      if (!entity) {
        return res.status(404).json({ error: `${entityName} not found` });
      }
      res.json(entity);
    },

    /**
     * 创建实体
     */
    create: (req: Request, res: Response) => {
      try {
        const entity = service.create(req.body);
        res.status(201).json(entity);
      } catch (error) {
        res.status(400).json({ error: 'Failed to create entity' });
      }
    },

    /**
     * 更新实体
     */
    update: (req: Request, res: Response) => {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }

      const entity = service.update(id, req.body);
      if (!entity) {
        return res.status(404).json({ error: `${entityName} not found` });
      }
      res.json(entity);
    },

    /**
     * 删除实体
     */
    delete: (req: Request, res: Response) => {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }

      const success = service.delete(id);
      if (!success) {
        return res.status(404).json({ error: `${entityName} not found` });
      }
      res.json({ success: true });
    },
  };
}
