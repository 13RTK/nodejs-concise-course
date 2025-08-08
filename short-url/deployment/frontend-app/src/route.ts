import { createBrowserRouter } from 'react-router';
import RootLayout from './ui/RootLayout';
import Home from './pages/Home';
import RedirectProcess from './pages/RedirectProcess';

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      {
        path: '/:urlCode',
        Component: RedirectProcess,
      },
    ],
  },
]);

export default router;
