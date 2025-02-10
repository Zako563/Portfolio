import SendEmailForm from '../features/SendEmailFrom';
import { NavBar } from '../components/NavBar';
import { useGiscus } from './useGiscus';

export default function ProjectPage(): JSX.Element {
  useGiscus(); // Call the hook to load Giscus

  return (
    <div>
      <NavBar />
      <SendEmailForm/>
    </div>
  );
}
