// src/types/index.ts
export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  status: 'active' | 'inactive';
}

export interface Comment {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
}

export interface PaginationParams {
  page: number;
  per_page: number;
}

export interface ApiResponse<T> {
  data: T;
  meta: {
    pagination: {
      total: number;
      pages: number;
      page: number;
      limit: number;
    }
  }
}