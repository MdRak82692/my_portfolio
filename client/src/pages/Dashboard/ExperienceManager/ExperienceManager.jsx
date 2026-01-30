import { useState, useEffect } from 'react';
import { experienceAPI } from '../../../services/api';

const ExperienceManager = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    description: '',
    startDate: '',
    endDate: '',
    current: false
  });
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const response = await experienceAPI.getAll();
      setExperiences(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch experiences');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await experienceAPI.update(editingId, formData);
      } else {
        await experienceAPI.create(formData);
      }
      fetchExperiences();
      resetForm();
    } catch (err) {
      setError(editingId ? 'Failed to update experience' : 'Failed to create experience');
      console.error(err);
    }
  };

  const handleEdit = (exp) => {
    setFormData({
      company: exp.company,
      position: exp.position,
      location: exp.location || '',
      description: exp.description,
      startDate: formatDateForInput(exp.startDate),
      endDate: exp.endDate ? formatDateForInput(exp.endDate) : '',
      current: exp.current || false
    });
    setEditingId(exp._id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await experienceAPI.delete(id);
        fetchExperiences();
      } catch (err) {
        setError('Failed to delete experience');
        console.error(err);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      location: '',
      description: '',
      startDate: '',
      endDate: '',
      current: false
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  if (loading && !experiences.length) return <div className="spinner"></div>;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1 className="text-gradient">Experience Manager</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setIsFormOpen(true)}
        >
          <i className="fas fa-plus"></i> Add Experience
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {isFormOpen && (
        <div className="card mb-3 fade-in">
          <h3>{editingId ? 'Edit Experience' : 'Add New Experience'}</h3>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Position / Role</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group flex items-center" style={{ marginTop: '2.5rem' }}>
                <input
                  type="checkbox"
                  name="current"
                  id="current"
                  checked={formData.current}
                  onChange={handleInputChange}
                  className="mr-2"
                  style={{ width: 'auto', marginRight: '10px' }}
                />
                <label htmlFor="current" className="form-label" style={{ marginBottom: 0 }}>This is my current role</label>
              </div>
            </div>
            
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="form-input"
                  disabled={formData.current}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-textarea"
                rows="4"
                required
              ></textarea>
            </div>

            <div className="flex gap-2 mt-2">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update Experience' : 'Add Experience'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="experience-list">
        {experiences.map(exp => (
          <div key={exp._id} className="card mb-3 experience-card">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl text-primary">{exp.position}</h3>
                <h4 className="text-lg">{exp.company}</h4>
                <p className="text-sm text-secondary">
                  {new Date(exp.startDate).toLocaleDateString()} - 
                  {exp.current ? ' Present' : ` ${new Date(exp.endDate).toLocaleDateString()}`}
                  {exp.location && ` | ${exp.location}`}
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  className="btn btn-sm btn-secondary"
                  onClick={() => handleEdit(exp)}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(exp._id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
            <p className="mt-2 whitespace-pre-line">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceManager;
