// src/pages/posts/index.tsx
import React from 'react';
import { Typography, Button } from 'antd';
import Link from 'next/link';
import Layout from '../../components/common/Layout';
import PostList from '../../components/blog/PostList';

const { Title } = Typography;

const PostsPage: React.FC = () => {
  return (
    <Layout title="All Posts | Blog App">
      <div className="mb-8 flex justify-between items-center">
        <Title level={2}>All Posts</Title>
        <Link href="/posts/create">
          <Button type="primary">Create New Post</Button>
        </Link>
      </div>
      
      <PostList />
    </Layout>
  );
};

export default PostsPage;