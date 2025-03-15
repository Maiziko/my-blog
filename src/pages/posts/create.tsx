// src/pages/posts/create.tsx
import React from 'react';
import Layout from '../../components/common/Layout';
import PostForm from '../../components/blog/PostForm';
import { Typography } from 'antd';

const { Title } = Typography;

const CreatePostPage: React.FC = () => {
  return (
    <Layout title="Create Post | Blog App">
      <div className="mb-8">
        <Title level={2}>Create New Post</Title>
      </div>
      
      <PostForm />
    </Layout>
  );
};

export default CreatePostPage;