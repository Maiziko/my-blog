// src/components/blog/PostForm.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Button, Card, message } from 'antd';
import { Post } from '../../types';
import { useCreatePost, useUpdatePost } from '../../hooks/usePost';

interface PostFormProps {
  initialValues?: Post;
  isEditing?: boolean;
}

const PostForm: React.FC<PostFormProps> = ({ initialValues, isEditing = false }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();
  
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues]);
  
  const onFinish = async (values: any) => {
    try {
      if (isEditing && initialValues) {
        await updatePost.mutateAsync({
          id: initialValues.id,
          post: values
        });
        message.success('Post updated successfully');
      } else {
        await createPost.mutateAsync({
          ...values,
          user_id: 7765936 // In a real application, this would be the logged-in user's ID
        });
        message.success('Post created successfully');
      }
      router.push('/posts');
    } catch (error: any) {
      message.error(`Failed to ${isEditing ? 'update' : 'create'} post: ${error.message}`);
    }
  };
  
  return (
    <Card title={isEditing ? 'Edit Post' : 'Create New Post'} className="max-w-3xl mx-auto">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input placeholder="Enter post title" />
        </Form.Item>
        
        <Form.Item
          name="body"
          label="Content"
          rules={[{ required: true, message: 'Please enter post content' }]}
        >
          <Input.TextArea
            placeholder="Write your post content here..."
            rows={8}
          />
        </Form.Item>
        
        <Form.Item>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isEditing ? updatePost.isPending : createPost.isPending}
            >
              {isEditing ? 'Update' : 'Create'} Post
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PostForm;