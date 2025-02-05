import { NavBar } from '../components/NavBar';
import ProjectList from '../features/ProjectList';
import { useGiscus } from './useGiscus';

export default function ProjectPage(): JSX.Element {
  useGiscus(); // Call the hook to load Giscus

  return (
    <div>
      <NavBar />
      <ProjectList />
      <div id="giscus" style={{ marginTop: '2rem' }} />
    </div>
  );
}
