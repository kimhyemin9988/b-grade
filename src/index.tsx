import RouterApp from './Router';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from 'react-query';
import { RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import App, { GlobalStyle } from './App';
import HomeHeader from './HomeHeader';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient();
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={RouterApp} />
    </QueryClientProvider>
  </StrictMode>
);