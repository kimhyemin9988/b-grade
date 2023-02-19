import RouterApp from './Router';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from 'react-query';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { StrictMode } from 'react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient();
root.render(
  <StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={RouterApp} />
      </QueryClientProvider>
    </RecoilRoot>
  </StrictMode>
);
