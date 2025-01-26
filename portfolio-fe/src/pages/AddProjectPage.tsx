import AddProjectForm from '../features/AddProject';
import { NavBar } from '../components/NavBar';

export default function AddProjectPage(): JSX.Element {
  return (
    <div>
      <NavBar />
      <AddProjectForm />
    </div>
  );
}
