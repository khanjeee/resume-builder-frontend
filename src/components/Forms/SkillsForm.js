import React from 'react';

function SkillsForm({ skills, handleChange, addSkill, removeSkill, errors }) {
  return (
    <div className="card card-primary card-outline">
      <div className="card-header">
        <h3 className="card-title"><i className="fas fa-wrench mr-2" />Skills</h3>
      </div>
      <div className="card-body">
        {skills.map((skill, index) => (
          <div key={index} className="input-group mb-2">
            <input
              type="text"
              value={skill.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              placeholder="Skill Name"
              className={`form-control ${errors[`skillName${index}`] ? 'is-invalid' : ''}`}
            />
            <select
              value={skill.level}
              onChange={(e) => handleChange(index, 'level', e.target.value)}
              className="form-control col-4"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
            {skills.length > 0 && (
              <div className="input-group-append">
                <button type="button" className="btn btn-outline-danger" onClick={() => removeSkill(index)}>
                  <i className="fas fa-times" />
                </button>
              </div>
            )}
            {errors[`skillName${index}`] && <span className="invalid-feedback d-block">{errors[`skillName${index}`]}</span>}
          </div>
        ))}
        <button type="button" className="btn btn-outline-primary" onClick={addSkill}>
          <i className="fas fa-plus mr-1" /> Add Skill
        </button>
      </div>
    </div>
  );
}

export default SkillsForm;
