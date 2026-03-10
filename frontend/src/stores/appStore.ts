/**
 * @fileoverview 应用状态管理
 * @description 使用 Zustand 管理全局应用状态，包括任务、问题、验证项
 */

import { create } from 'zustand';
import { generateUuid, getTimestamp } from '../utils/ui';
import type { Task, Issue, Validation } from '../types';

/**
 * 应用状态接口
 * @description 定义全局状态的结构和操作方法
 */
interface AppState {
  // 状态数据
  /** 任务列表 */
  tasks: Task[];
  /** 问题列表 */
  issues: Issue[];
  /** 验证项列表 */
  validations: Validation[];

  // 任务操作方法
  /**
   * 添加新任务
   * @param task - 任务数据（不包含 id、createdAt、updatedAt）
   */
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  /**
   * 更新任务
   * @param id - 任务 ID
   * @param updates - 要更新的字段
   */
  updateTask: (id: string, updates: Partial<Task>) => void;
  /**
   * 删除任务
   * @param id - 任务 ID
   */
  deleteTask: (id: string) => void;

  // 问题操作方法
  /**
   * 添加新问题
   * @param issue - 问题数据（不包含 id、createdAt）
   */
  addIssue: (issue: Omit<Issue, 'id' | 'createdAt'>) => void;
  /**
   * 更新问题
   * @param id - 问题 ID
   * @param updates - 要更新的字段
   */
  updateIssue: (id: string, updates: Partial<Issue>) => void;
  /**
   * 删除问题
   * @param id - 问题 ID
   */
  deleteIssue: (id: string) => void;

  // 验证项操作方法
  /**
   * 添加新验证项
   * @param validation - 验证项数据（不包含 id）
   */
  addValidation: (validation: Omit<Validation, 'id'>) => void;
  /**
   * 更新验证项
   * @param id - 验证项 ID
   * @param updates - 要更新的字段
   */
  updateValidation: (id: string, updates: Partial<Validation>) => void;
  /**
   * 删除验证项
   * @param id - 验证项 ID
   */
  deleteValidation: (id: string) => void;
}

/**
 * 创建应用状态 Store
 * @description 使用 Zustand 创建全局状态管理
 * @returns 应用状态 Store
 */
export const useAppStore = create<AppState>((set) => ({
  // 初始化空状态
  tasks: [],
  issues: [],
  validations: [],

  // ========== 任务操作 ==========

  /**
   * 添加新任务
   * @description 生成 UUID 和时间戳后添加到任务列表
   */
  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...task,
          id: generateUuid(),
          createdAt: getTimestamp(),
          updatedAt: getTimestamp(),
        },
      ],
    })),

  /**
   * 更新任务
   * @description 根据 ID 更新任务字段，并自动更新 updatedAt
   */
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, ...updates, updatedAt: getTimestamp() } : t
      ),
    })),

  /**
   * 删除任务
   * @description 根据 ID 从任务列表中移除
   */
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),

  // ========== 问题操作 ==========

  /**
   * 添加新问题
   * @description 生成 UUID 和时间戳后添加到问题列表
   */
  addIssue: (issue) =>
    set((state) => ({
      issues: [
        ...state.issues,
        {
          ...issue,
          id: generateUuid(),
          createdAt: getTimestamp(),
        },
      ],
    })),

  /**
   * 更新问题
   * @description 根据 ID 更新问题字段
   */
  updateIssue: (id, updates) =>
    set((state) => ({
      issues: state.issues.map((i) => (i.id === id ? { ...i, ...updates } : i)),
    })),

  /**
   * 删除问题
   * @description 根据 ID 从问题列表中移除
   */
  deleteIssue: (id) =>
    set((state) => ({
      issues: state.issues.filter((i) => i.id !== id),
    })),

  // ========== 验证项操作 ==========

  /**
   * 添加新验证项
   * @description 生成 UUID 后添加到验证项列表
   */
  addValidation: (validation) =>
    set((state) => ({
      validations: [
        ...state.validations,
        {
          ...validation,
          id: generateUuid(),
        },
      ],
    })),

  /**
   * 更新验证项
   * @description 根据 ID 更新验证项字段
   */
  updateValidation: (id, updates) =>
    set((state) => ({
      validations: state.validations.map((v) =>
        v.id === id ? { ...v, ...updates } : v
      ),
    })),

  /**
   * 删除验证项
   * @description 根据 ID 从验证项列表中移除
   */
  deleteValidation: (id) =>
    set((state) => ({
      validations: state.validations.filter((v) => v.id !== id),
    })),
}));
