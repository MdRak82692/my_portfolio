import { useEffect, useState } from 'react';
import { skillsAPI } from '../../services/api';
import Navbar from '../../components/Navbar/Navbar';
import './SkillsPage.css';

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
    window.scrollTo(0, 0);
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await skillsAPI.getAll();
      setSkills(response.data.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="skills-page">
        <Navbar />
        <div className="container text-center py-5">
          <div className="spinner" style={{ margin: '100px auto' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="skills-page">
      <Navbar />
      <div className="container py-5">
        <header className="section-header text-center mb-4">
          <h1 className="text-gradient">Skills & Expertise</h1>
          <p>The technical foundation of my work</p>
        </header>

        <div className="skills-grid">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="skill-category-card card fade-in">
              <h2 className="category-title text-primary">{category}</h2>
              <div className="skills-list">
                {categorySkills.map((skill) => (
                  <div key={skill._id} className="skill-item">
                    <div className="skill-info">
                      <div className="skill-name-wrapper">
                        {skill.icon && <i className={`${skill.icon} text-accent`}></i>}
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-progress-bg">
                      <div 
                        className="skill-progress-fill" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
