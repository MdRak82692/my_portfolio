import { useEffect, useState } from 'react';
import { projectsAPI } from '../../../services/api';
import './ProjectsManager.css';

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
  });
  const [imageFile, setImageFile] = useState(null);

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

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('technologies', JSON.stringify(formData.technologies.split(',').map(t => t.trim())));
    data.append('liveUrl', formData.liveUrl);
    data.append('githubUrl', formData.githubUrl);
    data.append('featured', formData.featured);

    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      if (editingProject) {
        await projectsAPI.update(editingProject._id, data);
      } else {
        await projectsAPI.create(data);
      }
      fetchProjects();
      resetForm();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project');
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      featured: project.featured,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectsAPI.delete(id);
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      technologies: '',
      liveUrl: '',
      githubUrl: '',
      featured: false,
    });
    setImageFile(null);
    setEditingProject(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="projects-manager">
      <div className="page-header">
        <h1>Manage Projects</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
          {showForm ? 'Cancel' : '+ Add Project'}
        </button>
      </div>

      {showForm && (
        <div className="card mb-3">
          <h2>{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-input"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-textarea"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">Technologies (comma separated)</label>
              <input
                type="text"
                name="technologies"
                className="form-input"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
              />
            </div>

            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">Live URL</label>
                <input
                  type="url"
                  name="liveUrl"
                  className="form-input"
                  value={formData.liveUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">GitHub URL</label>
                <input
                  type="url"
                  name="githubUrl"
                  className="form-input"
                  value={formData.githubUrl}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Project Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />
                <span>Featured Project</span>
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingProject ? 'Update Project' : 'Create Project'}
              </button>
              <button type="button" onClick={resetForm} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-2">
        {projects.map((project) => (
          <div key={project._id} className="project-item card">
            {project.image && (
              <img 
                src={`http://localhost:5000${project.image}`} 
                alt={project.title}
                className="project-image"
              />
            )}
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            {project.technologies.length > 0 && (
              <div className="tech-tags">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            )}
            <div className="project-actions">
              <button onClick={() => handleEdit(project)} className="btn btn-secondary btn-sm">
                Edit
              </button>
              <button onClick={() => handleDelete(project._id)} className="btn btn-danger btn-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && !showForm && (
        <div className="empty-state card text-center">
          <i className="fas fa-folder-open"></i>
          <h3>No projects yet</h3>
          <p>Click "Add Project" to create your first project</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
