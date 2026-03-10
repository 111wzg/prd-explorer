/**
 * @fileoverview 验证项组件测试
 * @description 测试 ValidationTracker 组件的渲染和交互
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ValidationTracker } from '../ValidationTracker';
import { useAppStore } from '../../stores/appStore';

describe('ValidationTracker', () => {
  beforeEach(() => {
    // 清空 Store
    useAppStore.setState({
      validations: [],
      tasks: [],
      issues: [],
    });
  });

  it('should render empty state when no validations', () => {
    render(<ValidationTracker />);
    expect(screen.getByText('暂无验证项')).toBeInTheDocument();
  });

  it('should render validations with correct data', () => {
    // 添加测试数据
    useAppStore.getState().addValidation({
      item: 'Test Validation',
      method: 'Test Method',
      status: 'pending',
      priority: 'P0',
    });

    render(<ValidationTracker />);

    expect(screen.getByText('Test Validation')).toBeInTheDocument();
    expect(screen.getByText('Test Method')).toBeInTheDocument();
    expect(screen.getByText('紧急')).toBeInTheDocument();
    expect(screen.getByText('待验证')).toBeInTheDocument();
  });

  it('should display priority tags correctly', () => {
    useAppStore.getState().addValidation({
      item: 'P0 Item',
      method: 'Method',
      status: 'pending',
      priority: 'P0',
    });
    useAppStore.getState().addValidation({
      item: 'P1 Item',
      method: 'Method',
      status: 'pending',
      priority: 'P1',
    });
    useAppStore.getState().addValidation({
      item: 'P2 Item',
      method: 'Method',
      status: 'pending',
      priority: 'P2',
    });

    render(<ValidationTracker />);

    expect(screen.getByText('紧急')).toBeInTheDocument();
    expect(screen.getByText('重要')).toBeInTheDocument();
    expect(screen.getByText('一般')).toBeInTheDocument();
  });

  it('should update validation status when action button clicked', () => {
    useAppStore.getState().addValidation({
      item: 'Test Item',
      method: 'Method',
      status: 'pending',
      priority: 'P0',
    });

    render(<ValidationTracker />);

    // 点击"开始验证"按钮
    const startButton = screen.getByText('开始验证');
    fireEvent.click(startButton);

    // 验证状态已更新
    expect(screen.getByText('验证中')).toBeInTheDocument();
  });

  it('should show completion actions when status is in_progress', () => {
    useAppStore.getState().addValidation({
      item: 'Test Item',
      method: 'Method',
      status: 'in_progress',
      priority: 'P0',
    });

    render(<ValidationTracker />);

    expect(screen.getByText('完成')).toBeInTheDocument();
    expect(screen.getByText('失败')).toBeInTheDocument();
  });

  it('should show reset action when status is completed', () => {
    useAppStore.getState().addValidation({
      item: 'Test Item',
      method: 'Method',
      status: 'completed',
      priority: 'P0',
    });

    render(<ValidationTracker />);

    expect(screen.getByText('重置')).toBeInTheDocument();
  });
});
