# PRD Explorer - 产品需求管理与探索平台

> 基于 PRD 文档的产品探索协作工具

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📖 项目简介

PRD Explorer 是一个帮助产品团队管理需求探索过程的平台，支持：

- 📄 **PRD 文档管理** - 结构化存储和查看产品需求文档
- ✅ **验证追踪** - 跟踪用户访谈、竞品分析等验证项状态
- 📋 **问题清单** - 记录和追踪待确认问题
- 👥 **团队协作** - 支持多人协作编辑和评论

## 🚀 快速开始

### 前置要求

- Node.js >= 18
- npm >= 9
- Docker (可选，用于容器化部署)

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/111wzg/prd-explorer.git
cd prd-explorer

# 安装前端依赖
cd frontend && npm install

# 安装后端依赖
cd ../backend && npm install

# 启动开发服务器
# 前端 (端口 5173)
cd frontend && npm run dev

# 后端 (端口 3000)
cd backend && npm run dev
```

### Docker 部署

```bash
docker-compose up -d
```

访问 http://localhost:5173

## 📁 项目结构

```
prd-explorer/
├── docs/                    # 产品文档
│   └── prd.md              # 产品需求文档
├── frontend/               # 前端代码
│   ├── src/
│   │   ├── components/     # 可复用组件
│   │   ├── pages/          # 页面组件
│   │   ├── stores/         # 状态管理
│   │   └── types/          # TypeScript 类型
│   └── package.json
├── backend/                # 后端 API
│   ├── src/
│   │   ├── routes/         # API 路由
│   │   ├── models/         # 数据模型
│   │   └── services/       # 业务逻辑
│   └── package.json
└── docker-compose.yml      # Docker 配置
```

## 🛠 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | React + TypeScript + Vite + Ant Design |
| 状态管理 | Zustand |
| 后端 | Node.js + Express + TypeScript |
| 数据库 | SQLite (开发) / PostgreSQL (生产) |
| 部署 | Docker |

## 📋 核心功能

### MVP (Phase 1)

- [x] 项目框架初始化
- [ ] PRD 文档查看器
- [ ] 任务看板
- [ ] 问题清单管理

### 后续迭代 (Phase 2+)

- [ ] 验证状态追踪
- [ ] 评论/批注系统
- [ ] 用户认证
- [ ] 数据持久化

## 📄 文档

- [产品需求文档](./docs/prd.md)
- [技术方案](./docs/tech-spec.md)
- [开发指南](./docs/dev-guide.md)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📝 License

MIT License
