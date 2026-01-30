import { useState, useEffect } from 'react';
import { skillsAPI } from '../../../services/api';

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    level: 50,
    category: 'Frontend',
    icon: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await skillsAPI.getAll();
      setSkills(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch skills');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await skillsAPI.update(editingId, formData);
      } else {
        await skillsAPI.create(formData);
      }
      fetchSkills();
      resetForm();
    } catch (err) {
      setError(editingId ? 'Failed to update skill' : 'Failed to create skill');
      console.error(err);
    }
  };

  const handleEdit = (skill) => {
    setFormData({
      name: skill.name,
      level: skill.level,
      category: skill.category,
      icon: skill.icon || ''
    });
    setEditingId(skill._id);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await skillsAPI.delete(id);
        fetchSkills();
      } catch (err) {
        setError('Failed to delete skill');
        console.error(err);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      level: 50,
      category: 'Frontend',
      icon: ''
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  if (loading && !skills.length) return <div className="spinner"></div>;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1 className="text-gradient">Skills Manager</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setIsFormOpen(true)}
        >
          <i className="fas fa-plus"></i> Add Skill
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {isFormOpen && (
        <div className="card mb-3 fade-in">
          <h3>{editingId ? 'Edit Skill' : 'Add New Skill'}</h3>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Skill Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Level (0-100)</label>
                <input
                  type="number"
                  name="level"
                  min="0"
                  max="100"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>
            
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Tools">Tools</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Icon Class (FontAwesome)</label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="fab fa-react"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update Skill' : 'Add Skill'}
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

      <div className="skills-grid grid-3">
        {skills.map(skill => (
          <div key={skill._id} className="card skill-card">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <i className={`${skill.icon} text-primary text-xl`}></i>
                <h3 className="text-lg">{skill.name}</h3>
              </div>
              <span className={`badge badge-${skill.category.toLowerCase()}`}>
                {skill.category}
              </span>
            </div>
            
            <div className="skill-level-bar mb-2">
              <div 
                className="skill-level-fill"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
            <p className="text-sm text-secondary mb-2">{skill.level}% Proficiency</p>

            <div className="flex gap-2 mt-2">
              <button 
                className="btn btn-sm btn-secondary"
                onClick={() => handleEdit(skill)}
              >
                <i className="fas fa-edit"></i>
              </button>
              <button 
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(skill._id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsManager;
