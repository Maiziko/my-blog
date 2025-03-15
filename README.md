# Next.js Blog Application

A modern blog application built with Next.js, TypeScript, Tailwind CSS, and Ant Design. This project demonstrates best practices for frontend development including state management, API integration, and responsive design.

## Features

- Create, read, update, and delete blog posts
- Server-side rendering for improved SEO
- Optimized performance with TanStack Query for state management
- Responsive design that works on all devices
- Clean and modern UI using Ant Design and Tailwind CSS
- TypeScript for type safety

## Technologies Used

- Next.js 13 (Page Router)
- TypeScript
- Axios for API requests
- TanStack Query (v5) for state management
- Tailwind CSS (v3) for styling
- Ant Design (v5) for UI components
- MSW (Mock Service Worker) for API mocking

## Prerequisites

- Node.js v16.20.2 or higher
- npm v8.19.4 or higher

## Getting Started

1. Clone the repository

   ```bash
   git clone https://github.com/Maiziko/my-blog.git
   cd my-blog
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your GoRest API token

   ```
   NEXT_PUBLIC_GOREST_TOKEN=your_gorest_api_token_here
   NEXT_PUBLIC_API_MOCKING=false
   ```

4. Start the development server

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Integration

This project uses the [GoRest](https://gorest.co.in/) public API for blog data. You need to register for a free account to get an API token.

If you encounter issues with the GoRest API, you can enable the Mock Service Worker (MSW) by setting `NEXT_PUBLIC_API_MOCKING=true` in your `.env.local` file.

## Deployment

This application deploy on vercel, you can be deployed to various platforms like Netlify or any other hosting service that supports Next.js.

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## Project Structure

```
/src
  /components        # Reusable UI components
    /blog            # Blog-specific components
    /common          # Common UI components
  /hooks             # Custom React hooks
  /mocks             # MSW mocking setup
  /pages             # Next.js pages
  /services          # API service functions
  /types             # TypeScript type definitions
  /utils             # Utility functions
/public              # Static assets
```
