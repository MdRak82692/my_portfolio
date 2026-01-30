import { useEffect, useState } from 'react';
import { projectsAPI } from '../../services/api';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="projects" className="projects py-5">
        <div className="container text-center">
          <div className="spinner"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="projects py-5">
      <div className="container">
        <div className="section-header text-center mb-4">
          <h2 className="text-gradient">Featured Projects</h2>
          <p>Here are some of my recent works</p>
        </div>

        <div className="grid grid-2">
          {projects.map((project, index) => (
            <div 
              key={project._id} 
              className="project-card card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {project.image && (
                <div className="project-image">
                  <img 
                    src={`http://localhost:5000${project.image}`} 
                    alt={project.title} 
                  />
                  <div className="project-overlay">
                    <div className="project-links">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-primary btn-sm"
                        >
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-secondary btn-sm"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                {project.technologies && project.technologies.length > 0 && (
                  <div className="project-tech">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center">
            <p className="text-muted">No projects to display yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
