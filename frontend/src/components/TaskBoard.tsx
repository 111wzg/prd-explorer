/**
 * @fileoverview 任务看板组件
 * @description 展示和管理任务列表，支持状态更新
 */

import React from 'react';
import { Card, Table, Tag, Space, Button, type TableProps } from 'antd';
import { useAppStore } from '../stores/appStore';
import type { Task } from '../types';
import {
  TASK_STATUS_CONFIG,
  formatDate,
} from '../utils/ui';

/**
 * 任务看板组件属性
 */
interface TaskBoardProps {
  /** 是否显示操作列，默认 true */
  showActions?: boolean;
  /** 是否启用分页，默认 false（数据>10 条时自动启用） */
  pagination?: boolean | undefined;
}

/**
 * 任务看板组件
 * @description 以表格形式展示任务列表，支持快速完成操作
 * @param props - 组件属性
 * @returns React 组件
 *
 * @example
 * ```tsx
 * <TaskBoard showActions={true} />
 * ```
 */
export const TaskBoard: React.FC<TaskBoardProps> = ({
  showActions = true,
  pagination = false,
}) => {
  const { tasks, updateTask } = useAppStore();

  // 定义表格列配置
  const columns: TableProps<Task>['columns'] = [
    {
      title: '任务',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      responsive: ['md'],
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      responsive: ['lg'],
      render: (desc?: string) => desc || '-',
    },
    {
      title: '负责人',
      dataIndex: 'assignee',
      key: 'assignee',
      render: (assignee?: string) => assignee || '未分配',
    },
    {
      title: '截止日期',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date?: string) => formatDate(date),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: Task['status']) => {
        const config = TASK_STATUS_CONFIG[status];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    ...(showActions
      ? [
          {
            title: '操作',
            key: 'action',
            render: (_: unknown, record: Task) => (
              <Space size="small">
                {record.status !== 'completed' && (
                  <Button
                    size="small"
                    type="link"
                    onClick={() =>
                      updateTask(record.id, { status: 'completed' })
                    }
                  >
                    完成
                  </Button>
                )}
              </Space>
            ),
          } as TableProps<Task>['columns'][number],
        ]
      : []),
  ];

  // 动态分页：数据超过 10 条时启用
  const enablePagination = pagination || tasks.length > 10;

  return (
    <Card title="任务看板" style={{ marginBottom: 16 }}>
      <Table
        columns={columns}
        dataSource={tasks}
        rowKey="id"
        pagination={enablePagination ? { pageSize: 10 } : false}
        scroll={{ x: 800 }}
        locale={{ emptyText: '暂无任务' }}
      />
    </Card>
  );
};

export default TaskBoard;
