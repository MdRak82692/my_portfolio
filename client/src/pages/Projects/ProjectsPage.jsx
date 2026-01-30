import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import portfolioData from '../../data/portfolioData.json';
import './ProjectsPage.css';

const ProjectsPage = () => {
  const projects = portfolioData.projects;
  const loading = false;

  return (
    <div className="projects-page">
      <Navbar />
      <div className="container py-5">
        <header className="section-header text-center mb-4">
          <h1 className="text-gradient">My Projects</h1>
          <p>Explore my latest work and technical solutions</p>
        </header>

        <div className="grid grid-3">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {project.image && (
                <div className="project-image">
                  <img 
                    src={project.image.startsWith('http') ? project.image : project.image} 
                    alt={project.title} 
                  />
                  <div className="project-overlay">
                    <Link to={`/project/${project.id}`} className="btn btn-primary btn-sm">
                      View Details
                    </Link>
                  </div>
                </div>
              )}


              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="line-clamp-3">{project.description}</p>

                <div className="project-tech">
                  {project.technologies?.slice(0, 3).map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                  {project.technologies?.length > 3 && (
                    <span className="tech-tag">+{project.technologies.length - 3}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-5">
            <p className="text-muted">No projects found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
