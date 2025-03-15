// src/hooks/usePost.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPosts, getPostById, createPost, updatePost, deletePost } from '../services/posts';
import { Post, PaginationParams } from '../types';

export const usePostsQuery = (params: PaginationParams) => {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => getPosts(params),
    placeholderData: (previousData) => previousData,
  });
};

export const usePostQuery = (id: number) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newPost: Omit<Post, 'id'>) => createPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, post }: { id: number; post: Partial<Post> }) => 
      updatePost(id, post),
    onSuccess: (updatedPost) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', updatedPost.id] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', variables] });
    },
  });
};