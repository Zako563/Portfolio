import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectResponseModel } from './model/projectResponseModel';
import { getAllProjects } from './api/getAllProjects';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProjectList.css';

const ProjectList: React.FC = (): JSX.Element => {
  const [projects, setProjects] = useState<projectResponseModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectData = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await getAllProjects();
        if (Array.isArray(response)) {
          setProjects(response);
        } else {
          console.error('Fetched data is not an array:', response);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, []);

  const handleAddProject = (): void => {
    navigate('/addProject');
  };

  const handleUpdateProject = (projectId: number): void => {
    navigate(`/updateProject/${projectId}`);
  };

  if (loading) {
    return <div>Loading projects...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Projects</h2>
        <button className="btn btn-primary" onClick={handleAddProject}>
          Add
        </button>
      </div>
      <div className="row">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div className="col-md-6 mb-4" key={project.projectId}>
              {/* Update Button Outside the Card */}
              <div className="d-flex justify-content-end mb-2">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleUpdateProject(project.projectId)}
                >
                  Update
                </button>
              </div>
              {/* Card Content */}
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
    </div>
  );
};

export default ProjectList;
