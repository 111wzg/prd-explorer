/**
 * @fileoverview PRD 文档服务
 * @description 提供 PRD 文档的读取和更新功能
 */

import { type Request, type Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

/**
 * PRD 文件路径
 * @description 从环境变量读取，默认使用相对路径
 */
const PRD_PATH = process.env.PRD_FILE_PATH 
  ? path.resolve(process.env.PRD_FILE_PATH)
  : path.join(__dirname, '../../../docs/prd.md');

/**
 * PRD 文档元数据接口
 */
interface PrdMetadata {
  version: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
  content: string;
}

/**
 * 获取 PRD 文档
 * @description 读取 PRD 文件并返回元数据和内容
 * @route GET /api/prd
 * @returns {PrdMetadata} PRD 文档信息
 */
export const getPrd = (_req: Request, res: Response) => {
  try {
    // 检查文件是否存在
    if (!fs.existsSync(PRD_PATH)) {
      return res.status(404).json({
        error: 'PRD file not found',
        path: PRD_PATH,
      });
    }

    // 读取文件内容
    const content = fs.readFileSync(PRD_PATH, 'utf-8');

    // 获取文件统计信息
    const stats = fs.statSync(PRD_PATH);

    // 返回 PRD 元数据和内容
    res.json({
      version: 'v0.1',
      status: 'draft',
      createdAt: stats.birthtime.toISOString().slice(0, 10),
      updatedAt: stats.mtime.toISOString(),
      content,
    });
  } catch (error) {
    console.error('[PRD Service] Error reading PRD:', error);
    res.status(500).json({
      error: 'Failed to read PRD',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * 更新 PRD 文档
 * @description 写入新的 PRD 内容到文件
 * @route PUT /api/prd
 * @body {string} content - PRD 文档内容（Markdown 格式）
 * @returns {Object} 更新结果
 */
export const updatePrd = (req: Request, res: Response) => {
  try {
    // 验证请求体
    const { content } = req.body;
    
    if (!content || typeof content !== 'string') {
      return res.status(400).json({
        error: 'Content is required and must be a string',
      });
    }

    // 确保目录存在
    const dir = path.dirname(PRD_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // 写入文件
    fs.writeFileSync(PRD_PATH, content, 'utf-8');

    console.log('[PRD Service] PRD updated:', PRD_PATH);

    // 返回成功响应
    res.json({
      success: true,
      message: 'PRD updated successfully',
      path: PRD_PATH,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[PRD Service] Error updating PRD:', error);
    res.status(500).json({
      error: 'Failed to update PRD',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * 获取 PRD 文件路径
 * @description 用于调试和日志
 * @returns {string} PRD 文件绝对路径
 */
export const getPrdPath = (): string => PRD_PATH;
