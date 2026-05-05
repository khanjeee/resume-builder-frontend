import React from 'react';

function PersonalInfoForm({ personalInfo, handleChange, photoDataUrl, handlePhotoChange, errors }) {
  return (
    <div className="card card-primary card-outline">
      <div className="card-header">
        <h3 className="card-title"><i className="fas fa-user mr-2" />Personal Information</h3>
      </div>
      <div className="card-body">
        <div className="row align-items-start">
          <div className="col-auto mb-3">
            <label className="d-block small text-muted mb-1">Photo</label>
            <div className="photo-upload">
              <input type="file" accept="image/*" onChange={handlePhotoChange} id="photo-upload" className="photo-input" />
              <label htmlFor="photo-upload" className="photo-label">
                {photoDataUrl ? <img src={photoDataUrl} alt="Preview" className="photo-preview" /> : <span className="photo-placeholder">+</span>}
              </label>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <div className="col-md-6 form-group">
                <label>Full Name *</label>
                <input type="text" name="name" value={personalInfo.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="John Doe" className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                {errors.name && <span className="invalid-feedback d-block">{errors.name}</span>}
              </div>
              <div className="col-md-6 form-group">
                <label>Email *</label>
                <input type="email" name="email" value={personalInfo.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="john@example.com" className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                {errors.email && <span className="invalid-feedback d-block">{errors.email}</span>}
              </div>
              <div className="col-md-6 form-group">
                <label>Phone</label>
                <input type="text" name="phone" value={personalInfo.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="+1 234 567 8900" className="form-control" />
              </div>
              <div className="col-md-6 form-group">
                <label>LinkedIn</label>
                <input type="text" name="linkedin" value={personalInfo.linkedin} onChange={(e) => handleChange('linkedin', e.target.value)} placeholder="linkedin.com/in/johndoe" className="form-control" />
              </div>
              <div className="col-md-6 form-group">
                <label>GitHub</label>
                <input type="text" name="github" value={personalInfo.github} onChange={(e) => handleChange('github', e.target.value)} placeholder="github.com/johndoe" className="form-control" />
              </div>
              <div className="col-md-6 form-group">
                <label>Portfolio</label>
                <input type="text" name="portfolio" value={personalInfo.portfolio} onChange={(e) => handleChange('portfolio', e.target.value)} placeholder="johndoe.com" className="form-control" />
              </div>
              <div className="col-12 form-group">
                <label>Address</label>
                <input type="text" name="address" value={personalInfo.address} onChange={(e) => handleChange('address', e.target.value)} placeholder="123 Main St, Anytown USA" className="form-control" />
              </div>
              <div className="col-12 form-group">
                <label>Bio</label>
                <textarea name="bio" value={personalInfo.bio} onChange={(e) => handleChange('bio', e.target.value)} rows="3" placeholder="A short, compelling introduction..." className="form-control" />
              </div>
              <div className="col-md-6 form-group">
                <label>Theme Color</label>
                <input type="color" name="themeColor" value={personalInfo.themeColor} onChange={(e) => handleChange('themeColor', e.target.value)} className="form-control form-control-color color-picker-input" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoForm;
