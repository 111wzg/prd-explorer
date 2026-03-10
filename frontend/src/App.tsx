import React, { useState } from 'react';
import { Layout, Menu, Typography, Button, Space, message } from 'antd';
import { PrdViewer } from './components/PrdViewer';
import { TaskBoard } from './components/TaskBoard';
import { IssueList } from './components/IssueList';
import { useAppStore } from './stores/appStore';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { addTask, addIssue } = useAppStore();

  // 初始化示例数据
  React.useEffect(() => {
    // 从 PRD 添加初始任务
    addTask({
      title: '用户访谈计划',
      description: '计划访谈 N 人，验证核心需求',
      status: 'pending',
      dueDate: '2026-03-17'
    });
    addTask({
      title: '竞品分析',
      description: '列出竞品清单并分析',
      status: 'pending',
      dueDate: '2026-03-17'
    });
    addTask({
      title: '技术可行性评估',
      description: '评估技术实现路径',
      status: 'pending',
      dueDate: '2026-03-17'
    });

    // 从 PRD 添加初始问题
    addIssue({
      category: 'product',
      question: '目标用户群到底是谁？',
      status: 'open'
    });
    addIssue({
      category: 'product',
      question: '核心痛点是否足够强烈？',
      status: 'open'
    });
    addIssue({
      category: 'business',
      question: '商业模式是什么？',
      status: 'open'
    });
    addIssue({
      category: 'technical',
      question: '技术实现路径是什么？',
      status: 'open'
    });
  }, []);

  const prdContent = `# 产品需求文档（PRD）- 早期探索版

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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
          PRD Explorer
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[activeTab]}
          items={[
            { key: 'overview', label: '总览' },
            { key: 'tasks', label: '任务' },
            { key: 'issues', label: '问题' }
          ]}
          onClick={(e) => setActiveTab(e.key)}
        />
      </Header>
      <Content style={{ padding: '24px 48px', background: '#f0f2f5' }}>
        <div style={{ marginBottom: 24 }}>
          <Title level={2}>产品需求探索平台</Title>
          <Space>
            <Button 
              type="primary" 
              onClick={() => {
                addTask({
                  title: '新任务',
                  status: 'pending'
                });
                message.success('任务已添加');
              }}
            >
              + 添加任务
            </Button>
            <Button 
              onClick={() => {
                addIssue({
                  category: 'product',
                  question: '新问题...',
                  status: 'open'
                });
                message.success('问题已添加');
              }}
            >
              + 添加问题
            </Button>
          </Space>
        </div>

        {activeTab === 'overview' && (
          <>
            <PrdViewer content={prdContent} />
            <TaskBoard />
            <IssueList />
          </>
        )}
        {activeTab === 'tasks' && <TaskBoard />}
        {activeTab === 'issues' && <IssueList />}
      </Content>
    </Layout>
  );
};

export default App;
