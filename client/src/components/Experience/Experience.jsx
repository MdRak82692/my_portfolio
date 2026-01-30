import { useEffect, useState } from 'react';
import { experienceAPI } from '../../services/api';
import './Experience.css';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await experienceAPI.getAll();
      setExperiences(response.data.data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <section id="experience" className="experience py-5">
        <div className="container text-center">
          <div className="spinner"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="experience py-5">
      <div className="container">
        <div className="section-header text-center mb-4">
          <h2 className="text-gradient">Work Experience</h2>
          <p>My professional journey</p>
        </div>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <div 
              key={exp._id} 
              className="timeline-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="timeline-marker"></div>
              <div className="timeline-content card">
                <div className="timeline-header">
                  <div>
                    <h3>{exp.position}</h3>
                    <h4 className="company">{exp.company}</h4>
                  </div>
                  <div className="timeline-date">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.location && (
                  <p className="location">
                    <i className="fas fa-map-marker-alt"></i> {exp.location}
                  </p>
                )}
                <p className="description">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>

        {experiences.length === 0 && (
          <div className="text-center">
            <p className="text-muted">No experience to display yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
