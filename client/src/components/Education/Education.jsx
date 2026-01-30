import { useEffect, useState } from 'react';
import { educationAPI } from '../../services/api';
import './Education.css';

const Education = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEducation();
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
      month: 'short',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <section id="education" className="education py-5">
        <div className="container text-center">
          <div className="spinner"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="education" className="education py-5">
      <div className="container">
        <div className="section-header text-center mb-4">
          <h2 className="text-gradient">Education</h2>
          <p>My academic path</p>
        </div>

        <div className="education-timeline">
          {education.map((edu, index) => (
            <div 
              key={edu._id} 
              className="education-item card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="education-header">
                <div>
                  <h3 className="degree">{edu.degree}</h3>
                  <h4 className="institution">{edu.institution}</h4>
                  <p className="field">{edu.fieldOfStudy}</p>
                </div>
                <div className="education-meta text-right">
                  <span className="date">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </span>
                  {edu.grade && <span className="grade d-block">Grade: {edu.grade}</span>}
                </div>
              </div>
              {edu.description && <p className="description mt-2">{edu.description}</p>}
            </div>
          ))}
        </div>

        {education.length === 0 && (
          <div className="text-center">
            <p className="text-muted">No education details to display yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Education;
