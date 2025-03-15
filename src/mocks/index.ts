// src/mocks/index.ts
const IS_BROWSER = typeof window !== 'undefined';
const USE_MSW = process.env.NEXT_PUBLIC_API_MOCKING === 'true';

export async function initMocks() {
  if (USE_MSW) {
    if (IS_BROWSER) {
      const { worker } = await import('./browser');
      worker.start({ onUnhandledRequest: 'bypass' });
      console.log('MSW started in browser');
    } else {
      const { server } = await import('./server');
      server.listen({ onUnhandledRequest: 'bypass' });
      console.log('MSW started on server');
    }
  }
}