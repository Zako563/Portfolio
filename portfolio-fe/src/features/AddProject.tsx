import React, { useState, useEffect } from 'react';
import { addProject } from './api/addProject';
import { getAllSkills } from './api/getAllSkills';
import { projectRequestModel } from './model/projectRequestModel';
import { skillResponseModel } from './model/projectResponseModel';
import './AddProjectForm.css';

interface AddProjectFormProps {
  onClose: () => void; // Function to close modal
}

const AddProjectForm: React.FC<AddProjectFormProps> = ({ onClose }): JSX.Element => {
  const [projectName, setProjectName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [projectLink, setProjectLink] = useState<string>('');
  const [skills, setSkills] = useState<skillResponseModel[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<skillResponseModel[]>([]);

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
    setSelectedSkills((prevSkills) =>
      prevSkills.find((s) => s.skillId === skill.skillId)
        ? prevSkills.filter((s) => s.skillId !== skill.skillId)
        : [...prevSkills, skill]
    );
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    const newProject: projectRequestModel = {
      projectName,
      description,
      imageUrl,
      skills: selectedSkills,
      projectLink,
    };

    try {
      await addProject(newProject);
      alert('Project added successfully!');
      onClose(); // Close modal after submission
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project.');
    }
  };

  return (
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
        <label htmlFor="projectLink">Project Link</label>
        <input
          type="text"
          id="projectLink"
          value={projectLink}
          onChange={(e) => setProjectLink(e.target.value)}
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
              className="skill-logo"
              onClick={() => handleSkillToggle(skill)}
            />
          ))}
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Add Project
      </button>
    </form>
  );
};

export default AddProjectForm;
