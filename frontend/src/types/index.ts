/**
 * @fileoverview 类型定义 - 应用数据结构
 * @description 定义前端使用的所有 TypeScript 接口和类型
 */

/**
 * 任务状态枚举
 * @typedef {Object} TaskStatus
 * @property {'pending'} pending - 待处理
 * @property {'in_progress'} in_progress - 进行中
 * @property {'completed'} completed - 已完成
 */

/**
 * 任务接口
 * @description 表示一个待办任务，用于追踪产品探索过程中的各项工作
 */
export interface Task {
  /** 任务唯一标识符 (UUID) */
  id: string;
  /** 任务标题 */
  title: string;
  /** 任务描述（可选） */
  description?: string;
  /** 任务状态 */
  status: 'pending' | 'in_progress' | 'completed';
  /** 负责人（可选） */
  assignee?: string;
  /** 截止日期（ISO 日期字符串） */
  dueDate?: string;
  /** 创建时间（ISO 日期字符串） */
  createdAt: string;
  /** 最后更新时间（ISO 日期字符串） */
  updatedAt: string;
}

/**
 * 问题分类枚举
 * @typedef {Object} IssueCategory
 * @property {'product'} product - 产品相关问题
 * @property {'technical'} technical - 技术相关问题
 * @property {'business'} business - 商业相关问题
 */

/**
 * 问题接口
 * @description 表示一个待确认的问题，用于追踪产品探索中的疑问
 */
export interface Issue {
  /** 问题唯一标识符 (UUID) */
  id: string;
  /** 问题分类 */
  category: 'product' | 'technical' | 'business';
  /** 问题描述 */
  question: string;
  /** 问题状态 */
  status: 'open' | 'answered' | 'deferred';
  /** 答案（已解答时填写） */
  answer?: string;
  /** 创建时间（ISO 日期字符串） */
  createdAt: string;
}

/**
 * 验证项接口
 * @description 表示一个需要验证的假设或需求，用于追踪验证进度
 */
export interface Validation {
  /** 验证项唯一标识符 (UUID) */
  id: string;
  /** 验证项描述 */
  item: string;
  /** 验证方法 */
  method: string;
  /** 验证状态 */
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  /** 验证结果（完成后填写） */
  result?: string;
  /** 优先级 */
  priority: 'P0' | 'P1' | 'P2';
}

/**
 * PRD 文档接口
 * @description 表示产品需求文档的元数据和内容
 */
export interface PrdDocument {
  /** 文档版本号 */
  version: string;
  /** 文档状态 */
  status: string;
  /** 创建时间（ISO 日期字符串） */
  createdAt: string;
  /** 最后更新时间（可选，ISO 日期字符串） */
  updatedAt?: string;
  /** 文档内容（Markdown 格式） */
  content: string;
}
