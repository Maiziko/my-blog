// src/pages/index.tsx
import React from 'react';
import { Button, Typography } from 'antd';
import Link from 'next/link';
import Layout from '../components/common/Layout';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  return (
    <Layout title="Home | Blog App">
      <div className="flex flex-col items-center text-center py-12">
        <Title level={1} className="text-4xl font-bold mb-6">
          Welcome to the Blog App
        </Title>
        
        <div className="max-w-3xl mb-8">
          <Paragraph className="text-lg text-gray-600">
            Explore our collection of blog posts or create your own to share with the community.
            This platform is built with Next.js, TypeScript, TanStack Query, and Ant Design.
          </Paragraph>
        </div>
        
        <div className="space-x-4">
          <Link href="/posts">
            <Button type="primary" size="large">
              Browse Posts
            </Button>
          </Link>
          <Link href="/posts/create">
            <Button size="large">
              Create a Post
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Title level={3}>Responsive Design</Title>
            <Paragraph>
              Our blog looks great on all devices, from mobile phones to desktop computers.
            </Paragraph>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Title level={3}>Fast Performance</Title>
            <Paragraph>
              Built with Next.js for optimal performance and server-side rendering capabilities.
            </Paragraph>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Title level={3}>Modern UI</Title>
            <Paragraph>
              Beautiful user interface powered by Ant Design and Tailwind CSS.
            </Paragraph>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;