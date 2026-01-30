import Navbar from '../../components/Navbar/Navbar';
import portfolioData from '../../data/portfolioData.json';
import './ExperiencePage.css';

const ExperiencePage = () => {
  const experiences = portfolioData.experience;

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="experience-page">
      <Navbar />
      <div className="container py-5">
        <header className="section-header text-center mb-5">
          <h1 className="text-gradient">Professional Experience</h1>
          <p>My career trajectory and accomplishments</p>
        </header>

        <div className="experience-timeline-container">
          {experiences.map((exp, index) => (
            <div key={`${exp.company}-${exp.position}`} className="experience-timeline-item fade-in" style={{ animationDelay: `${index * 0.2}s` }}>

              <div className="experience-date-side">
                <span className="date-badge">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              <div className="timeline-dot"></div>
              <div className="experience-content-card card">
                <h2 className="position text-primary">{exp.position}</h2>
                <h3 className="company-name">{exp.company}</h3>
                {exp.location && (
                  <p className="location mb-2">
                    <i className="fas fa-map-marker-alt"></i> {exp.location}
                  </p>
                )}
                <div className="exp-description">
                  {exp.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {experiences.length === 0 && (
          <div className="text-center py-5">
            <p className="text-muted">No experience entries found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperiencePage;
