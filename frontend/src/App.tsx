/**
 * @fileoverview 主应用组件
 * @description PRD Explorer 应用入口，包含导航、状态初始化和页面路由
 */

import React, { useState, useEffect } from 'react';
import {
  Layout,
  Menu,
  Typography,
  Button,
  Space,
  message,
  type MenuProps,
} from 'antd';
import { PrdViewer } from './components/PrdViewer';
import { TaskBoard } from './components/TaskBoard';
import { IssueList } from './components/IssueList';
import { useAppStore } from './stores/appStore';

const { Header, Content } = Layout;
const { Title } = Typography;

/**
 * 导航菜单项类型
 */
type MenuItem = Required<MenuProps>['items'][number];

/**
 * 导航菜单配置
 */
const menuItems: MenuItem[] = [
  { key: 'overview', label: '总览' },
  { key: 'tasks', label: '任务' },
  { key: 'issues', label: '问题' },
];

/**
 * 示例 PRD 内容（用于开发环境）
 * @description 当 API 不可用时使用的默认 PRD 内容
 */
const DEFAULT_PRD_CONTENT = `# 产品需求文档（PRD）- 早期探索版

**文档状态**: 草稿 / 探索阶段  
**创建日期**: 2026-03-10  
**版本**: v0.1

---

## 1. 产品愿景

### 1.1 核心方向
打造一款面向互联网用户的**效率/协作类产品**，解决用户在特定场景下的痛点。

### 1.2 目标用户
- **主要用户群**: 互联网从业者 / 知识工作者 / 创作者 [待确认]

### 1.3 价值主张
> 帮助用户更高效地完成某类任务，通过某种方式实现某种价值。

---

## 2. 问题定义

### 2.1 我们试图解决的问题
- 用户在某场景下存在某痛点
- 现有解决方案存在某不足
- 市场存在某机会

---

## 3. 关键假设与风险

| 假设 | 验证方式 | 优先级 |
|------|----------|--------|
| 用户有某需求 | 用户访谈 | P0 |
| 技术可实现 | 技术预研 | P0 |
| 商业模式可行 | 市场调研 | P1 |

---

## 4. 下一步行动

| 行动项 | 状态 |
|--------|------|
| 用户访谈计划 | ⬜ 未开始 |
| 竞品分析 | ⬜ 未开始 |
| 技术可行性评估 | ⬜ 未开始 |
`;

/**
 * 主应用组件
 * @description PRD Explorer 应用根组件，管理全局状态和导航
 * @returns React 组件
 */
const App: React.FC = () => {
  // 当前激活的标签页
  const [activeTab, setActiveTab] = useState<string>('overview');
  // PRD 文档内容
  const [prdContent, setPrdContent] = useState<string>(DEFAULT_PRD_CONTENT);
  // 是否已初始化示例数据
  const [initialized, setInitialized] = useState<boolean>(false);

  // 从 Store 获取操作方法
  const { addTask, addIssue } = useAppStore();

  /**
   * 初始化示例数据
   * @description 从 PRD 中提取初始任务和问题，仅执行一次
   */
  useEffect(() => {
    if (initialized) return;

    // 添加初始任务（来自 PRD 的下一步行动）
    const initialTasks = [
      {
        title: '用户访谈计划',
        description: '计划访谈 N 人，验证核心需求',
        status: 'pending' as const,
        dueDate: '2026-03-17',
      },
      {
        title: '竞品分析',
        description: '列出竞品清单并分析',
        status: 'pending' as const,
        dueDate: '2026-03-17',
      },
      {
        title: '技术可行性评估',
        description: '评估技术实现路径',
        status: 'pending' as const,
        dueDate: '2026-03-17',
      },
    ];

    // 添加初始问题（来自 PRD 的待确认问题）
    const initialIssues = [
      {
        category: 'product' as const,
        question: '目标用户群到底是谁？',
        status: 'open' as const,
      },
      {
        category: 'product' as const,
        question: '核心痛点是否足够强烈？',
        status: 'open' as const,
      },
      {
        category: 'business' as const,
        question: '商业模式是什么？',
        status: 'open' as const,
      },
      {
        category: 'technical' as const,
        question: '技术实现路径是什么？',
        status: 'open' as const,
      },
    ];

    // 批量添加
    initialTasks.forEach((task) => addTask(task));
    initialIssues.forEach((issue) => addIssue(issue));

    setInitialized(true);
  }, [addTask, addIssue, initialized]);

  /**
   * 处理标签页切换
   * @param key - 选中的标签页 key
   */
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setActiveTab(e.key);
  };

  /**
   * 添加新任务
   * @description 快速添加一个默认任务
   */
  const handleAddTask = () => {
    addTask({
      title: '新任务',
      description: '请填写任务描述',
      status: 'pending',
    });
    message.success('任务已添加，请编辑详情');
  };

  /**
   * 添加新问题
   * @description 快速添加一个默认问题
   */
  const handleAddIssue = () => {
    addIssue({
      category: 'product',
      question: '新问题，请编辑描述',
      status: 'open',
    });
    message.success('问题已添加，请编辑详情');
  };

  /**
   * 渲染内容区域
   * @description 根据当前标签页渲染对应组件
   */
  const renderContent = () => {
    switch (activeTab) {
      case 'tasks':
        return <TaskBoard />;
      case 'issues':
        return <IssueList />;
      case 'overview':
      default:
        return (
          <>
            <PrdViewer content={prdContent} />
            <TaskBoard />
            <IssueList />
          </>
        );
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 顶部导航栏 */}
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          📋 PRD Explorer
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[activeTab]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>

      {/* 主内容区 */}
      <Content
        style={{
          padding: '24px 48px',
          background: '#f0f2f5',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        {/* 标题和操作区 */}
        <div style={{ marginBottom: 24 }}>
          <Title level={2} style={{ marginBottom: 16 }}>
            产品需求探索平台
          </Title>
          <Space>
            <Button type="primary" onClick={handleAddTask}>
              + 添加任务
            </Button>
            <Button onClick={handleAddIssue}>+ 添加问题</Button>
          </Space>
        </div>

        {/* 动态内容 */}
        {renderContent()}
      </Content>
    </Layout>
  );
};

export default App;
