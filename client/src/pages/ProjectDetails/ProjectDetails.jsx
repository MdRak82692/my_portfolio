import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsAPI } from '../../services/api';
import Navbar from '../../components/Navbar/Navbar';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await projectsAPI.getOne(id);
        setProject(response.data.data);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="project-details-page">
        <Navbar />
        <div className="container text-center py-5">
          <div className="spinner" style={{ margin: '100px auto' }}></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-details-page">
        <Navbar />
        <div className="container text-center py-5">
          <h2>Project not found</h2>
          <Link to="/projects" className="btn btn-primary mt-2">Back to Projects</Link>
        </div>
      </div>
    );
  }

  const allImages = [project.image, ...(project.images || [])].filter(img => img);

  return (
    <div className="project-details-page">
      <Navbar />
      <div className="container py-5">
        <Link to="/projects" className="back-link mb-3">
          <i className="fas fa-arrow-left"></i> Back to Projects
        </Link>
        
        <div className="project-details-grid">
          <div className="project-gallery">
            <div className="main-image card">
              <img 
                src={`http://localhost:5000${allImages[activeImage]}`} 
                alt={project.title} 
              />
            </div>
            {allImages.length > 1 && (
              <div className="thumbnail-grid mt-2">
                {allImages.map((img, index) => (
                  <div 
                    key={index} 
                    className={`thumbnail card ${activeImage === index ? 'active' : ''}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={`http://localhost:5000${img}`} alt={`${project.title} thumb ${index}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="project-info fade-in">
            <h1 className="text-gradient mb-1">{project.title}</h1>
            
            <div className="project-meta mb-2">
              {project.technologies?.map((tech, i) => (
                <span key={i} className="tech-tag">{tech}</span>
              ))}
            </div>

            <div className="project-description card mb-3">
              <h3>About Project</h3>
              <p>{project.description}</p>
              {project.details && (
                <div className="mt-2">
                  <h3>Full Details</h3>
                  <div className="details-content">{project.details}</div>
                </div>
              )}
            </div>

            <div className="project-actions flex gap-2">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <i className="fas fa-external-link-alt"></i> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
