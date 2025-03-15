// src/components/blog/PostCard.tsx
import React from 'react';
import Link from 'next/link';
import { Card, Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Post } from '../../types';
import { useDeletePost } from '../../hooks/usePost';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const deletePostMutation = useDeletePost();
  
  const handleDelete = async () => {
    try {
      await deletePostMutation.mutateAsync(post.id);
      message.success('Post deleted successfully');
    } catch (error) {
      message.error('Failed to delete post');
    }
  };

  return (
    <Card
      className="mb-4 hover:shadow-lg transition-shadow"
      title={post.title}
      actions={[
        <Link href={`/posts/${post.id}`} key="view">
          <Button type="text" icon={<EyeOutlined />}>
            View
          </Button>
        </Link>,
        <Link href={`/posts/edit/${post.id}`} key="edit">
          <Button type="text" icon={<EditOutlined />}>
            Edit
          </Button>
        </Link>,
        <Popconfirm
          key="delete"
          title="Are you sure you want to delete this post?"
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />}
            loading={deletePostMutation.isPending}
          >
            Delete
          </Button>
        </Popconfirm>
      ]}
    >
      <div className="h-32 overflow-hidden">
        <p className="text-gray-600">
          {post.body.length > 150 ? post.body.substring(0, 150) + '...' : post.body}
        </p>
      </div>
      <div className="mt-4 text-sm text-gray-500">
        <p>User ID: {post.user_id}</p>
      </div>
    </Card>
  );
};

export default PostCard;