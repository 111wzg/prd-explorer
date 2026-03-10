/**
 * @fileoverview 问题服务
 * @description 提供问题的 CRUD 操作和业务逻辑
 */

import { type Request, type Response } from 'express';
import { CrudService, createCrudHandlers, type BaseEntity } from '../utils/crudService';

/**
 * 问题实体接口
 */
interface Issue extends BaseEntity {
  category: 'product' | 'technical' | 'business';
  question: string;
  status: 'open' | 'answered' | 'deferred';
  answer?: string;
}

/**
 * 问题验证器
 * @description 验证创建问题的请求体
 * @param body - 请求体
 * @returns 验证结果
 */
function validateIssueCreate(body: unknown): { valid: boolean; error?: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body must be an object' };
  }

  const issueBody = body as Record<string, unknown>;

  if (!issueBody.question || typeof issueBody.question !== 'string') {
    return { valid: false, error: 'Question is required and must be a string' };
  }

  if (issueBody.question.length < 1 || issueBody.question.length > 500) {
    return { valid: false, error: 'Question must be between 1 and 500 characters' };
  }

  if (issueBody.category && !['product', 'technical', 'business'].includes(issueBody.category as string)) {
    return { valid: false, error: 'Invalid category value' };
  }

  if (issueBody.status && !['open', 'answered', 'deferred'].includes(issueBody.status as string)) {
    return { valid: false, error: 'Invalid status value' };
  }

  return { valid: true };
}

/**
 * 问题服务实例
 * @description 单例模式，全局共享问题数据
 */
export const issueService = new CrudService<Issue>('Issue', [
  // 初始示例数据
  {
    id: 1,
    category: 'product',
    question: '目标用户群到底是谁？',
    status: 'open',
    answer: undefined,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    category: 'product',
    question: '核心痛点是否足够强烈？',
    status: 'open',
    answer: undefined,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    category: 'business',
    question: '商业模式是什么？',
    status: 'open',
    answer: undefined,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    category: 'technical',
    question: '技术实现路径是什么？',
    status: 'open',
    answer: undefined,
    createdAt: new Date().toISOString(),
  },
]);

/**
 * 问题路由处理器
 */
const handlers = createCrudHandlers(issueService);

/**
 * 获取所有问题
 * @route GET /api/issues
 */
export const getIssues = handlers.getAll;

/**
 * 获取单个问题
 * @route GET /api/issues/:id
 */
export const getIssue = handlers.getById;

/**
 * 创建问题
 * @route POST /api/issues
 * @body {string} question - 问题描述（必填）
 * @body {string} [category] - 问题分类
 * @body {string} [status] - 问题状态
 * @body {string} [answer] - 答案
 */
export const createIssue = (req: Request, res: Response) => {
  // 输入验证
  const validation = validateIssueCreate(req.body);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  handlers.create(req, res);
};

/**
 * 更新问题
 * @route PUT /api/issues/:id
 */
export const updateIssue = handlers.update;

/**
 * 删除问题
 * @route DELETE /api/issues/:id
 */
export const deleteIssue = handlers.delete;
