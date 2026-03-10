import React from 'react';
import { Layout, Typography, Card } from 'antd';
import ReactMarkdown from 'react-markdown';

const { Content } = Layout;
const { Title } = Typography;

interface PrdViewerProps {
  content: string;
}

export const PrdViewer: React.FC<PrdViewerProps> = ({ content }) => {
  return (
    <Card title="产品需求文档" style={{ marginBottom: 16 }}>
      <div style={{ maxHeight: '600px', overflow: 'auto' }}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </Card>
  );
};
