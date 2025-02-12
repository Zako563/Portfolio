import React, { useState, useEffect } from 'react';
import { zakoResponseModel } from './model/zakoResponseModel';
import { getAllzako } from './api/getAllZako';
import { getAllSkills } from './api/getAllSkills';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ZakoList.css';
import { skillResponseModel } from './model/projectResponseModel';
import AddSkillForm from './AddSkill';  // Assuming you have an AddSkill form component

const ZakoList: React.FC = (): JSX.Element => {
  const [zakoItems, setZakoItems] = useState<zakoResponseModel[]>([]);
  const [skills, setSkills] = useState<skillResponseModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [skillsLoading, setSkillsLoading] = useState<boolean>(true);
  const [showAddSkillModal, setShowAddSkillModal] = useState<boolean>(false);  // For showing skill modal
  const [isZako, setIsZako] = useState<boolean>(false);  // Check if the user has Zako role

  useEffect(() => {
    const fetchZakoData = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await getAllzako();
        if (Array.isArray(response)) {
          setZakoItems(response);
        } else {
          console.error('Fetched data is not an array:', response);
        }
      } catch (error) {
        console.error('Error fetching zako items:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSkillsData = async (): Promise<void> => {
      try {
        setSkillsLoading(true);
        const response = await getAllSkills();
        setSkills(response);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setSkillsLoading(false);
      }
    };

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

    fetchZakoData();
    fetchSkillsData();
    fetchUserRoles();
  }, []);

  const handleAddSkill = () => {
    setShowAddSkillModal(true);
  };

  const handleCloseModal = () => {
    setShowAddSkillModal(false);
    window.location.reload();
  };

  if (loading || skillsLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          {/* Image on the left */}
          <div className="hero-image">
            <img
              src="https://i.postimg.cc/s1Fqn8zM/aifaceswap-3f6e8e1c5ccabb53df85850a21c486da-1.jpg"
              alt="Profile"
              className="hero-image-full"
            />
          </div>

          {/* Dynamic Info on the right */}
          <div className="hero-text">
            {zakoItems.length > 0 ? (
              zakoItems.map((item) => (
                <div key={item.zakoId} className="zako-item">
                  <p className="zako-name">{item.name}</p> {/* Name with bigger font */}
                  <p className="zako-title">{item.title}</p>
                  <p className="zako-summary">{item.summary}</p> {/* Summary under title */}
                  <p className="zako-language">{item.language}</p>
                  <div className="language-images">
                    {(item.language || []).map((language, index) => (
                      <img
                        key={index}
                        src={language}
                        alt={`Language ${index}`}
                        className="language-image"
                        onError={(e) => {
                          e.currentTarget.src = "path/to/fallback-image.png";
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-items">No zako items available</p>
            )}
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="skills-section2">
        <h2>My Skills</h2>
        {/* Add Skill Button (only visible to Zako role) */}
        {isZako && (
          <button className="btn btn-primary mb-3" onClick={handleAddSkill}>
            Add Skill
          </button>
        )}
        <div className="skill-logos2">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <img
                key={skill.skillId}
                src={skill.skillLogo}
                alt={skill.skillName}
                className="skill-logo2"
                onError={(e) => {
                  e.currentTarget.src = "path/to/fallback-image.png";
                }}
              />
            ))
          ) : (
            <p className="no-items">No skills available</p>
          )}
        </div>
      </div>

      {/* Add Skill Modal */}
      {showAddSkillModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Skill</h5>
                <button className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <AddSkillForm onClose={handleCloseModal} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZakoList;
