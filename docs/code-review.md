# Code Review 报告 - PRD Explorer

**审查日期**: 2026-03-10  
**审查范围**: feat/initial-framework 分支  
**审查者**: 小红 (AI Assistant)

---

## 📊 审查摘要

| 类别 | 问题数 | 严重程度 |
|------|--------|----------|
| 🛑 严重错误 | 2 | 必须修复 |
| ⚠️ 代码质量问题 | 5 | 建议修复 |
| 💡 优化建议 | 4 | 可选改进 |
| 📝 文档/注释 | 3 | 需要补充 |

---

## 🛑 严重错误

### 1. 前后端 ID 类型不一致

**问题**: 
- 前端 TypeScript 类型定义 `id: string` (使用 `crypto.randomUUID()`)
- 后端服务使用 `id: number` (自增计数器)

**影响**: 类型不匹配，可能导致运行时错误

**位置**:
- `frontend/src/types/index.ts` - `id: string`
- `backend/src/services/tasksService.ts` - `id: idCounter++` (number)

**修复方案**: 统一使用 string UUID

---

### 2. 后端缺少输入验证

**问题**: 
- `createTask`, `createIssue` 直接使用 `req.body`，没有验证必填字段
- 可能导致数据库污染

**影响**: 不安全，可能创建无效数据

**位置**: 
- `backend/src/services/tasksService.ts` - `createTask`
- `backend/src/services/issuesService.ts` - `createIssue`

**修复方案**: 添加请求体验证

---

## ⚠️ 代码质量问题

### 3. 代码重复 - 状态映射

**问题**: `TaskBoard.tsx` 和 `IssueList.tsx` 有相似的状态映射逻辑

**位置**:
- `frontend/src/components/TaskBoard.tsx` - `statusMap`
- `frontend/src/components/IssueList.tsx` - `categoryMap`, `statusMap`

**修复方案**: 提取为公共工具函数

---

### 4. Store 中 Issue 更新缺少 updatedAt

**问题**: `updateIssue` 没有更新 `updatedAt` 字段，但 `updateTask` 有

**位置**: `frontend/src/stores/appStore.ts`

**修复方案**: 统一添加时间戳

---

### 5. 后端服务代码重复

**问题**: `tasksService.ts` 和 `issuesService.ts` 代码结构几乎相同

**影响**: 维护成本高，修改需同步多处

**修复方案**: 创建通用 CRUD 基类/函数

---

### 6. 硬编码 PRD 路径

**问题**: `prdService.ts` 使用硬编码路径

**位置**: `backend/src/services/prdService.ts` - `PRD_PATH`

**影响**: 部署时可能失败

**修复方案**: 使用环境变量

---

### 7. 未使用的导入

**问题**: 
- `IssueList.tsx` 导入了 `TextArea` 但未使用
- `PrdViewer.tsx` 导入了 `Content`, `Title` 但未使用

**修复方案**: 清理未使用导入

---

## 💡 优化建议

### 8. App 组件中硬编码 PRD 内容

**问题**: PRD 内容硬编码在组件中，应该从 API 获取

**位置**: `frontend/src/App.tsx`

**建议**: 使用 useEffect 从 `/api/prd` 获取

---

### 9. 缺少错误边界

**问题**: React 应用没有错误边界组件

**建议**: 添加 ErrorBoundary 捕获渲染错误

---

### 10. 表格无分页

**问题**: `pagination={false}` 固定禁用，数据多时性能差

**建议**: 动态分页（数据>10 条时启用）

---

### 11. 缺少加载状态

**问题**: 异步操作无 loading 反馈

**建议**: 添加加载状态指示器

---

## 📝 文档/注释

### 12. 组件缺少 JSDoc 注释

**问题**: 公共组件和函数没有文档注释

**建议**: 添加 JSDoc 说明用途、参数、返回值

---

### 13. 缺少单元测试

**问题**: 没有任何测试文件

**建议**: 
- 前端：Vitest + React Testing Library
- 后端：Jest + Supertest

---

### 14. 缺少 API 文档

**问题**: 后端 API 没有文档说明

**建议**: 添加 OpenAPI/Swagger 或 API.md

---

## ✅ 修复清单

- [ ] 统一 ID 类型为 string UUID
- [ ] 添加后端输入验证
- [ ] 提取公共状态映射工具
- [ ] 修复 Store 中 updateTime 不一致
- [ ] 重构后端服务减少重复
- [ ] 使用环境变量配置路径
- [ ] 清理未使用导入
- [ ] 从 API 获取 PRD 内容
- [ ] 添加错误边界
- [ ] 实现动态分页
- [ ] 添加加载状态
- [ ] 补充 JSDoc 注释
- [ ] 编写单元测试
- [ ] 编写 API 文档

---

**下一步**: 按优先级修复上述问题并提交新 PR
