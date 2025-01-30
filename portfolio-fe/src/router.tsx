import { createBrowserRouter } from 'react-router-dom';
import { PathRoutes } from './path.routes';
import HomePage from './pages/HomePage';
import ZakoPage from './pages/ZakoPage';
import ProjectPage from './pages/ProjectPage';
import AddProjectPage from './pages/AddProjectPage';
import UpdateProjectPage from './pages/UpdateProjectPage';
const router = createBrowserRouter([
  {
    path: PathRoutes.HomePage,
    element: <HomePage />,
  },
  {
    path: PathRoutes.ZakoPage,
    element: <ZakoPage />,
  },

  {
    path: PathRoutes.ProjectPage,
    element: <ProjectPage />,
  },
  
  {
    path: PathRoutes.AddProjectPage,
    element: <AddProjectPage />,
  },
  {
    path: PathRoutes.UpdateProjectPage,
    element: <UpdateProjectPage />,
  },


]);

export default router;
