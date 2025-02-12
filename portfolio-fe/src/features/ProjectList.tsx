import React, { useState, useEffect } from 'react';
import { projectResponseModel } from './model/projectResponseModel';
import { getAllProjects } from './api/getAllProjects';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProjectList.css';
import AddProjectForm from './AddProject';
import UpdateProjectForm from './UpdateProject';

const ProjectList: React.FC = (): JSX.Element => {
  const [projects, setProjects] = useState<projectResponseModel[]>([]);
  const [isZako, setIsZako] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddProjectModal, setShowAddProjectModal] = useState<boolean>(false); // Control modal visibility for Add Project
  const [showUpdateProjectModal, setShowUpdateProjectModal] = useState<boolean>(false); // Control modal visibility for Update Project
  const [selectedProject, setSelectedProject] = useState<projectResponseModel | null>(null); // Store selected project for update

  useEffect(() => {
    const fetchUserRoles = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        setIsZako(false);
        return;
      }

      try {
        const base64Url = accessToken.split('.')[1];
        const decodedPayload = JSON.parse(atob(base64Url));
        const roles = decodedPayload['https://portfolio/roles'] || [];

        setIsZako(roles.includes('Zako'));
      } catch (err) {
        console.error('Error decoding user roles:', err);
        setIsZako(false);
      }
    };

    const fetchProjectData = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await getAllProjects();
        if (Array.isArray(response)) {
          setProjects(response);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRoles();
    fetchProjectData();
  }, []);

  const handleAddProject = () => {
    setShowAddProjectModal(true);
  };

  const handleCloseModal = () => {
    setShowAddProjectModal(false);
    setShowUpdateProjectModal(false); // Close update modal as well
    window.location.reload();
  };

  const handleUpdateProject = (project: projectResponseModel) => {
    setSelectedProject(project);
    setShowUpdateProjectModal(true);
  };

  if (loading) {
    return <div>Loading projects...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Projects</h2>
        {isZako && (
          <button className="btn btn-primary" onClick={handleAddProject}>
            Add
          </button>
        )}
      </div>
      
      <div className="row">
  {projects.length > 0 ? (
    projects.map((project) => (
      <div className="col-md-6 mb-4" key={project.projectId}>
        {isZako && (
          <div className="d-flex justify-content-end mb-2">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => handleUpdateProject(project)} // Open the update modal
            >
              Update
            </button>
          </div>
        )}
        <div className="card project-card">
          <div className="card-img-wrapper">
            <img
              src={project.imageUrl}
              alt={project.projectName}
              className="card-img-top project-image"
            />
          </div>
          <div className="card-body">
            <h5 className="card-title project-name">{project.projectName}</h5>
            <p className="card-text project-description">{project.description}</p>
          </div>
          <div className="card-footer">
            <div className="skill-logos">
              {project.skills.map((skill) => (
                <img
                  key={skill.skillId}
                  src={skill.skillLogo}
                  alt={skill.skillName}
                  className="skill-logo"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="no-items">No projects available</p>
  )}
</div>


      {/* Add Project Modal */}
      {showAddProjectModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Project</h5>
                <button className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <AddProjectForm onClose={handleCloseModal} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Project Modal */}
      {showUpdateProjectModal && selectedProject && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Project</h5>
                <button className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <UpdateProjectForm project={selectedProject} onClose={handleCloseModal} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
