// src/pages/posts/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Typography, Button, Skeleton, Divider, Card, Empty } from 'antd';
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Layout from '../../components/common/Layout';
import { usePostQuery } from '../../hooks/usePost';

const { Title, Paragraph } = Typography;

const PostDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const postId = parseInt(id as string);
  
  const { data: post, isLoading, isError } = usePostQuery(postId);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto">
          <Skeleton active avatar paragraph={{ rows: 10 }} />
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
    <Layout title={`${post.title} | Blog App`}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/posts">
            <Button icon={<ArrowLeftOutlined />}>Back to Posts</Button>
          </Link>
        </div>
        
        <Card className="mb-8">
          <Title level={1}>{post.title}</Title>
          
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-500">
              User ID: {post.user_id}
            </div>
            <Link href={`/posts/edit/${post.id}`}>
              <Button type="primary" icon={<EditOutlined />}>
                Edit Post
              </Button>
            </Link>
          </div>
          
          <Divider />
          
          <div className="post-content">
            <Paragraph className="text-lg whitespace-pre-line">
              {post.body}
            </Paragraph>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default PostDetailPage;