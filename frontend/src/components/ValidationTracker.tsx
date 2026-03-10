/**
 * @fileoverview 验证项追踪组件
 * @description 展示和管理验证项列表，支持状态更新
 */

import React from 'react';
import { Card, Table, Tag, Space, Button, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useAppStore } from '../stores/appStore';
import type { Validation } from '../types';
import {
  VALIDATION_STATUS_CONFIG,
  PRIORITY_CONFIG,
} from '../utils/ui';

const { Option } = Select;

/**
 * 验证项追踪组件属性
 */
interface ValidationTrackerProps {
  /** 是否显示操作列，默认 true */
  showActions?: boolean;
  /** 是否启用分页，默认 false（数据>10 条时自动启用） */
  pagination?: boolean;
}

/**
 * 验证项追踪组件
 * @description 以表格形式展示验证项列表，支持状态和结果更新
 */
export const ValidationTracker: React.FC<ValidationTrackerProps> = ({
  showActions = true,
  pagination = false,
}) => {
  const { validations, updateValidation } = useAppStore();

  /**
   * 处理状态变更
   */
  const handleStatusChange = (id: string, status: Validation['status']) => {
    updateValidation(id, { status });
  };

  /**
   * 处理结果变更
   */
  const handleResultChange = (id: string, result: string) => {
    updateValidation(id, { result });
  };

  // 定义表格列配置
  const columns: ColumnsType<Validation> = [
    {
      title: '验证项',
      dataIndex: 'item',
      key: 'item',
      ellipsis: true,
      width: '25%',
    },
    {
      title: '验证方法',
      dataIndex: 'method',
      key: 'method',
      ellipsis: true,
      width: '15%',
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: Validation['priority']) => {
        const config = PRIORITY_CONFIG[priority];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: Validation['status']) => {
        const config = VALIDATION_STATUS_CONFIG[status];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '验证结果',
      dataIndex: 'result',
      key: 'result',
      ellipsis: true,
      render: (result?: string, record: Validation) => {
        if (showActions && record.status !== 'pending') {
          return (
            <Select
              size="small"
              value={result || ''}
              onChange={(value) => handleResultChange(record.id, value)}
              style={{ width: '100%' }}
              allowClear
            >
              <Option value="验证通过">✅ 验证通过</Option>
              <Option value="验证失败">❌ 验证失败</Option>
              <Option value="部分通过">⚠️ 部分通过</Option>
              <Option value="需要更多数据">📊 需要更多数据</Option>
            </Select>
          );
        }
        return result || '-';
      },
    },
  ];

  // 添加操作列
  if (showActions) {
    columns.push({
      title: '操作',
      key: 'action',
      render: (_: unknown, record: Validation) => (
        <Space direction="vertical" size="small">
          {record.status === 'pending' && (
            <Button
              size="small"
              type="link"
              onClick={() => handleStatusChange(record.id, 'in_progress')}
            >
              开始验证
            </Button>
          )}
          {record.status === 'in_progress' && (
            <>
              <Button
                size="small"
                type="link"
                onClick={() => handleStatusChange(record.id, 'completed')}
              >
                完成
              </Button>
              <Button
                size="small"
                type="link"
                danger
                onClick={() => handleStatusChange(record.id, 'failed')}
              >
                失败
              </Button>
            </>
          )}
          {record.status === 'completed' && (
            <Button
              size="small"
              type="link"
              onClick={() => handleStatusChange(record.id, 'pending')}
            >
              重置
            </Button>
          )}
        </Space>
      ),
    });
  }

  // 动态分页：数据超过 10 条时启用
  const enablePagination = pagination || validations.length > 10;

  return (
    <Card title="验证项追踪" style={{ marginBottom: 16 }}>
      <Table
        columns={columns}
        dataSource={validations}
        rowKey="id"
        pagination={enablePagination ? { pageSize: 10 } : false}
        scroll={{ x: 1000 }}
        locale={{ emptyText: '暂无验证项' }}
      />
    </Card>
  );
};

export default ValidationTracker;
