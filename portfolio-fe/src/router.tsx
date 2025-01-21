import { createBrowserRouter } from 'react-router-dom';
import { PathRoutes } from './path.routes';
import HomePage from './pages/HomePage';
import ZakoPage from './pages/ZakoPage';
const router = createBrowserRouter([
  {
    path: PathRoutes.HomePage,
    element: <HomePage />,
  },
  {
    path: PathRoutes.ZakoPage,
    element: <ZakoPage />,
  },
]);

export default router;
