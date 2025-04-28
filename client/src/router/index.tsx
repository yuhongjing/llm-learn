import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home, ChatGPT } from '@/page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/chatgpt',
    element: <ChatGPT />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
