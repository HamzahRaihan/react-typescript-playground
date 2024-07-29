import { createBrowserRouter } from 'react-router-dom';
import NotFound from './404';
import RootLayout from '../layout';
import TodoHome from './app/todo';

export const createRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <TodoHome />,
        },
      ],
    },
    { path: '*', element: <NotFound /> },
  ]);
