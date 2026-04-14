import '@/lib/extensions/string.extension';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import App from './App.tsx';
import { TooltipProvider } from './components/ui/shadcn/tooltip';
import './index.css';

import { queryClient } from './lib/query.client';

document.documentElement.classList.add('dark');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TooltipProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer newestOnTop theme="dark" pauseOnHover={false} closeOnClick stacked />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </TooltipProvider>
  </StrictMode>
);
