import React from 'react';
import { Card, Table, Tag, Space, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useAppStore } from '../stores/appStore';
import type { Task } from '../types';

const statusMap: Record<Task['status'], { text: string; color: string }> = {
  pending: { text: '待处理', color: 'default' },
  in_progress: { text: '进行中', color: 'processing' },
  completed: { text: '已完成', color: 'success' }
};

export const TaskBoard: React.FC = () => {
  const { tasks, updateTask } = useAppStore();

  const columns: ColumnsType<Task> = [
    {
      title: '任务',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true
    },
    {
      title: '负责人',
      dataIndex: 'assignee',
      key: 'assignee',
      render: (assignee) => assignee || '未分配'
    },
    {
      title: '截止日期',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date) => date || '-'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: Task['status']) => (
        <Tag color={statusMap[status].color}>{statusMap[status].text}</Tag>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          {record.status !== 'completed' && (
            <Button 
              size="small" 
              onClick={() => updateTask(record.id, { status: 'completed' })}
            >
              完成
            </Button>
          )}
        </Space>
      )
    }
  ];

  return (
    <Card title="任务看板">
      <Table columns={columns} dataSource={tasks} rowKey="id" pagination={false} />
    </Card>
  );
};
