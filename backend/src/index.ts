/**
 * @fileoverview 后端应用入口
 * @description Express 服务器配置，包含中间件、路由和错误处理
 */

import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import { prdRoutes } from './routes/prd';
import { tasksRoutes } from './routes/tasks';
import { issuesRoutes } from './routes/issues';

// ========== 配置 ==========

/**
 * 服务器端口
 * @description 从环境变量读取，默认 3000
 */
const PORT = process.env.PORT || 3000;

// ========== 应用初始化 ==========

/**
 * 创建 Express 应用实例
 */
const app = express();

// ========== 中间件 ==========

/**
 * 启用 CORS
 * @description 允许跨域请求（开发环境）
 */
app.use(cors());

/**
 * JSON 解析中间件
 * @description 解析 application/json 请求体
 */
app.use(express.json());

// ========== 路由 ==========

/**
 * API 路由注册
 * @description 挂载各模块路由
 */
app.use('/api/prd', prdRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/issues', issuesRoutes);

/**
 * 健康检查接口
 * @description 用于监控服务运行状态
 * @route GET /api/health
 * @returns {Object} 服务状态信息
 */
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ========== 错误处理 ==========

/**
 * 全局错误处理中间件
 * @description 捕获未处理的错误并返回统一格式
 */
app.use(
  (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    console.error('[Error]', err.stack);
    res.status(500).json({
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
);

// ========== 启动服务器 ==========

/**
 * 启动服务器监听
 */
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║     PRD Explorer Backend Server        ║
╠════════════════════════════════════════╣
║  URL: http://localhost:${PORT}          ║
║  Environment: ${process.env.NODE_ENV || 'development'}                   ║
║  Health:  http://localhost:${PORT}/api/health  ║
╚════════════════════════════════════════╝
  `);
});

export default app;
