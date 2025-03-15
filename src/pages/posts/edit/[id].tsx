// src/pages/posts/edit/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import { Typography, Skeleton, Empty, Button } from 'antd';
import Layout from '../../../components/common/Layout';
import PostForm from '../../../components/blog/PostForm';
import { usePostQuery } from '../../../hooks/usePost';

const { Title } = Typography;

const EditPostPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const postId = parseInt(id as string);
  
  const { data: post, isLoading, isError } = usePostQuery(postId);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto">
          <Skeleton active paragraph={{ rows: 6 }} />
        </div>
      </Layout>
    );
  }
  
  if (isError || !post) {
    return (
      <Layout>
        <Empty
          description="Post not found or there was an error loading the post"
          className="py-12"
        >
          <Button onClick={() => router.push('/posts')}>
            Back to Posts
          </Button>
        </Empty>
      </Layout>
    );
  }
  
  return (
    <Layout title={`Edit: ${post.title} | Blog App`}>
      <div className="mb-8">
        <Title level={2}>Edit Post</Title>
      </div>
      
      <PostForm initialValues={post} isEditing />
    </Layout>
  );
};

export default EditPostPage;