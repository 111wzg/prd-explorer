/**
 * @fileoverview UI 工具函数测试
 * @description 测试状态映射、日期格式化、UUID 生成等功能
 */

import { describe, it, expect } from 'vitest';
import {
  TASK_STATUS_CONFIG,
  ISSUE_CATEGORY_CONFIG,
  ISSUE_STATUS_CONFIG,
  formatDate,
  generateUuid,
  getTimestamp,
} from '../ui';

describe('UI Utils', () => {
  describe('TASK_STATUS_CONFIG', () => {
    it('should have correct status mappings', () => {
      expect(TASK_STATUS_CONFIG.pending).toEqual({
        text: '待处理',
        color: 'default',
      });
      expect(TASK_STATUS_CONFIG.in_progress).toEqual({
        text: '进行中',
        color: 'processing',
      });
      expect(TASK_STATUS_CONFIG.completed).toEqual({
        text: '已完成',
        color: 'success',
      });
    });
  });

  describe('ISSUE_CATEGORY_CONFIG', () => {
    it('should have correct category mappings', () => {
      expect(ISSUE_CATEGORY_CONFIG.product).toEqual({
        text: '产品',
        color: 'blue',
      });
      expect(ISSUE_CATEGORY_CONFIG.technical).toEqual({
        text: '技术',
        color: 'green',
      });
      expect(ISSUE_CATEGORY_CONFIG.business).toEqual({
        text: '商业',
        color: 'orange',
      });
    });
  });

  describe('ISSUE_STATUS_CONFIG', () => {
    it('should have correct status mappings', () => {
      expect(ISSUE_STATUS_CONFIG.open).toEqual({
        text: '开放',
        color: 'default',
      });
      expect(ISSUE_STATUS_CONFIG.answered).toEqual({
        text: '已解答',
        color: 'success',
      });
      expect(ISSUE_STATUS_CONFIG.deferred).toEqual({
        text: '暂缓',
        color: 'warning',
      });
    });
  });

  describe('formatDate', () => {
    it('should format ISO date string correctly', () => {
      expect(formatDate('2026-03-10T14:30:00.000Z')).toBe('2026-03-10');
      expect(formatDate('2026-01-01T00:00:00.000Z')).toBe('2026-01-01');
    });

    it('should return "-" for undefined or empty input', () => {
      expect(formatDate(undefined)).toBe('-');
      expect(formatDate('')).toBe('-');
    });
  });

  describe('generateUuid', () => {
    it('should generate valid UUID format', () => {
      const uuid = generateUuid();
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      expect(uuid).toMatch(uuidRegex);
    });

    it('should generate unique UUIDs', () => {
      const uuids = new Set([generateUuid(), generateUuid(), generateUuid()]);
      expect(uuids.size).toBe(3);
    });
  });

  describe('getTimestamp', () => {
    it('should return ISO date string', () => {
      const timestamp = getTimestamp();
      expect(timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });

    it('should return recent timestamp', () => {
      const before = Date.now();
      const timestamp = getTimestamp();
      const after = Date.now();
      
      const timestampMs = new Date(timestamp).getTime();
      expect(timestampMs).toBeGreaterThanOrEqual(before);
      expect(timestampMs).toBeLessThanOrEqual(after);
    });
  });
});
