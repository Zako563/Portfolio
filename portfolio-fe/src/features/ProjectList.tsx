/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectResponseModel } from './model/projectResponseModel';
import { getAllProjects } from './api/getAllProjects';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProjectList.css';

const ProjectList: React.FC = (): JSX.Element => {
  const [projects, setProjects] = useState<projectResponseModel[]>([]);
  const [isZako, setIsZako] = useState<boolean>(false); // State to check if the user has the "Zako" role
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRoles = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        console.error('No access token found');
        setIsZako(false);
        return;
      }

      try {
        const base64Url = accessToken.split('.')[1];
        const decodedPayload = JSON.parse(atob(base64Url));
        const roles = decodedPayload['https://portfolio/roles'] || []; // Replace with your namespace

        setIsZako(roles.includes('Zako')); // Check if the user has the "Zako" role
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
        } else {
          console.error('Fetched data is not an array:', response);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRoles(); // Fetch and check user roles
    fetchProjectData(); // Fetch project data
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
        {/* Show the "Add" button only if the user has the "Zako" role */}
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
              {/* Show the "Update" button only if the user has the "Zako" role */}
              {isZako && (
                <div className="d-flex justify-content-end mb-2">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleUpdateProject(project.projectId)}
                  >
                    Update
                  </button>
                </div>
              )}
              <div className="card project-card">
                <div className="card-img-wrapper">
                  <a 
                    href={
                      project.projectName === "NoodleStar" 
                        ? "https://github.com/Sunveerg/Noodle-Star" 
                        : project.projectName === "Football Heritage" 
                        ? "https://github.com/Zako563/FootballDomain" 
                        : project.projectName === "Artwork Project"
                        ? "https://github.com/Zako563/ArtworkProject"
                        :  project.projectName === "Portfolio Website"
                        ? "https://github.com/Zako563/Portfolio"
                        : "#"
                    } 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.projectName}
                      className="card-img-top project-image"
                    />
                  </a>
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