import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSkills } from './api/getAllSkills';
import { projectRequestModel } from './model/projectRequestModel';
import { projectResponseModel, skillResponseModel } from './model/projectResponseModel';
import { updateProject } from './api/updateProject';
import './UpdateProject.css';

interface UpdateProjectFormProps {
  project: projectResponseModel | null; // Allow null if project is not available initially
  onClose: () => void;
}

const UpdateProjectForm: React.FC<UpdateProjectFormProps> = ({ project, onClose }): JSX.Element => {
  const navigate = useNavigate();

  // Ensure that project is available before using it
  const [projectName, setProjectName] = useState<string>(project?.projectName || '');
  const [description, setDescription] = useState<string>(project?.description || '');
  const [imageUrl, setImageUrl] = useState<string>(project?.imageUrl || '');
  const [skills, setSkills] = useState<skillResponseModel[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<skillResponseModel[]>(project?.skills || []);

  useEffect(() => {
    const fetchSkills = async (): Promise<void> => {
      try {
        const fetchedSkills = await getAllSkills();
        setSkills(fetchedSkills);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  const handleSkillToggle = (skill: skillResponseModel): void => {
    if (selectedSkills.find((s) => s.skillId === skill.skillId)) {
      setSelectedSkills(selectedSkills.filter((s) => s.skillId !== skill.skillId));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
  
    if (!project) return; // Check if project exists before submitting
  
    const updatedProject: projectRequestModel = {
      projectName,
      description,
      imageUrl,
      skills: selectedSkills,
    };
  
    try {
      // Convert projectId to a string
      await updateProject(String(project.projectId), updatedProject);
      alert('Project updated successfully!');
      navigate('/zako');
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project.');
    }
  };
  

  if (!project) {
    return <div>Loading...</div>; // Show a loading state if project is not available
  }

  return (
    <div className="update-project-form">
      <h2>Update Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Skills</label>
          <div className="skill-logos-container">
            {skills.map((skill) => (
              <img
                key={skill.skillId}
                src={skill.skillLogo}
                alt={skill.skillName}
                className={`skill-logo ${
                  selectedSkills.find((s) => s.skillId === skill.skillId)
                    ? 'selected'
                    : ''
                }`}
                onClick={() => handleSkillToggle(skill)}
              />
            ))}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Project
        </button>
      </form>
      <button className="btn btn-secondary mt-3" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default UpdateProjectForm;
