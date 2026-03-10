import React from 'react';
import { Card, Table, Tag, Space, Button, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useAppStore } from '../stores/appStore';
import type { Issue } from '../types';

const { TextArea } = Input;

const categoryMap: Record<Issue['category'], { text: string; color: string }> = {
  product: { text: '产品', color: 'blue' },
  technical: { text: '技术', color: 'green' },
  business: { text: '商业', color: 'orange' }
};

const statusMap: Record<Issue['status'], { text: string; color: string }> = {
  open: { text: '开放', color: 'default' },
  answered: { text: '已解答', color: 'success' },
  deferred: { text: '暂缓', color: 'warning' }
};

export const IssueList: React.FC = () => {
  const { issues, updateIssue } = useAppStore();

  const columns: ColumnsType<Issue> = [
    {
      title: '问题',
      dataIndex: 'question',
      key: 'question',
      ellipsis: true
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (category: Issue['category']) => (
        <Tag color={categoryMap[category].color}>{categoryMap[category].text}</Tag>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: Issue['status']) => (
        <Tag color={statusMap[status].color}>{statusMap[status].text}</Tag>
      )
    },
    {
      title: '答案',
      dataIndex: 'answer',
      key: 'answer',
      ellipsis: true,
      render: (answer) => answer || '-'
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          {record.status === 'open' && (
            <Button 
              size="small" 
              onClick={() => updateIssue(record.id, { status: 'answered', answer: '已解答' })}
            >
              标记为已解答
            </Button>
          )}
        </Space>
      )
    }
  ];

  return (
    <Card title="问题清单" style={{ marginTop: 16 }}>
      <Table columns={columns} dataSource={issues} rowKey="id" pagination={false} />
    </Card>
  );
};
