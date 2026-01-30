import { useState, useEffect } from 'react';
import { educationAPI } from '../../../services/api';

const EducationManager = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    current: false,
    grade: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      setLoading(true);
      const response = await educationAPI.getAll();
      setEducation(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch education');
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
        await educationAPI.update(editingId, formData);
      } else {
        await educationAPI.create(formData);
      }
      fetchEducation();
      resetForm();
    } catch (err) {
      setError(editingId ? 'Failed to update education' : 'Failed to create education');
      console.error(err);
    }
  };

  const handleEdit = (edu) => {
    setFormData({
      institution: edu.institution,
      degree: edu.degree,
      fieldOfStudy: edu.fieldOfStudy,
      startDate: formatDateForInput(edu.startDate),
      endDate: edu.endDate ? formatDateForInput(edu.endDate) : '',
      current: edu.current || false,
      grade: edu.grade || '',
      description: edu.description || ''
    });
    setEditingId(edu._id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      try {
        await educationAPI.delete(id);
        fetchEducation();
      } catch (err) {
        setError('Failed to delete education');
        console.error(err);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      current: false,
      grade: '',
      description: ''
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  if (loading && !education.length) return <div className="spinner"></div>;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1 className="text-gradient">Education Manager</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setIsFormOpen(true)}
        >
          <i className="fas fa-plus"></i> Add Education
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {isFormOpen && (
        <div className="card mb-3 fade-in">
          <h3>{editingId ? 'Edit Education' : 'Add New Education'}</h3>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Institution / School</label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Degree</label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Field of Study</label>
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Grade / GPA</label>
                <input
                  type="text"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="form-input"
                />
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

            <div className="form-group flex items-center mb-2">
              <input
                type="checkbox"
                name="current"
                id="current-edu"
                checked={formData.current}
                onChange={handleInputChange}
                className="mr-2"
                style={{ width: 'auto', marginRight: '10px' }}
              />
              <label htmlFor="current-edu" className="form-label" style={{ marginBottom: 0 }}>Currently studying here</label>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-textarea"
                rows="4"
              ></textarea>
            </div>

            <div className="flex gap-2 mt-2">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update Education' : 'Add Education'}
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

      <div className="education-list">
        {education.map(edu => (
          <div key={edu._id} className="card mb-3 education-card">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl text-primary">{edu.degree}</h3>
                <h4 className="text-lg">{edu.institution}</h4>
                <p className="text-sm text-secondary italic">{edu.fieldOfStudy}</p>
                <p className="text-sm text-secondary mt-1">
                  {new Date(edu.startDate).toLocaleDateString()} - 
                  {edu.current ? ' Present' : ` ${new Date(edu.endDate).toLocaleDateString()}`}
                  {edu.grade && ` | Grade: ${edu.grade}`}
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  className="btn btn-sm btn-secondary"
                  onClick={() => handleEdit(edu)}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(edu._id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
            {edu.description && <p className="mt-2 text-sm">{edu.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationManager;
