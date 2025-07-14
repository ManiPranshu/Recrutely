import { React, useState } from "react";
import "./ProfilePage.css";
import { FaCamera, FaTrash, FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

import SkillModal from "../../components/SkillModal"; 
import ExperienceModal from "../../components/ExperienceModal";
import EducationModal from "../../components/EducationModal"; 

const ProfilePage = () => {

  const navigate = useNavigate(); // Initialize useNavigate for navigation  
  
  const skillArray = [];

  const [skills, setSkills] = useState(skillArray);
  const [newSkill, setNewSkill] = useState(""); // For input field
  const [showSkillModal, setShowSkillModal] = useState(false);

  const removeSkill = (indexToRemove) => {
    setSkills((prevSkills) =>
      prevSkills.filter((_, index) => index !== indexToRemove)
    );
  };

  // Accepts an array of selected skills from the modal
  const addSkill = (newSkills) => {
    const uniqueSkills = newSkills.filter((skill) => !skills.includes(skill));
    setSkills([...skills, ...uniqueSkills]);
  };





const [experiences, setExperiences] = useState([]);
const [showExperienceModal, setShowExperienceModal] = useState(false);
const [editingExperience, setEditingExperience] = useState(null); // For editing


const addExperience = (newExp) => {
  setExperiences((prev) => [...prev, newExp]);
};


const [educationList, setEducationList] = useState([]);
const [showEducationModal, setShowEducationModal] = useState(false);
const [editingEducationIndex, setEditingEducationIndex] = useState(null);

const addEducation = (newEducation) => {
  setEducationList((prev) => [...prev, newEducation]);
};



  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <button className="go-back-btn" onClick={() => navigate(-1)}>← Go Back</button>
        <h2>Profile Page</h2>
        <p>Manage your personal information and credentials</p>
      </div>

      {/* Profile Photo Section */}
      <div className="profile-photo-section">
        <p>Profile Picture</p>
        <div className="profile-photo-box">
          <div className="photo-placeholder">
            <FaCamera className="camera-icon" />
          </div>

          <input
            type="file"
            id="photo-upload"
            className="file-input"
            accept=".png,.jpg,.jpeg"
            style={{ display: "none" }} // hide the actual input
          />

          <label htmlFor="photo-upload" className="upload-photo-btn">
            📤 Upload Photo
          </label>

          <p className="recommend">Recommended 300x300 px</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="section">
        <h3>Personal Information</h3>
        <div className="info-grid">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="email" placeholder="Email Address" />
          <input type="tel" placeholder="Phone Number" />
          <input type="text" placeholder="Location" />
        </div>
      </div>

      {/* Skills Section */}
      <div className="section">
        <div className="section-header">
          <h3>Skills</h3>
          <button className="add-btn" onClick={() => setShowSkillModal(true)}>
            + Add Skill
          </button>
        </div>

        <div className="skills-box">
          {skills.map((skill, index) => (
            <span key={index} className="skill-pill">
              {skill}
              <span className="remove-skill" onClick={() => removeSkill(index)}>
                ×
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Skill Modal */}
      {showSkillModal && (
        <SkillModal
          onClose={() => setShowSkillModal(false)}
          onAddSkill={addSkill}
        />
      )}

      {/* Experience */}
      <div className="section">
  <div className="section-header">
    <h3>Experience</h3>
    <button className="add-btn" onClick={() => { setEditingExperience(null); setShowExperienceModal(true); }}>
      + Add Experience
    </button>
  </div>

  {experiences.map((exp, i) => (
    <div key={exp.id} className="experience-box">
      <strong>{exp.role}</strong>
      <p>{exp.company}</p>
      <p>{exp.duration}</p>
      <p>{exp.description}</p>
      <div className="action-icons">
        <FaPen onClick={() => { setEditingExperience(exp); setShowExperienceModal(true); }} />
        <FaTrash onClick={() => setExperiences(experiences.filter(e => e.id !== exp.id))} />
      </div>
    </div>
  ))}
</div>


{showExperienceModal && (
  <ExperienceModal
    onClose={() => setShowExperienceModal(false)}
    existingData={editingExperience}
    onSave={(data) => {
      if (editingExperience) {
        setExperiences(experiences.map(exp => exp.id === data.id ? data : exp));
      } else {
        setExperiences([...experiences, data]);
      }
    }}
  />
)}



      {/* Education */}
      <div className="section">
  <div className="section-header">
    <h3>Education</h3>
    <button className="add-btn" onClick={() => {
      setEditingEducationIndex(null);
      setShowEducationModal(true);
    }}>
      + Add Education
    </button>
  </div>

  {educationList.map((edu, i) => (
    <div key={i} className="experience-box">
      <strong>{edu.degree}</strong>
      <p>{edu.institution}</p>
      <p>{edu.duration}</p>
      <p>{edu.description}</p>
      <div className="action-icons">
        <FaPen onClick={() => {
          setEditingEducationIndex(i);
          setShowEducationModal(true);
        }} />
        <FaTrash onClick={() => {
          setEducationList((prev) => prev.filter((_, idx) => idx !== i));
        }} />
      </div>
    </div>
  ))}
</div>

{showEducationModal && (
  <EducationModal
    onClose={() => setShowEducationModal(false)}
    initialData={editingEducationIndex !== null ? educationList[editingEducationIndex] : null}
    onSave={(data) => {
      setEducationList((prev) => {
        if (editingEducationIndex !== null) {
          const updated = [...prev];
          updated[editingEducationIndex] = data;
          return updated;
        }
        return [...prev, data];
      });
    }}
  />
)}

      {/* Resume Upload Section */}
      <div className="section resume-section">
        <div className="resume-upload">
          <p className="label">Resume</p>
          <div className="upload-box">
            <p>
              Drag and drop your resume
              <br />
              or click to browse
            </p>
            <button className="upload-button">Upload Resume</button>
            <small>PDF, DOCX (Max 5MB)</small>
          </div>
        </div>
        <div className="uploaded-resume">
          <div className="resume-file">
            <span>📄</span>
            <div>
              <p className="resume-name">resume_john_doe.pdf</p>
              <p className="resume-meta">1.2 MB - Uploaded on May 15, 2023</p>
            </div>
            <div className="resume-actions">
              <button>⬇️</button>
              <button>🗑️</button>
            </div>
          </div>
        </div>
      </div>

      <button className="save-btn">Save Changes</button>
    </div>
  );
};

export default ProfilePage;
