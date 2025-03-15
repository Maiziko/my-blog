// src/services/posts.ts
import api from './api';
import { Post, PaginationParams, ApiResponse } from '../types';

export const getPosts = async ({ page = 1, per_page = 10 }: PaginationParams) => {
  const response = await api.get<Post[]>('/posts', {
    params: { page, per_page }
  });
  
  // Extract pagination info from headers
  const totalCount = parseInt(response.headers['x-pagination-total'] || '0');
  const pages = parseInt(response.headers['x-pagination-pages'] || '0');
  
  return {
    data: response.data,
    meta: {
      pagination: {
        total: totalCount,
        pages,
        page,
        limit: per_page
      }
    }
  };
};

export const getPostById = async (id: number) => {
  const response = await api.get<Post>(`/posts/${id}`);
  return response.data;
};

export const getPostComments = async (postId: number) => {
  const response = await api.get(`/posts/${postId}/comments`);
  return response.data;
};

export const createPost = async (post: Omit<Post, 'id'>) => {
  const response = await api.post<Post>('/posts', post);
  return response.data;
};

export const updatePost = async (id: number, post: Partial<Post>) => {
  const response = await api.put<Post>(`/posts/${id}`, post);
  return response.data;
};

export const deletePost = async (id: number) => {
  await api.delete(`/posts/${id}`);
  return { success: true };
};