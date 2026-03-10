/**
 * @fileoverview 任务服务
 * @description 提供任务的 CRUD 操作和业务逻辑
 */

import { type Request, type Response } from 'express';
import { CrudService, createCrudHandlers, type BaseEntity } from '../utils/crudService';

/**
 * 任务实体接口
 */
interface Task extends BaseEntity {
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  assignee?: string;
  dueDate?: string;
}

/**
 * 任务验证器
 * @description 验证创建任务的请求体
 * @param body - 请求体
 * @returns 验证结果
 */
function validateTaskCreate(body: unknown): { valid: boolean; error?: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body must be an object' };
  }

  const taskBody = body as Record<string, unknown>;

  if (!taskBody.title || typeof taskBody.title !== 'string') {
    return { valid: false, error: 'Title is required and must be a string' };
  }

  if (taskBody.title.length < 1 || taskBody.title.length > 200) {
    return { valid: false, error: 'Title must be between 1 and 200 characters' };
  }

  if (taskBody.status && !['pending', 'in_progress', 'completed'].includes(taskBody.status as string)) {
    return { valid: false, error: 'Invalid status value' };
  }

  return { valid: true };
}

/**
 * 任务服务实例
 * @description 单例模式，全局共享任务数据
 */
export const taskService = new CrudService<Task>('Task', [
  // 初始示例数据
  {
    id: 1,
    title: '用户访谈计划',
    description: '计划访谈 N 人，验证核心需求',
    status: 'pending',
    assignee: undefined,
    dueDate: '2026-03-17',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: '竞品分析',
    description: '列出竞品清单并分析',
    status: 'pending',
    assignee: undefined,
    dueDate: '2026-03-17',
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: '技术可行性评估',
    description: '评估技术实现路径',
    status: 'pending',
    assignee: undefined,
    dueDate: '2026-03-17',
    createdAt: new Date().toISOString(),
  },
]);

/**
 * 任务路由处理器
 */
const handlers = createCrudHandlers(taskService);

/**
 * 获取所有任务
 * @route GET /api/tasks
 */
export const getTasks = handlers.getAll;

/**
 * 获取单个任务
 * @route GET /api/tasks/:id
 */
export const getTask = handlers.getById;

/**
 * 创建任务
 * @route POST /api/tasks
 * @body {string} title - 任务标题（必填）
 * @body {string} [description] - 任务描述
 * @body {string} [status] - 任务状态
 * @body {string} [assignee] - 负责人
 * @body {string} [dueDate] - 截止日期
 */
export const createTask = (req: Request, res: Response) => {
  // 输入验证
  const validation = validateTaskCreate(req.body);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  handlers.create(req, res);
};

/**
 * 更新任务
 * @route PUT /api/tasks/:id
 */
export const updateTask = handlers.update;

/**
 * 删除任务
 * @route DELETE /api/tasks/:id
 */
export const deleteTask = handlers.delete;
