import React from 'react';

function LanguagesForm({ languages, handleChange, addLanguage, removeLanguage, errors }) {
  return (
    <div className="card card-primary card-outline">
      <div className="card-header">
        <h3 className="card-title"><i className="fas fa-language mr-2" />Languages</h3>
      </div>
      <div className="card-body">
        {languages.map((lang, index) => (
          <div key={index} className="input-group mb-2">
            <input
              type="text"
              value={lang.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              placeholder="Language Name"
              className="form-control"
            />
            <select
              value={lang.level}
              onChange={(e) => handleChange(index, 'level', e.target.value)}
              className="form-control col-4"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Native">Native</option>
            </select>
            {languages.length > 0 && (
              <div className="input-group-append">
                <button type="button" className="btn btn-outline-danger" onClick={() => removeLanguage(index)}>
                  <i className="fas fa-times" />
                </button>
              </div>
            )}
          </div>
        ))}
        <button type="button" className="btn btn-outline-primary" onClick={addLanguage}>
          <i className="fas fa-plus mr-1" /> Add Language
        </button>
      </div>
    </div>
  );
}

export default LanguagesForm;
