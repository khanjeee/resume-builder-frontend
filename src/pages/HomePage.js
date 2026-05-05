import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { useAuth } from '../context/AuthContext';

import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Sidebar from '../components/Layout/Sidebar';

import PersonalInfoForm from '../components/Forms/PersonalInfoForm';
import EducationForm from '../components/Forms/EducationForm';
import WorkExperienceForm from '../components/Forms/WorkExperienceForm';
import SkillsForm from '../components/Forms/SkillsForm';
import LanguagesForm from '../components/Forms/LanguagesForm';

import html2pdf from 'html2pdf.js';

function HomePage() {
  const { logout } = useAuth();
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      portfolio: '',
      address: '',
      bio: '',
      themeColor: '#0d9488', // Default theme color
    },
    education: [],
    workExperience: [],
    skills: [],
    languages: [],
    theme: 'modern',
  });

  const [photoDataUrl, setPhotoDataUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [themeList, setThemeList] = useState([]);

  useEffect(() => {
    // Fetch themes from backend
    const fetchThemes = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/themes');
        if (response.data && Array.isArray(response.data.themes) && response.data.themes.length > 0) {
          setThemeList(response.data.themes);
        } else {
          console.warn('API returned empty or invalid theme list, using default themes.');
          setThemeList([
            { name: 'modern', displayName: 'Modern' },
            { name: 'classic', displayName: 'Classic' },
            { name: 'elegant', displayName: 'Elegant' },
          ]);
        }
      } catch (error) {
        console.error('Error fetching themes:', error);
      }
    };
    fetchThemes();
  }, []);

  const handleChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleSkillChange = (index, field, value) => {
    const newSkills = [...formData.skills];
    newSkills[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      skills: newSkills,
    }));
  };

  const addSkill = () => {
    setFormData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, { name: '', level: 'Beginner' }],
    }));
  };

  const removeSkill = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((_, i) => i !== index),
    }));
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const newWorkExperience = [...formData.workExperience];
    newWorkExperience[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      workExperience: newWorkExperience,
    }));
  };

  const handleWorkDescriptionChange = (workIndex, descIndex, value) => {
    const newWorkExperience = [...formData.workExperience];
    newWorkExperience[workIndex].description[descIndex] = value;
    setFormData((prevData) => ({
      ...prevData,
      workExperience: newWorkExperience,
    }));
  };

  const addWorkExperience = () => {
    setFormData((prevData) => ({
      ...prevData,
      workExperience: [...prevData.workExperience, { title: '', company: '', years: '', description: [''] }],
    }));
  };

  const removeWorkExperience = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      workExperience: prevData.workExperience.filter((_, i) => i !== index),
    }));
  };

  const addWorkDescription = (workIndex) => {
    const newWorkExperience = [...formData.workExperience];
    newWorkExperience[workIndex].description.push('');
    setFormData((prevData) => ({
      ...prevData,
      workExperience: newWorkExperience,
    }));
  };

  const removeWorkDescription = (workIndex, descIndex) => {
    const newWorkExperience = [...formData.workExperience];
    newWorkExperience[workIndex].description = newWorkExperience[workIndex].description.filter(
      (_, i) => i !== descIndex
    );
    setFormData((prevData) => ({
      ...prevData,
      workExperience: newWorkExperience,
    }));
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      education: newEducation,
    }));
  };

  const addEducation = () => {
    setFormData((prevData) => ({
      ...prevData,
      education: [...prevData.education, { degree: '', university: '', year: '', description: '', }],
    }));
  };

  const removeEducation = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      education: prevData.education.filter((_, i) => i !== index),
    }));
  };

  const handleLanguageChange = (index, field, value) => {
    const newLanguages = [...formData.languages];
    newLanguages[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      languages: newLanguages,
    }));
  };

  const addLanguage = () => {
    setFormData((prevData) => ({
      ...prevData,
      languages: [...prevData.languages, { name: '', level: 'Beginner' }],
    }));
  };

  const removeLanguage = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      languages: prevData.languages.filter((_, i) => i !== index),
    }));
  };

  const handleAutoFill = () => {
    setFormData({
      personalInfo: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        linkedin: 'linkedin.com/in/johndoe',
        github: 'github.com/johndoe',
        portfolio: 'johndoe.com',
        address: '123 Main St, Anytown USA',
        bio: 'Highly motivated software engineer with 5 years of experience in full-stack development. Passionate about creating innovative solutions and improving user experiences. Seeking a challenging role to leverage my skills and contribute to impactful projects.',
      },
      education: [
        { degree: 'M.Sc. Computer Science', university: 'Tech University', year: '2020', description: 'Specialized in AI and Machine Learning.' },
        { degree: 'B.Sc. Software Engineering', university: 'State University', year: '2018', description: 'Graduated with honors.' },
      ],
      workExperience: [
        {
          title: 'Senior Software Engineer',
          company: 'Innovate Corp',
          years: '2022 - Present',
          description: [
            'Developed and maintained full-stack applications using React, Node.js, and PostgreSQL.',
            'Led a team of 3 junior developers, mentoring them in best practices and code reviews.',
            'Implemented a new microservices architecture, improving system scalability by 40%.',
          ],
        },
        {
          title: 'Software Engineer',
          company: 'Evolve Inc',
          years: '2018 - 2022',
          description: [
            'Built and optimized RESTful APIs for various client projects.',
            'Collaborated with product teams to translate business requirements into technical specifications.',
            'Contributed to the design and implementation of CI/CD pipelines.',
          ],
        },
      ],
      skills: [
        { name: 'JavaScript', level: 'Expert' },
        { name: 'React', level: 'Expert' },
        { name: 'Node.js', level: 'Advanced' },
        { name: 'PostgreSQL', level: 'Advanced' },
        { name: 'Python', level: 'Intermediate' },
        { name: 'AWS', level: 'Intermediate' },
      ],
      languages: [
        { name: 'English', level: 'Native' },
        { name: 'Spanish', level: 'Intermediate' },
      ],
      theme: 'modern',
    });
    setPhotoDataUrl(null);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoDataUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.personalInfo.name) newErrors.name = 'Name is required';
    if (!formData.personalInfo.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.personalInfo.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.personalInfo.phone) newErrors.phone = 'Phone is required';

    formData.education.forEach((edu, index) => {
      if (!edu.degree) newErrors[`educationDegree${index}`] = 'Degree is required';
      if (!edu.university) newErrors[`educationUniversity${index}`] = 'University is required';
      if (!edu.year) newErrors[`educationYear${index}`] = 'Year is required';
    });

    formData.workExperience.forEach((work, index) => {
      if (!work.title) newErrors[`workTitle${index}`] = 'Job Title is required';
      if (!work.company) newErrors[`workCompany${index}`] = 'Company is required';
      if (!work.years) newErrors[`workYears${index}`] = 'Years of experience is required';
      if (work.description.every(desc => !desc)) newErrors[`workDescription${index}`] = 'At least one description is required';
    });

    formData.skills.forEach((skill, index) => {
      if (!skill.name) newErrors[`skillName${index}`] = 'Skill name is required';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const buildPayload = () => {
      const payload = {
        name: formData.personalInfo.name || '',
        jobTitle: formData.personalInfo.jobTitle || '', // Assuming jobTitle is part of personalInfo
        phone: formData.personalInfo.phone || '',
        email: formData.personalInfo.email || '',
        location: formData.personalInfo.address || '', // Assuming address maps to location
        profile: formData.personalInfo.bio || '', // Assuming bio maps to profile
        education: formData.education.map(edu => ({
          degree: edu.degree || '',
          university: edu.university || '',
          year: edu.year || '',
          description: edu.description || '',
        })),
        workExperience: formData.workExperience,
        skills: formData.skills.map(skill => skill.name || ''), // Extracting only skill names
        languages: formData.languages.map(lang => ({
          language: lang.name || '',
          proficiency: lang.level || '',
        })),
        theme: formData.theme || 'modern',
        photoDataUrl: photoDataUrl || '', // Base64 image data
        themeColor: formData.personalInfo.themeColor || '#0d9488', // Assuming themeColor is part of personalInfo
      };
      return payload;
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!validateForm()) {
      setMessage('Please correct the errors in the form.');
      return;
    }

    setLoading(true);
    try {
      const payload = buildPayload();
      const token = localStorage.getItem('token');

      const response = await axios.post('http://localhost:5001/api/generate-resume', payload, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        responseType: 'arraybuffer', // Important for handling PDF
      });

      const responseData = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(response.data)));
      const downloadUrl = responseData.downloadUrl;
      if (downloadUrl) {
        // Construct the full URL for download
        const fullDownloadUrl = `http://localhost:5001${downloadUrl}`;
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = fullDownloadUrl;
        link.setAttribute('download', `${formData.personalInfo.name || 'resume'}.pdf`); // You can set a dynamic name if available in response
        document.body.appendChild(link);
        link.click();
        link.remove();
        setMessage('Resume generated successfully!');
      } else {
        setMessage('Error: Download URL not received.');
        return; // Stop execution if no downloadUrl
      }
    } catch (error) {
      console.error('Error generating resume:', error);
      if (error.response && error.response.status === 401) {
        setMessage('Authentication failed. Please log in again.');
        logout(); // Log out user on 401 error
      } else if (error.response && error.response.data) {
        const errorData = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(error.response.data)));
        setMessage(`Error: ${errorData.message || 'An unexpected error occurred.'}`);
      } else {
        setMessage('An error occurred while generating the resume.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <Header handleLogout={logout} />
      <Sidebar />
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Resume Builder</h1>
              </div>
            </div>
          </div>
        </section>

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">Fill your Resume Details</h3>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="card-body">
                      {message && (
                        <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>
                          {message}
                        </div>
                      )}
                      <PersonalInfoForm
                        personalInfo={formData.personalInfo}
                        handleChange={(field, value) => handleChange('personalInfo', field, value)}
                        photoDataUrl={photoDataUrl}
                        handlePhotoChange={handlePhotoChange}
                        errors={errors}
                      />
                      <EducationForm
                        education={formData.education}
                        handleChange={handleEducationChange}
                        addEducation={addEducation}
                        removeEducation={removeEducation}
                        errors={errors}
                      />
                      <WorkExperienceForm
                        workExperience={formData.workExperience}
                        handleChange={handleWorkExperienceChange}
                        handleDescriptionChange={handleWorkDescriptionChange}
                        addWorkExperience={addWorkExperience}
                        removeWorkExperience={removeWorkExperience}
                        addWorkDescription={addWorkDescription}
                        removeWorkDescription={removeWorkDescription}
                        errors={errors}
                      />
                      <SkillsForm
                        skills={formData.skills}
                        handleChange={handleSkillChange}
                        addSkill={addSkill}
                        removeSkill={removeSkill}
                        errors={errors}
                      />
                      <LanguagesForm
                        languages={formData.languages}
                        handleChange={handleLanguageChange}
                        addLanguage={addLanguage}
                        removeLanguage={removeLanguage}
                        errors={errors}
                      />
                      <div className="form-group">
                        <label htmlFor="themeSelect">Select Theme</label>
                        <select
                          className="form-control"
                          id="themeSelect"
                          value={formData.theme}
                          onChange={(e) => setFormData(prevData => ({ ...prevData, theme: e.target.value }))}
                        >
                          {themeList.map((themeOption) => (
                            <option key={themeOption.id} value={themeOption.id}>
                              {themeOption.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleAutoFill}
                      >
                        Auto Fill Form
                      </button>
                      <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Generating...' : 'Generate Resume'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
