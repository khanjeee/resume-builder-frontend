import React from 'react';

function EducationForm({ education, handleChange, addEducation, removeEducation, errors }) {
  return (
    <div className="card card-primary card-outline">
      <div className="card-header">
        <h3 className="card-title"><i className="fas fa-graduation-cap mr-2" />Education</h3>
      </div>
      <div className="card-body">
        {education.map((edu, index) => (
          <div key={index} className="border rounded p-3 mb-3 bg-light">
            <div className="row">
              <div className="col-md-6 form-group mb-2">
                <label className="small">Degree *</label>
                <input type="text" value={edu.degree} onChange={(e) => handleChange(index, 'degree', e.target.value)} placeholder="B.Sc. Computer Science" className={`form-control form-control-sm ${errors[`educationDegree${index}`] ? 'is-invalid' : ''}`} />
                {errors[`educationDegree${index}`] && <span className="invalid-feedback d-block">{errors[`educationDegree${index}`]}</span>}
              </div>
              <div className="col-md-6 form-group mb-2">
                <label className="small">University *</label>
                <input type="text" value={edu.university} onChange={(e) => handleChange(index, 'university', e.target.value)} placeholder="University of Example" className={`form-control form-control-sm ${errors[`educationUniversity${index}`] ? 'is-invalid' : ''}`} />
                {errors[`educationUniversity${index}`] && <span className="invalid-feedback d-block">{errors[`educationUniversity${index}`]}</span>}
              </div>
              <div className="col-md-6 form-group mb-2">
                <label className="small">Year *</label>
                <input type="text" value={edu.year} onChange={(e) => handleChange(index, 'year', e.target.value)} placeholder="2020" className={`form-control form-control-sm ${errors[`educationYear${index}`] ? 'is-invalid' : ''}`} />
                {errors[`educationYear${index}`] && <span className="invalid-feedback d-block">{errors[`educationYear${index}`]}</span>}
              </div>
              <div className="col-md-12 form-group mb-2">
                <label className="small">Description</label>
                <textarea value={edu.description} onChange={(e) => handleChange(index, 'description', e.target.value)} placeholder="Relevant coursework, honors, or projects" className="form-control form-control-sm" rows="2"></textarea>
              </div>
            </div>
            {education.length > 1 && (
              <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeEducation(index)}>
                <i className="fas fa-trash mr-1" /> Remove Education
              </button>
            )}
          </div>
        ))}
        <button type="button" className="btn btn-outline-primary" onClick={addEducation}>
          <i className="fas fa-plus mr-1" /> Add Education
        </button>
      </div>
    </div>
  );
}

export default EducationForm;
