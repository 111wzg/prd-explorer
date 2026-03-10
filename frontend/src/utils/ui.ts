/**
 * @fileoverview UI 工具函数
 * @description 提供通用的 UI 渲染工具，如状态映射、格式化等
 */

import type { Task, Issue, Validation } from '../types';

/**
 * 任务状态配置
 * @description 定义任务状态对应的显示文本和颜色
 */
export const TASK_STATUS_CONFIG: Record<
  Task['status'],
  { text: string; color: string }
> = {
  pending: { text: '待处理', color: 'default' },
  in_progress: { text: '进行中', color: 'processing' },
  completed: { text: '已完成', color: 'success' },
} as const;

/**
 * 问题分类配置
 * @description 定义问题分类对应的显示文本和颜色
 */
export const ISSUE_CATEGORY_CONFIG: Record<
  Issue['category'],
  { text: string; color: string }
> = {
  product: { text: '产品', color: 'blue' },
  technical: { text: '技术', color: 'green' },
  business: { text: '商业', color: 'orange' },
} as const;

/**
 * 问题状态配置
 * @description 定义问题状态对应的显示文本和颜色
 */
export const ISSUE_STATUS_CONFIG: Record<
  Issue['status'],
  { text: string; color: string }
> = {
  open: { text: '开放', color: 'default' },
  answered: { text: '已解答', color: 'success' },
  deferred: { text: '暂缓', color: 'warning' },
} as const;

/**
 * 验证项状态配置
 * @description 定义验证项状态对应的显示文本和颜色
 */
export const VALIDATION_STATUS_CONFIG: Record<
  Validation['status'],
  { text: string; color: string }
> = {
  pending: { text: '待验证', color: 'default' },
  in_progress: { text: '验证中', color: 'processing' },
  completed: { text: '已完成', color: 'success' },
  failed: { text: '已失败', color: 'error' },
} as const;

/**
 * 优先级配置
 * @description 定义优先级对应的显示文本和颜色
 */
export const PRIORITY_CONFIG: Record<
  Validation['priority'],
  { text: string; color: string }
> = {
  P0: { text: '紧急', color: 'red' },
  P1: { text: '重要', color: 'orange' },
  P2: { text: '一般', color: 'default' },
} as const;

/**
 * 格式化日期
 * @description 将 ISO 日期字符串格式化为可读格式
 * @param dateStr - ISO 日期字符串
 * @returns 格式化后的日期字符串 (YYYY-MM-DD)
 */
export const formatDate = (dateStr?: string): string => {
  if (!dateStr) return '-';
  return dateStr.slice(0, 10);
};

/**
 * 生成 UUID
 * @description 生成符合 RFC 4122 的 UUID v4
 * @returns UUID 字符串
 */
export const generateUuid = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // 降级方案：使用 Math.random 生成
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * 获取当前时间戳
 * @description 获取当前时间的 ISO 格式字符串
 * @returns ISO 日期字符串
 */
export const getTimestamp = (): string => new Date().toISOString();
