import React, { useState } from 'react';
import { addSkill } from './api/addSkill';
import { skillRequestModel } from './model/projectResponseModel';


interface AddSkillFormProps {
  onClose: () => void; // Function to close modal
}

const AddSkillForm: React.FC<AddSkillFormProps> = ({ onClose }): JSX.Element => {
  const [skillName, setSkillName] = useState<string>('');
  const [skillLogo, setSkillLogo] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    const newSkill: skillRequestModel = {
      skillName,
      skillLogo,
    };

    try {
      await addSkill(newSkill);
      alert('Skill added successfully!');
      onClose(); // Close modal after submission
    } catch (error) {
      console.error('Error adding skill:', error);
      alert('Failed to add skill.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="skillName">Skill Name</label>
        <input
          type="text"
          id="skillName"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="skillLogo">Skill Logo URL</label>
        <input
          type="text"
          id="skillLogo"
          value={skillLogo}
          onChange={(e) => setSkillLogo(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Skill
      </button>
    </form>
  );
};

export default AddSkillForm;
