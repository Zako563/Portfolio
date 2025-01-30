import React, { useState, useEffect } from 'react';
import { zakoResponseModel } from './model/zakoResponseModel';
import { getAllzako } from './api/getAllZako';
import { getAllSkills } from './api/getAllSkills';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ZakoList.css';
import { skillResponseModel } from './model/projectResponseModel';

const ZakoList: React.FC = (): JSX.Element => {
  const [zakoItems, setZakoItems] = useState<zakoResponseModel[]>([]);
  const [skills, setSkills] = useState<skillResponseModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [skillsLoading, setSkillsLoading] = useState<boolean>(true);

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

    fetchZakoData();
    fetchSkillsData();
  }, []);

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
              src="https://i.postimg.cc/yYfdWy7w/1738278650630-removebg-preview.png"
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
    </div>
  );
};

export default ZakoList;