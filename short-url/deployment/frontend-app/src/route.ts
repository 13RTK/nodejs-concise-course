import { createBrowserRouter } from 'react-router';

import RootLayout from './ui/RootLayout';

import Home from './pages/Home';
import Redirect from './pages/Redirect';

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      {
        path: '/:urlCode',
        Component: Redirect,
      },
    ],
  },
]);

export default router;
