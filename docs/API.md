# API 文档

**版本**: v0.1  
**更新日期**: 2026-03-10  
**基础 URL**: `http://localhost:3000/api`

---

## 📋 目录

- [健康检查](#健康检查)
- [PRD 文档](#prd-文档)
- [任务管理](#任务管理)
- [问题管理](#问题管理)

---

## 健康检查

### `GET /api/health`

检查服务运行状态。

**响应示例**:
```json
{
  "status": "ok",
  "timestamp": "2026-03-10T14:30:00.000Z",
  "uptime": 12345.67
}
```

---

## PRD 文档

### `GET /api/prd`

获取 PRD 文档内容和元数据。

**响应示例**:
```json
{
  "version": "v0.1",
  "status": "draft",
  "createdAt": "2026-03-10",
  "updatedAt": "2026-03-10T14:30:00.000Z",
  "content": "# 产品需求文档...\n\n..."
}
```

**错误响应**:
```json
{
  "error": "PRD file not found",
  "path": "/path/to/prd.md"
}
```

---

### `PUT /api/prd`

更新 PRD 文档内容。

**请求体**:
```json
{
  "content": "# 更新后的 PRD 内容..."
}
```

**成功响应**:
```json
{
  "success": true,
  "message": "PRD updated successfully",
  "path": "/path/to/prd.md",
  "timestamp": "2026-03-10T14:30:00.000Z"
}
```

**错误响应**:
```json
{
  "error": "Content is required and must be a string"
}
```

---

## 任务管理

### `GET /api/tasks`

获取所有任务列表。

**响应示例**:
```json
[
  {
    "id": 1,
    "title": "用户访谈计划",
    "description": "计划访谈 N 人，验证核心需求",
    "status": "pending",
    "assignee": null,
    "dueDate": "2026-03-17",
    "createdAt": "2026-03-10T14:30:00.000Z",
    "updatedAt": null
  }
]
```

---

### `GET /api/tasks/:id`

根据 ID 获取单个任务。

**路径参数**:
- `id` (number) - 任务 ID

**成功响应**: 任务对象（见上方）

**错误响应**:
```json
{
  "error": "Task not found"
}
```

---

### `POST /api/tasks`

创建新任务。

**请求体**:
```json
{
  "title": "新任务标题",
  "description": "任务描述（可选）",
  "status": "pending",
  "assignee": "负责人（可选）",
  "dueDate": "2026-03-17"
}
```

**必填字段**:
- `title` (string) - 任务标题（1-200 字符）

**可选字段**:
- `description` (string) - 任务描述
- `status` (string) - 任务状态，可选值：`pending`, `in_progress`, `completed`，默认 `pending`
- `assignee` (string) - 负责人
- `dueDate` (string) - 截止日期（ISO 日期）

**成功响应** (201):
```json
{
  "id": 4,
  "title": "新任务标题",
  "description": "任务描述",
  "status": "pending",
  "assignee": null,
  "dueDate": "2026-03-17",
  "createdAt": "2026-03-10T14:30:00.000Z"
}
```

**错误响应** (400):
```json
{
  "error": "Title is required and must be a string"
}
```

---

### `PUT /api/tasks/:id`

更新任务。

**路径参数**:
- `id` (number) - 任务 ID

**请求体** (所有字段可选):
```json
{
  "title": "更新后的标题",
  "status": "completed"
}
```

**成功响应**: 更新后的任务对象

**错误响应**:
```json
{
  "error": "Task not found"
}
```

---

### `DELETE /api/tasks/:id`

删除任务。

**路径参数**:
- `id` (number) - 任务 ID

**成功响应**:
```json
{
  "success": true
}
```

**错误响应**:
```json
{
  "error": "Task not found"
}
```

---

## 问题管理

### `GET /api/issues`

获取所有问题列表。

**响应示例**:
```json
[
  {
    "id": 1,
    "category": "product",
    "question": "目标用户群到底是谁？",
    "status": "open",
    "answer": null,
    "createdAt": "2026-03-10T14:30:00.000Z"
  }
]
```

---

### `GET /api/issues/:id`

根据 ID 获取单个问题。

**路径参数**:
- `id` (number) - 问题 ID

---

### `POST /api/issues`

创建新问题。

**请求体**:
```json
{
  "question": "新问题描述",
  "category": "product",
  "status": "open"
}
```

**必填字段**:
- `question` (string) - 问题描述（1-500 字符）

**可选字段**:
- `category` (string) - 问题分类，可选值：`product`, `technical`, `business`，默认 `product`
- `status` (string) - 问题状态，可选值：`open`, `answered`, `deferred`，默认 `open`
- `answer` (string) - 答案

---

### `PUT /api/issues/:id`

更新问题。

**请求体** (所有字段可选):
```json
{
  "status": "answered",
  "answer": "这是答案"
}
```

---

### `DELETE /api/issues/:id`

删除问题。

---

## 状态码说明

| 状态码 | 说明 |
|--------|------|
| 200 | 成功 |
| 201 | 创建成功 |
| 400 | 请求参数错误 |
| 404 | 资源未找到 |
| 500 | 服务器内部错误 |

---

## 使用示例

### cURL

```bash
# 获取所有任务
curl http://localhost:3000/api/tasks

# 创建任务
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"新任务","status":"pending"}'

# 更新任务
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"status":"completed"}'

# 删除任务
curl -X DELETE http://localhost:3000/api/tasks/1
```

### JavaScript (Fetch)

```javascript
// 获取任务
const tasks = await fetch('/api/tasks').then(r => r.json());

// 创建任务
const newTask = await fetch('/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: '新任务' })
}).then(r => r.json());

// 更新任务
await fetch('/api/tasks/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ status: 'completed' })
});
```

---

## 开发调试

### 启动开发服务器

```bash
cd backend
npm run dev
```

### 测试 API

```bash
# 健康检查
curl http://localhost:3000/api/health

# 运行测试
npm test
```
