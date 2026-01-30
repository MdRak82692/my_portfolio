import { useEffect, useState } from 'react';
import { skillsAPI } from '../../services/api';
import './Skills.css';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
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

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  if (loading) {
    return (
      <section id="skills" className="skills py-5">
        <div className="container text-center">
          <div className="spinner"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="skills py-5">
      <div className="container">
        <div className="section-header text-center mb-4">
          <h2 className="text-gradient">Skills & Technologies</h2>
          <p>Technologies I work with</p>
        </div>

        <div className="skills-categories">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="skill-category card">
              <h3 className="category-title">{category}</h3>
              <div className="skills-list">
                {categorySkills.map((skill) => (
                  <div key={skill._id} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {skills.length === 0 && (
          <div className="text-center">
            <p className="text-muted">No skills to display yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
