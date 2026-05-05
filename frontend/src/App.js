import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const JOB_TITLES = ['Software Developer', 'Senior Software Developer', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer', 'Data Scientist', 'Product Manager', 'Project Manager', 'UX Designer', 'Other'];
const DEGREES = ['High School', "Bachelor's", "Master's", 'PhD', 'Diploma', 'Certificate', 'Other'];
const PROFICIENCY_LEVELS = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic', 'Other'];

const SAMPLE_FORM_DATA = {
  theme: 'classic',
  themeColor: '#0d9488',
  name: 'John Smith',
  jobTitle: 'Senior Software Developer',
  jobTitleOther: '',
  phone: '+1 555 123 4567',
  email: 'john.smith@email.com',
  location: 'San Francisco, CA, USA',
  profile: 'Results-driven Senior Software Engineer with 8+ years of experience in full-stack development. Expertise in building scalable web applications using modern JavaScript frameworks and cloud technologies. Proven track record of leading development teams and delivering high-quality software solutions that drive business growth. Strong problem-solving skills and passion for continuous learning.',
  skills: [
    'JavaScript / TypeScript',
    'React.js / Node.js',
    'Python / Django',
    'AWS / Docker',
    'PostgreSQL / MongoDB',
    'Git / CI/CD',
    'Agile / Scrum',
    'RESTful APIs',
    'Microservices Architecture'
  ],
  workExperience: [
    {
      startDate: 'Jan 2020',
      endDate: 'Present',
      company: 'Tech Solutions Inc.',
      jobLocation: 'San Francisco, CA, USA',
      position: 'Senior Software Developer',
      description: [
        'Led a team of 5 developers in building a cloud-based SaaS platform serving 10,000+ users',
        'Architected and implemented microservices infrastructure using Node.js and Docker',
        'Reduced application load time by 60% through performance optimization and caching strategies',
        'Mentored junior developers and conducted code reviews to maintain high code quality standards'
      ]
    },
    {
      startDate: 'Mar 2018',
      endDate: 'Dec 2019',
      company: 'Digital Innovations LLC',
      jobLocation: 'Austin, TX, USA',
      position: 'Full Stack Developer',
      description: [
        'Developed and maintained React-based web applications for enterprise clients',
        'Built RESTful APIs using Python Django framework',
        'Implemented automated testing strategies achieving 85% code coverage',
        'Collaborated with UX designers to create intuitive user interfaces'
      ]
    },
    {
      startDate: 'Jun 2016',
      endDate: 'Feb 2018',
      company: 'StartUp Ventures',
      jobLocation: 'Boston, MA, USA',
      position: 'Software Developer',
      description: [
        'Developed responsive web applications using HTML, CSS, and JavaScript',
        'Participated in agile development processes and daily stand-ups',
        'Fixed bugs and implemented new features based on user feedback',
        'Worked closely with QA team to ensure software quality'
      ]
    }
  ],
  education: [
    { degree: "Master's", degreeOther: '', startYear: '2014', endYear: '2016' },
    { degree: "Bachelor's", degreeOther: '', startYear: '2010', endYear: '2014' }
  ],
  languages: [
    { language: 'English', proficiency: 'Native' },
    { language: 'Spanish', proficiency: 'Fluent' },
    { language: 'French', proficiency: 'Basic' }
  ]
};

function App() {
  const [formData, setFormData] = useState({
    theme: 'classic',
    themeColor: '#0d9488',
    name: '',
    jobTitle: '',
    jobTitleOther: '',
    phone: '',
    email: '',
    location: '',
    profile: '',
    skills: [''],
    workExperience: [
      {
        startDate: '',
        endDate: '',
        company: '',
        jobLocation: '',
        position: '',
        description: ['']
      }
    ],
    education: [
      {
        degree: '',
        degreeOther: '',
        startYear: '',
        endYear: ''
      }
    ],
    languages: [
      {
        language: '',
        proficiency: ''
      }
    ]
  });

  const [photoDataUrl, setPhotoDataUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  // Theme list from API (fallback if API not ready)
  const [themeList, setThemeList] = useState([
    { id: 'classic', name: 'Classic', description: 'Professional blue headers' },
    { id: 'modern', name: 'Modern', description: 'Teal accent, clean layout' },
    { id: 'minimal', name: 'Minimal', description: 'Black & white, minimal' }
  ]);

  useEffect(() => {
    const apiBase = process.env.REACT_APP_API_URL || '';
    axios.get(`${apiBase}/api/themes`).then((res) => {
      if (res.data.themes && res.data.themes.length > 0) {
        setThemeList(res.data.themes);
      }
    }).catch(() => { /* keep fallback list */ });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData({ ...formData, skills: newSkills });
  };

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, '']
    });
  };

  const removeSkill = (index) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: newSkills });
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const newWorkExperience = [...formData.workExperience];
    newWorkExperience[index][field] = value;
    setFormData({ ...formData, workExperience: newWorkExperience });
  };

  const handleWorkDescriptionChange = (jobIndex, descIndex, value) => {
    const newWorkExperience = [...formData.workExperience];
    newWorkExperience[jobIndex].description[descIndex] = value;
    setFormData({ ...formData, workExperience: newWorkExperience });
  };

  const addWorkExperience = () => {
    setFormData({
      ...formData,
      workExperience: [
        ...formData.workExperience,
        {
          startDate: '',
          endDate: '',
          company: '',
          jobLocation: '',
          position: '',
          description: ['']
        }
      ]
    });
  };

  const removeWorkExperience = (index) => {
    const newWorkExperience = formData.workExperience.filter((_, i) => i !== index);
    setFormData({ ...formData, workExperience: newWorkExperience });
  };

  const addWorkDescription = (jobIndex) => {
    const newWorkExperience = [...formData.workExperience];
    newWorkExperience[jobIndex].description.push('');
    setFormData({ ...formData, workExperience: newWorkExperience });
  };

  const removeWorkDescription = (jobIndex, descIndex) => {
    const newWorkExperience = [...formData.workExperience];
    newWorkExperience[jobIndex].description = newWorkExperience[jobIndex].description.filter(
      (_, i) => i !== descIndex
    );
    setFormData({ ...formData, workExperience: newWorkExperience });
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index][field] = value;
    setFormData({ ...formData, education: newEducation });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          degree: '',
          degreeOther: '',
          startYear: '',
          endYear: ''
        }
      ]
    });
  };

  const removeEducation = (index) => {
    const newEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: newEducation });
  };

  const handleLanguageChange = (index, field, value) => {
    const newLanguages = [...formData.languages];
    newLanguages[index][field] = value;
    setFormData({ ...formData, languages: newLanguages });
  };

  const addLanguage = () => {
    setFormData({
      ...formData,
      languages: [
        ...formData.languages,
        {
          language: '',
          proficiency: ''
        }
      ]
    });
  };

  const removeLanguage = (index) => {
    const newLanguages = formData.languages.filter((_, i) => i !== index);
    setFormData({ ...formData, languages: newLanguages });
  };

  const handleAutoFill = () => {
    setFormData(JSON.parse(JSON.stringify(SAMPLE_FORM_DATA)));
    setErrors({});
    setMessage('');
    setPhotoDataUrl('');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setMessage('Please select an image file (JPG, PNG, etc.).');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setMessage('Image must be under 2 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhotoDataUrl(reader.result);
    reader.readAsDataURL(file);
    setMessage('');
  };

  const validateForm = () => {
    const err = {};
    if (!formData.name?.trim()) err.name = 'Full name is required.';
    const jobTitleVal = formData.jobTitle === 'Other' ? formData.jobTitleOther : formData.jobTitle;
    if (!jobTitleVal?.trim()) err.jobTitle = 'Job title is required.';
    if (!formData.phone?.trim()) err.phone = 'Phone is required.';
    const phoneRegex = /^[\d\s+\-().]{10,}$/;
    if (formData.phone?.trim() && !phoneRegex.test(formData.phone.replace(/\s/g, ''))) err.phone = 'Enter a valid phone number.';
    if (!formData.email?.trim()) err.email = 'Email is required.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email?.trim() && !emailRegex.test(formData.email)) err.email = 'Enter a valid email address.';
    if (!formData.location?.trim()) err.location = 'Location is required.';
    if (!formData.profile?.trim()) err.profile = 'Profile summary is required.';
    const hasSkill = formData.skills?.some(s => s?.trim());
    if (!hasSkill) err.skills = 'Add at least one skill.';
    formData.workExperience?.forEach((job, i) => {
      if (!job.startDate?.trim()) err[`work_${i}_startDate`] = 'Start date is required.';
      if (!job.endDate?.trim()) err[`work_${i}_endDate`] = 'End date is required.';
      if (!job.company?.trim()) err[`work_${i}_company`] = 'Company is required.';
      if (!job.jobLocation?.trim()) err[`work_${i}_jobLocation`] = 'Job location is required.';
      if (!job.position?.trim()) err[`work_${i}_position`] = 'Position is required.';
    });
    formData.education?.forEach((edu, i) => {
      const degreeVal = edu.degree === 'Other' ? edu.degreeOther : edu.degree;
      if (!degreeVal?.trim()) err[`edu_${i}_degree`] = 'Degree is required.';
      if (!edu.startYear?.trim()) err[`edu_${i}_startYear`] = 'Start year is required.';
      else {
        const sy = parseInt(edu.startYear, 10);
        if (!isNaN(sy) && (sy < 1950 || sy > 2030)) err[`edu_${i}_startYear`] = 'Enter a valid year (1950–2030).';
      }
      if (!edu.endYear?.trim()) err[`edu_${i}_endYear`] = 'End year is required.';
      else {
        const ey = parseInt(edu.endYear, 10);
        if (!isNaN(ey) && (ey < 1950 || ey > 2030)) err[`edu_${i}_endYear`] = 'Enter a valid year (1950–2030).';
      }
    });
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const buildPayload = () => {
    const jobTitle = formData.jobTitle === 'Other' ? formData.jobTitleOther : formData.jobTitle;
    const education = (formData.education || []).map(edu => ({
      degree: edu.degree === 'Other' ? edu.degreeOther : edu.degree,
      startYear: edu.startYear,
      endYear: edu.endYear
    }));
    return {
      ...formData,
      jobTitle,
      education,
      photoDataUrl: photoDataUrl || undefined
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!validateForm()) {
      setMessage('Please fix the errors below.');
      return;
    }
    setLoading(true);

    const apiBase = process.env.REACT_APP_API_URL || '';

    try {
      const payload = buildPayload();
      const response = await axios.post(`${apiBase}/api/generate-resume`, payload);

      if (response.data.success) {
        setMessage('Resume generated successfully!');
        const downloadPath = response.data.downloadUrl;
        const fullUrl = downloadPath.startsWith('http') ? downloadPath : `${apiBase || window.location.origin}${downloadPath}`;
        const pdfResponse = await axios.get(fullUrl, { responseType: 'blob' });
        const blob = new Blob([pdfResponse.data], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `resume_${Date.now()}.pdf`;
        link.click();
        URL.revokeObjectURL(blobUrl);
      }
    } catch (error) {
      setMessage('Error generating resume. Please try again.');
      console.error('Error:', error); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#/" role="button" onClick={(e) => e.preventDefault()}><i className="fas fa-bars" /></a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <span className="nav-link font-weight-bold">Resume Builder</span>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <button type="button" className="btn btn-sm btn-outline-primary" onClick={handleAutoFill}>
              <i className="fas fa-magic mr-1" /> Auto-fill sample
            </button>
          </li>
        </ul>
      </nav>

      {/* Sidebar */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="#/" className="brand-link text-center" onClick={(e) => e.preventDefault()}>
          <i className="fas fa-file-pdf fa-2x text-white" />
          <span className="brand-text font-weight-light ml-2">Resume Builder</span>
        </a>
        <div className="sidebar">
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" role="menu">
              <li className="nav-item">
                <a href="#form" className="nav-link active">
                  <i className="nav-icon fas fa-edit" />
                  <p>Build Resume</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="#form" className="nav-link">
                  <i className="nav-icon fas fa-palette" />
                  <p>Choose Theme</p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Content */}
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Build Your Resume</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#!">Home</a></li>
                  <li className="breadcrumb-item active">Resume Builder</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">
            <form onSubmit={handleSubmit} id="form">
              {/* Theme Selection */}
              <div className="card card-primary card-outline">
                <div className="card-header">
                  <h3 className="card-title"><i className="fas fa-palette mr-2" />Resume Theme</h3>
                </div>
                <div className="card-body">
                  <p className="text-muted mb-3">Choose a visual style for your PDF resume.</p>
                  <div className="row">
                    {themeList.map((t) => (
                      <div key={t.id} className="col-md-4 col-lg-2 mb-2">
                        <label className={`d-block card card-outline ${formData.theme === t.id ? 'card-primary' : 'card-secondary'} mb-0 h-100 cursor-pointer`} style={{ cursor: 'pointer' }}>
                          <input
                            type="radio"
                            name="theme"
                            value={t.id}
                            checked={formData.theme === t.id}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className="card-body py-3">
                            <strong className="d-block">{t.name}</strong>
                            <small className="text-muted d-block mt-1">{t.description}</small>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-top">
                    <label className="d-block mb-2"><i className="fas fa-palette mr-2 text-muted" />Theme accent color</label>
                    <div className="d-flex align-items-center flex-wrap gap-2">
                      <input
                        type="color"
                        value={formData.themeColor || '#0d9488'}
                        onChange={(e) => setFormData({ ...formData, themeColor: e.target.value })}
                        className="rounded border p-1"
                        style={{ width: 40, height: 40, cursor: 'pointer' }}
                        title="Pick accent color"
                      />
                      <span className="text-muted small">{formData.themeColor || '#0d9488'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
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
                          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                          {errors.name && <span className="invalid-feedback d-block">{errors.name}</span>}
                        </div>
                        <div className="col-md-6 form-group">
                          <label>Job Title *</label>
                          <select name="jobTitle" value={formData.jobTitle} onChange={handleChange} className={`form-control ${errors.jobTitle ? 'is-invalid' : ''}`}>
                            <option value="">Select job title</option>
                            {JOB_TITLES.map((title) => <option key={title} value={title}>{title}</option>)}
                          </select>
                          {formData.jobTitle === 'Other' && <input type="text" name="jobTitleOther" value={formData.jobTitleOther} onChange={handleChange} placeholder="Specify" className="form-control mt-1" />}
                          {errors.jobTitle && <span className="invalid-feedback d-block">{errors.jobTitle}</span>}
                        </div>
                        <div className="col-md-6 form-group">
                          <label>Phone *</label>
                          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 8900" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} />
                          {errors.phone && <span className="invalid-feedback d-block">{errors.phone}</span>}
                        </div>
                        <div className="col-md-6 form-group">
                          <label>Email *</label>
                          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@email.com" className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                          {errors.email && <span className="invalid-feedback d-block">{errors.email}</span>}
                        </div>
                        <div className="col-12 form-group">
                          <label>Location *</label>
                          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="City, Country" className={`form-control ${errors.location ? 'is-invalid' : ''}`} />
                          {errors.location && <span className="invalid-feedback d-block">{errors.location}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile */}
              <div className="card card-primary card-outline">
                <div className="card-header">
                  <h3 className="card-title"><i className="fas fa-align-left mr-2" />Professional Profile</h3>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label>Profile Summary *</label>
                    <textarea name="profile" value={formData.profile} onChange={handleChange} rows={4} placeholder="Brief professional summary..." className={`form-control ${errors.profile ? 'is-invalid' : ''}`} />
                    {errors.profile && <span className="invalid-feedback d-block">{errors.profile}</span>}
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="card card-primary card-outline">
                <div className="card-header">
                  <h3 className="card-title"><i className="fas fa-tasks mr-2" />Skills</h3>
                </div>
                <div className="card-body">
                  {errors.skills && <span className="text-danger small d-block mb-2">{errors.skills}</span>}
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="input-group mb-2">
                      <input type="text" value={skill} onChange={(e) => handleSkillChange(index, e.target.value)} placeholder="Skill" className="form-control" />
                      {formData.skills.length > 1 && <div className="input-group-append"><button type="button" className="btn btn-outline-danger" onClick={() => removeSkill(index)}><i className="fas fa-times" /></button></div>}
                    </div>
                  ))}
                  <button type="button" className="btn btn-sm btn-outline-primary" onClick={addSkill}><i className="fas fa-plus mr-1" /> Add Skill</button>
                </div>
              </div>

              {/* Work Experience */}
              <div className="card card-primary card-outline">
                <div className="card-header">
                  <h3 className="card-title"><i className="fas fa-briefcase mr-2" />Work Experience</h3>
                </div>
                <div className="card-body">
            {formData.workExperience.map((job, jobIndex) => (
              <div key={jobIndex} className="border rounded p-3 mb-3 bg-light">
                <h6 className="text-primary mb-2">Job {jobIndex + 1}</h6>
                <div className="row">
                  <div className="col-md-3 form-group mb-2">
                    <label className="small">Start Date *</label>
                    <input type="text" value={job.startDate} onChange={(e) => handleWorkExperienceChange(jobIndex, 'startDate', e.target.value)} placeholder="Jan 2020" className={`form-control form-control-sm ${errors[`work_${jobIndex}_startDate`] ? 'is-invalid' : ''}`} />
                    {errors[`work_${jobIndex}_startDate`] && <span className="invalid-feedback d-block">{errors[`work_${jobIndex}_startDate`]}</span>}
                  </div>
                  <div className="col-md-3 form-group mb-2">
                    <label className="small">End Date *</label>
                    <input type="text" value={job.endDate} onChange={(e) => handleWorkExperienceChange(jobIndex, 'endDate', e.target.value)} placeholder="Present" className={`form-control form-control-sm ${errors[`work_${jobIndex}_endDate`] ? 'is-invalid' : ''}`} />
                    {errors[`work_${jobIndex}_endDate`] && <span className="invalid-feedback d-block">{errors[`work_${jobIndex}_endDate`]}</span>}
                  </div>
                  <div className="col-md-6 form-group mb-2">
                    <label className="small">Company *</label>
                    <input type="text" value={job.company} onChange={(e) => handleWorkExperienceChange(jobIndex, 'company', e.target.value)} placeholder="Company" className={`form-control form-control-sm ${errors[`work_${jobIndex}_company`] ? 'is-invalid' : ''}`} />
                    {errors[`work_${jobIndex}_company`] && <span className="invalid-feedback d-block">{errors[`work_${jobIndex}_company`]}</span>}
                  </div>
                  <div className="col-md-6 form-group mb-2">
                    <label className="small">Job Location *</label>
                    <input type="text" value={job.jobLocation} onChange={(e) => handleWorkExperienceChange(jobIndex, 'jobLocation', e.target.value)} placeholder="City, Country" className={`form-control form-control-sm ${errors[`work_${jobIndex}_jobLocation`] ? 'is-invalid' : ''}`} />
                    {errors[`work_${jobIndex}_jobLocation`] && <span className="invalid-feedback d-block">{errors[`work_${jobIndex}_jobLocation`]}</span>}
                  </div>
                  <div className="col-md-6 form-group mb-2">
                    <label className="small">Position *</label>
                    <select value={job.position} onChange={(e) => handleWorkExperienceChange(jobIndex, 'position', e.target.value)} className={`form-control form-control-sm ${errors[`work_${jobIndex}_position`] ? 'is-invalid' : ''}`}>
                      <option value="">Select</option>
                      {JOB_TITLES.map((title) => <option key={title} value={title}>{title}</option>)}
                    </select>
                    {errors[`work_${jobIndex}_position`] && <span className="invalid-feedback d-block">{errors[`work_${jobIndex}_position`]}</span>}
                  </div>
                </div>
                <div className="form-group mb-2">
                  <label className="small">Responsibilities</label>
                  {job.description.map((desc, descIndex) => (
                    <div key={descIndex} className="input-group input-group-sm mb-1">
                      <textarea value={desc} onChange={(e) => handleWorkDescriptionChange(jobIndex, descIndex, e.target.value)} placeholder="Bullet point" rows={2} className="form-control" />
                      {job.description.length > 1 && <div className="input-group-append"><button type="button" className="btn btn-outline-danger" onClick={() => removeWorkDescription(jobIndex, descIndex)}><i className="fas fa-times" /></button></div>}
                    </div>
                  ))}
                  <button type="button" className="btn btn-xs btn-outline-secondary mt-1" onClick={() => addWorkDescription(jobIndex)}><i className="fas fa-plus mr-1" /> Add line</button>
                </div>
                {formData.workExperience.length > 1 && <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeWorkExperience(jobIndex)}><i className="fas fa-trash mr-1" /> Remove job</button>}
              </div>
            ))}
                  <button type="button" className="btn btn-outline-primary" onClick={addWorkExperience}><i className="fas fa-plus mr-1" /> Add Work Experience</button>
                </div>
              </div>

              {/* Education */}
              <div className="card card-primary card-outline">
                <div className="card-header">
                  <h3 className="card-title"><i className="fas fa-graduation-cap mr-2" />Education</h3>
                </div>
                <div className="card-body">
            {formData.education.map((edu, index) => (
              <div key={index} className="border rounded p-3 mb-3 bg-light">
                <div className="row">
                  <div className="col-md-5 form-group mb-2">
                    <label className="small">Degree *</label>
                    <select value={edu.degree} onChange={(e) => handleEducationChange(index, 'degree', e.target.value)} className={`form-control form-control-sm ${errors[`edu_${index}_degree`] ? 'is-invalid' : ''}`}>
                      <option value="">Select</option>
                      {DEGREES.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                    {edu.degree === 'Other' && <input type="text" value={edu.degreeOther || ''} onChange={(e) => handleEducationChange(index, 'degreeOther', e.target.value)} placeholder="Specify" className="form-control form-control-sm mt-1" />}
                    {errors[`edu_${index}_degree`] && <span className="invalid-feedback d-block">{errors[`edu_${index}_degree`]}</span>}
                  </div>
                  <div className="col-md-2 form-group mb-2">
                    <label className="small">Start Year *</label>
                    <input type="text" value={edu.startYear} onChange={(e) => handleEducationChange(index, 'startYear', e.target.value)} placeholder="2015" maxLength={4} className={`form-control form-control-sm ${errors[`edu_${index}_startYear`] ? 'is-invalid' : ''}`} />
                    {errors[`edu_${index}_startYear`] && <span className="invalid-feedback d-block">{errors[`edu_${index}_startYear`]}</span>}
                  </div>
                  <div className="col-md-2 form-group mb-2">
                    <label className="small">End Year *</label>
                    <input type="text" value={edu.endYear} onChange={(e) => handleEducationChange(index, 'endYear', e.target.value)} placeholder="2019" maxLength={4} className={`form-control form-control-sm ${errors[`edu_${index}_endYear`] ? 'is-invalid' : ''}`} />
                    {errors[`edu_${index}_endYear`] && <span className="invalid-feedback d-block">{errors[`edu_${index}_endYear`]}</span>}
                  </div>
                  <div className="col-md-2 form-group mb-2 d-flex align-items-end">
                    {formData.education.length > 1 && <button type="button" className="btn btn-sm btn-outline-danger btn-block" onClick={() => removeEducation(index)}><i className="fas fa-trash" /></button>}
                  </div>
                </div>
              </div>
            ))}
                  <button type="button" className="btn btn-outline-primary" onClick={addEducation}><i className="fas fa-plus mr-1" /> Add Education</button>
                </div>
              </div>

              {/* Languages */}
              <div className="card card-primary card-outline">
                <div className="card-header">
                  <h3 className="card-title"><i className="fas fa-language mr-2" />Languages</h3>
                </div>
                <div className="card-body">
            {formData.languages.map((lang, index) => (
              <div key={index} className="row align-items-end mb-2">
                <div className="col-md-4 form-group mb-0">
                  <label className="small">Language</label>
                  <input type="text" value={lang.language} onChange={(e) => handleLanguageChange(index, 'language', e.target.value)} placeholder="English" className="form-control form-control-sm" />
                </div>
                <div className="col-md-4 form-group mb-0">
                  <label className="small">Proficiency</label>
                  <select value={lang.proficiency} onChange={(e) => handleLanguageChange(index, 'proficiency', e.target.value)} className="form-control form-control-sm">
                    <option value="">Select</option>
                    {PROFICIENCY_LEVELS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                {formData.languages.length > 1 && <div className="col-md-2"><button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeLanguage(index)}><i className="fas fa-times" /></button></div>}
              </div>
            ))}
                  <button type="button" className="btn btn-outline-primary" onClick={addLanguage}><i className="fas fa-plus mr-1" /> Add Language</button>
                </div>
              </div>

              {/* Submit */}
              <div className="card">
                <div className="card-body">
                  <button type="submit" className="btn btn-primary btn-lg px-4" disabled={loading}>
                    {loading ? <><i className="fas fa-spinner fa-spin mr-2" />Generating...</> : <><i className="fas fa-file-pdf mr-2" />Generate Resume PDF</>}
                  </button>
                  {message && (
                    <div className={`alert mt-3 mb-0 ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
                      {message}
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
