import { useEffect, useState } from 'react';
import { educationAPI } from '../../services/api';
import Navbar from '../../components/Navbar/Navbar';
import './EducationPage.css';

const EducationPage = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEducation();
    window.scrollTo(0, 0);
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await educationAPI.getAll();
      setEducation(response.data.data);
    } catch (error) {
      console.error('Error fetching education:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="education-page">
        <Navbar />
        <div className="container text-center py-5">
          <div className="spinner" style={{ margin: '100px auto' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="education-page">
      <Navbar />
      <div className="container py-5">
        <header className="section-header text-center mb-5">
          <h1 className="text-gradient">Academic Background</h1>
          <p>The education that shaped my thinking</p>
        </header>

        <div className="education-grid">
          {education.map((edu, index) => (
            <div key={edu._id} className="education-card card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="edu-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <div className="edu-content">
                <span className="edu-date">
                  {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                </span>
                <h2 className="edu-degree text-gradient">{edu.degree}</h2>
                <h3 className="edu-institution">{edu.institution}</h3>
                <p className="edu-field italic text-secondary">{edu.fieldOfStudy}</p>
                {edu.grade && <p className="edu-grade mt-1">Grade: <span className="text-primary">{edu.grade}</span></p>}
                {edu.description && (
                  <div className="edu-desc mt-2">
                    {edu.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {education.length === 0 && (
          <div className="text-center py-5">
            <p className="text-muted">No education records found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationPage;
