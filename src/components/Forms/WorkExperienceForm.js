import React from 'react';

function WorkExperienceForm({
  workExperience,
  handleChange,
  handleDescriptionChange,
  addWorkExperience,
  removeWorkExperience,
  addWorkDescription,
  removeWorkDescription,
  errors,
}) {
  return (
    <div className="card card-primary card-outline">
      <div className="card-header">
        <h3 className="card-title"><i className="fas fa-briefcase mr-2" />Work Experience</h3>
      </div>
      <div className="card-body">
        {workExperience.map((work, workIndex) => (
          <div key={workIndex} className="border rounded p-3 mb-3 bg-light">
            <h6 className="text-primary mb-2">Job {workIndex + 1}</h6>
            <div className="row">
              <div className="col-md-6 form-group mb-2">
                <label className="small">Job Title *</label>
                <input
                  type="text"
                  value={work.title}
                  onChange={(e) => handleChange(workIndex, 'title', e.target.value)}
                  placeholder="Software Engineer"
                  className={`form-control form-control-sm ${errors[`workTitle${workIndex}`] ? 'is-invalid' : ''}`}
                />
                {errors[`workTitle${workIndex}`] && <span className="invalid-feedback d-block">{errors[`workTitle${workIndex}`]}</span>}
              </div>
              <div className="col-md-6 form-group mb-2">
                <label className="small">Company *</label>
                <input
                  type="text"
                  value={work.company}
                  onChange={(e) => handleChange(workIndex, 'company', e.target.value)}
                  placeholder="Google"
                  className={`form-control form-control-sm ${errors[`workCompany${workIndex}`] ? 'is-invalid' : ''}`}
                />
                {errors[`workCompany${workIndex}`] && <span className="invalid-feedback d-block">{errors[`workCompany${workIndex}`]}</span>}
              </div>
              <div className="col-md-12 form-group mb-2">
                <label className="small">Years *</label>
                <input
                  type="text"
                  value={work.years}
                  onChange={(e) => handleChange(workIndex, 'years', e.target.value)}
                  placeholder="2018 - 2022"
                  className={`form-control form-control-sm ${errors[`workYears${workIndex}`] ? 'is-invalid' : ''}`}
                />
                {errors[`workYears${workIndex}`] && <span className="invalid-feedback d-block">{errors[`workYears${workIndex}`]}</span>}
              </div>
            </div>
            <div className="form-group mb-2">
              <label className="small">Responsibilities *</label>
              {work.description.map((desc, descIndex) => (
                <div key={descIndex} className="input-group input-group-sm mb-1">
                  <textarea
                    value={desc}
                    onChange={(e) => handleDescriptionChange(workIndex, descIndex, e.target.value)}
                    placeholder="Managed a team of 5 engineers..."
                    rows="2"
                    className={`form-control ${errors[`workDescription${workIndex}`] ? 'is-invalid' : ''}`}
                  ></textarea>
                  {work.description.length > 1 && (
                    <div className="input-group-append">
                      <button type="button" className="btn btn-outline-danger" onClick={() => removeWorkDescription(workIndex, descIndex)}>
                        <i className="fas fa-times" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <button type="button" className="btn btn-xs btn-outline-secondary mt-1" onClick={() => addWorkDescription(workIndex)}>
                <i className="fas fa-plus mr-1" /> Add responsibility
              </button>
              {errors[`workDescription${workIndex}`] && <span className="invalid-feedback d-block">{errors[`workDescription${workIndex}`]}</span>}
            </div>
            {workExperience.length > 1 && (
              <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeWorkExperience(workIndex)}>
                <i className="fas fa-trash mr-1" /> Remove Job
              </button>
            )}
          </div>
        ))}
        <button type="button" className="btn btn-outline-primary" onClick={addWorkExperience}>
          <i className="fas fa-plus mr-1" /> Add Work Experience
        </button>
      </div>
    </div>
  );
}

export default WorkExperienceForm;
