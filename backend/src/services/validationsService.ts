/**
 * @fileoverview 验证项服务
 * @description 提供验证项的 CRUD 操作和业务逻辑
 */

import { type Request, type Response } from 'express';
import { CrudService, createCrudHandlers, type BaseEntity } from '../utils/crudService';

/**
 * 验证项实体接口
 */
interface Validation extends BaseEntity {
  item: string;
  method: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  result?: string;
  priority: 'P0' | 'P1' | 'P2';
}

/**
 * 验证项验证器
 * @description 验证创建验证项的请求体
 * @param body - 请求体
 * @returns 验证结果
 */
function validateValidationCreate(body: unknown): { valid: boolean; error?: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body must be an object' };
  }

  const bodyObj = body as Record<string, unknown>;

  if (!bodyObj.item || typeof bodyObj.item !== 'string') {
    return { valid: false, error: 'Item is required and must be a string' };
  }

  if (bodyObj.item.length < 1 || bodyObj.item.length > 500) {
    return { valid: false, error: 'Item must be between 1 and 500 characters' };
  }

  if (!bodyObj.method || typeof bodyObj.method !== 'string') {
    return { valid: false, error: 'Method is required and must be a string' };
  }

  if (bodyObj.priority && !['P0', 'P1', 'P2'].includes(bodyObj.priority as string)) {
    return { valid: false, error: 'Invalid priority value' };
  }

  if (bodyObj.status && !['pending', 'in_progress', 'completed', 'failed'].includes(bodyObj.status as string)) {
    return { valid: false, error: 'Invalid status value' };
  }

  return { valid: true };
}

/**
 * 验证项服务实例
 * @description 单例模式，全局共享验证项数据
 */
export const validationService = new CrudService<Validation>('Validation', [
  // 初始示例数据（来自 PRD）
  {
    id: 1,
    item: '用户有某需求',
    method: '用户访谈',
    status: 'pending',
    priority: 'P0',
    result: undefined,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    item: '技术可实现',
    method: '技术预研',
    status: 'pending',
    priority: 'P0',
    result: undefined,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    item: '商业模式可行',
    method: '市场调研',
    status: 'pending',
    priority: 'P1',
    result: undefined,
    createdAt: new Date().toISOString(),
  },
]);

/**
 * 验证项路由处理器
 */
const handlers = createCrudHandlers(validationService);

/**
 * 获取所有验证项
 * @route GET /api/validations
 */
export const getValidations = handlers.getAll;

/**
 * 获取单个验证项
 * @route GET /api/validations/:id
 */
export const getValidation = handlers.getById;

/**
 * 创建验证项
 * @route POST /api/validations
 * @body {string} item - 验证项描述（必填）
 * @body {string} method - 验证方法（必填）
 * @body {string} [priority] - 优先级
 * @body {string} [status] - 状态
 * @body {string} [result] - 验证结果
 */
export const createValidation = (req: Request, res: Response) => {
  // 输入验证
  const validation = validateValidationCreate(req.body);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  handlers.create(req, res);
};

/**
 * 更新验证项
 * @route PUT /api/validations/:id
 */
export const updateValidation = handlers.update;

/**
 * 删除验证项
 * @route DELETE /api/validations/:id
 */
export const deleteValidation = handlers.delete;
