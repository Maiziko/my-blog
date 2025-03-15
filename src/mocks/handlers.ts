// src/mocks/handlers.ts
import { rest } from 'msw';

const baseUrl = 'https://gorest.co.in/public/v2';

// Sample data
const posts = [
  {
    id: 1,
    user_id: 100,
    title: 'Sample Post 1',
    body: 'This is the content of sample post 1.',
  },
  {
    id: 2,
    user_id: 101,
    title: 'Sample Post 2',
    body: 'This is the content of sample post 2.',
  },
  {
    id: 3,
    user_id: 102,
    title: 'Sample Post 3',
    body: 'This is the content of sample post 3.',
  },
];

let nextId = 4;

export const handlers = [
  // Get all posts with pagination
  rest.get(`${baseUrl}/posts`, (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get('page') || '1');
    const per_page = parseInt(req.url.searchParams.get('per_page') || '10');
    
    const startIndex = (page - 1) * per_page;
    const endIndex = startIndex + per_page;
    const paginatedPosts = posts.slice(startIndex, endIndex);
    
    return res(
      ctx.status(200),
      ctx.set('x-pagination-total', posts.length.toString()),
      ctx.set('x-pagination-pages', Math.ceil(posts.length / per_page).toString()),
      ctx.json(paginatedPosts)
    );
  }),
  
  // Get single post
  rest.get(`${baseUrl}/posts/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === parseInt(id as string));
    
    if (!post) {
      return res(
        ctx.status(404),
        ctx.json({ message: 'Post not found' })
      );
    }
    
    return res(
      ctx.status(200),
      ctx.json(post)
    );
  }),
  
  // Create post
  rest.post(`${baseUrl}/posts`, async (req, res, ctx) => {
    const { title, body, user_id } = await req.json();
    
    const newPost = {
      id: nextId++,
      title,
      body,
      user_id,
    };
    
    posts.push(newPost);
    
    return res(
      ctx.status(201),
      ctx.json(newPost)
    );
  }),
  
  // Update post
  rest.put(`${baseUrl}/posts/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const postIndex = posts.findIndex(p => p.id === parseInt(id as string));
    
    if (postIndex === -1) {
      return res(
        ctx.status(404),
        ctx.json({ message: 'Post not found' })
      );
    }
    
    const updatedData = await req.json();
    posts[postIndex] = { ...posts[postIndex], ...updatedData };
    
    return res(
      ctx.status(200),
      ctx.json(posts[postIndex])
    );
  }),
  
  // Delete post
  rest.delete(`${baseUrl}/posts/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const postIndex = posts.findIndex(p => p.id === parseInt(id as string));
    
    if (postIndex === -1) {
      return res(
        ctx.status(404),
        ctx.json({ message: 'Post not found' })
      );
    }
    
    posts.splice(postIndex, 1);
    
    return res(
      ctx.status(200),
      ctx.json({ success: true })
    );
  }),
];