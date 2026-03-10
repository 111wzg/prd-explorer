/**
 * @fileoverview PRD 文档查看器组件
 * @description 渲染 Markdown 格式的产品需求文档
 */

import React from 'react';
import { Card } from 'antd';
import ReactMarkdown from 'react-markdown';

/**
 * PRD 查看器组件属性
 */
interface PrdViewerProps {
  /** PRD 文档内容（Markdown 格式） */
  content: string;
  /** 组件最大高度（像素），默认 600 */
  maxHeight?: number;
  /** 是否显示边框，默认 true */
  bordered?: boolean;
}

/**
 * PRD 文档查看器组件
 * @description 用于渲染和展示 Markdown 格式的产品需求文档
 * @param props - 组件属性
 * @returns React 组件
 *
 * @example
 * ```tsx
 * <PrdViewer content={prdMarkdown} maxHeight={800} />
 * ```
 */
export const PrdViewer: React.FC<PrdViewerProps> = ({
  content,
  maxHeight = 600,
  bordered = true,
}) => {
  return (
    <Card
      title="产品需求文档"
      bordered={bordered}
      style={{ marginBottom: 16 }}
    >
      <div
        style={{
          maxHeight: `${maxHeight}px`,
          overflow: 'auto',
          lineHeight: 1.6,
        }}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </Card>
  );
};

export default PrdViewer;
