import Navbar from '../../components/Navbar/Navbar';
import portfolioData from '../../data/portfolioData.json';
import './EducationPage.css';

const EducationPage = () => {
  const education = portfolioData.education;

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

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
            <div key={`${edu.institution}-${edu.degree}`} className="education-card card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
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
