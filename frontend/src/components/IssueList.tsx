/**
 * @fileoverview 问题清单组件
 * @description 展示和管理产品探索过程中的问题列表
 */

import React from 'react';
import { Card, Table, Tag, Space, Button, type TableProps } from 'antd';
import { useAppStore } from '../stores/appStore';
import type { Issue } from '../types';
import {
  ISSUE_CATEGORY_CONFIG,
  ISSUE_STATUS_CONFIG,
} from '../utils/ui';

/**
 * 问题清单组件属性
 */
interface IssueListProps {
  /** 是否显示操作列，默认 true */
  showActions?: boolean;
  /** 是否启用分页，默认 false（数据>10 条时自动启用） */
  pagination?: boolean | undefined;
}

/**
 * 问题清单组件
 * @description 以表格形式展示问题列表，支持标记为已解答
 * @param props - 组件属性
 * @returns React 组件
 *
 * @example
 * ```tsx
 * <IssueList showActions={true} />
 * ```
 */
export const IssueList: React.FC<IssueListProps> = ({
  showActions = true,
  pagination = false,
}) => {
  const { issues, updateIssue } = useAppStore();

  // 定义表格列配置
  const columns: TableProps<Issue>['columns'] = [
    {
      title: '问题',
      dataIndex: 'question',
      key: 'question',
      ellipsis: true,
      width: '30%',
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (category: Issue['category']) => {
        const config = ISSUE_CATEGORY_CONFIG[category];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: Issue['status']) => {
        const config = ISSUE_STATUS_CONFIG[status];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '答案',
      dataIndex: 'answer',
      key: 'answer',
      ellipsis: true,
      render: (answer?: string) => answer || '-',
    },
    ...(showActions
      ? [
          {
            title: '操作',
            key: 'action',
            render: (_: unknown, record: Issue) => (
              <Space size="small">
                {record.status === 'open' && (
                  <Button
                    size="small"
                    type="link"
                    onClick={() =>
                      updateIssue(record.id, {
                        status: 'answered',
                        answer: '已解答',
                      })
                    }
                  >
                    标记为已解答
                  </Button>
                )}
              </Space>
            ),
          } as TableProps<Issue>['columns'][number],
        ]
      : []),
  ];

  // 动态分页：数据超过 10 条时启用
  const enablePagination = pagination || issues.length > 10;

  return (
    <Card title="问题清单" style={{ marginBottom: 16 }}>
      <Table
        columns={columns}
        dataSource={issues}
        rowKey="id"
        pagination={enablePagination ? { pageSize: 10 } : false}
        scroll={{ x: 800 }}
        locale={{ emptyText: '暂无问题' }}
      />
    </Card>
  );
};

export default IssueList;
