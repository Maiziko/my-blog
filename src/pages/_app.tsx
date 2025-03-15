// src/pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
      },
    },
  }));

  useEffect(() => {
    // Initialize MSW if enabled
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
      import('../mocks').then(({ initMocks }) => {
        initMocks();
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#3b82f6',
          },
        }}
      >
        <Component {...pageProps} />
      </ConfigProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}