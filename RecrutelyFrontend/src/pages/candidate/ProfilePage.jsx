import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { FaCamera, FaTrash, FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import SkillModal from "../../components/SkillModal"; 
import ExperienceModal from "../../components/ExperienceModal";
import EducationModal from "../../components/EducationModal"; 
import ResumeSection from "../../components/ResumeSection"; 

const ProfilePage = () => {
  const navigate = useNavigate();

  // Personal info states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  // Profile and loading/error states
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  // File upload states
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState(null);

  const [resumeFile, setResumeFile] = useState(null);
  const [uploadedResumeUrl, setUploadedResumeUrl] = useState(null);
  const [resumePreviewUrl, setResumePreviewUrl] = useState(null);

  // Skills, experience, education
  const [skills, setSkills] = useState([]);
  const [showSkillModal, setShowSkillModal] = useState(false);

  const [experiences, setExperiences] = useState([]);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);

  const [educationList, setEducationList] = useState([]);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [editingEducationIndex, setEditingEducationIndex] = useState(null);

  // Save state
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const [resumes, setResumes] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:3000/api/profile/resumes")
        .then((res) => res.json())
        .then((data) => setResumes(data))
        .catch((err) => console.error("Error fetching resumes:", err));
    }, []);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);

        // Set personal info fields
        setFirstName(res.data.first_name || "");
        setLastName(res.data.last_name || "");
        setEmail(res.data.email || "");
        setPhone(res.data.phone || "");
        setLocation(res.data.location || "");

        // Set skills, experience, education if available
        setSkills(res.data.skills || []);
        setExperiences(res.data.experience || []);
        setEducationList(res.data.education || []);

        // Set uploaded photo/resume if available
        if (res.data.profile_photo_url) setUploadedPhotoUrl(res.data.profile_photo_url);
        if (res.data.resume_url) setUploadedResumeUrl(res.data.resume_url);
      } catch (err) {
        setError("Failed to load profile");
        console.error("Error fetching profile", err);
      }
    };

    fetchProfile();
  }, []);

  

  // Upload file to backend (Cloudinary)
  const handleFileUpload = async (file, type) => {
    const formData = new FormData();
    formData.append("file", file);

    const endpoint = type === "photo" ? "photo" : "resume";

    try {
      const res = await fetch(`http://localhost:3000/api/upload/${endpoint}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      return data.url;
    } catch (error) {
      console.error(`${type} Upload Error:`, error);
      return null;
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    // Upload files if selected
    let profilePhotoUrl = uploadedPhotoUrl;
    let resumeUrl = uploadedResumeUrl;

    if (profilePhotoFile) {
      profilePhotoUrl = await handleFileUpload(profilePhotoFile, "photo");
      setUploadedPhotoUrl(profilePhotoUrl);
    }
    if (resumeFile) {
      resumeUrl = await handleFileUpload(resumeFile, "resume");
      setUploadedResumeUrl(resumeUrl);
      setResumePreviewUrl(resumeUrl.replace(".pdf", ".jpg"));
    }

    const profileData = {
      firstName,
      lastName,
      email,
      phone,
      location,
      skills,
      experience: experiences,
      education: educationList,
      profilePhotoUrl,
      resumeUrl,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const result = await response.json();
      if (response.ok) {
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } else {
        alert(result.message || "❌ Failed to save profile.");
      }
    } catch (error) {
      console.error("❌ Error saving profile:", error);
      alert("❌ Failed to save profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const removeSkill = (indexToRemove) => {
    setSkills((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const addSkill = (newSkills) => {
    const uniqueSkills = newSkills.filter((s) => !skills.includes(s));
    setSkills([...skills, ...uniqueSkills]);
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!profile) return <p>Loading...</p>;

  // Format date as "Mon YYYY"
function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleString("default", { month: "short", year: "numeric" });
}

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
          {uploadedPhotoUrl ? (
            <img src={uploadedPhotoUrl} alt="Profile" className="profile-preview-img-p" />
          ) : (
            <div className="photo-placeholder">
              <FaCamera className="camera-icon" />
            </div>
          )}

          <input
            type="file"
            id="photo-upload"
            className="file-input"
            accept=".png,.jpg,.jpeg"
            style={{ display: "none" }}
            onChange={(e) => setProfilePhotoFile(e.target.files[0])}
          />
          <label htmlFor="photo-upload" className="upload-photo-btn">📤 Upload Photo</label>
          <p className="recommend">Recommended 300x300 px</p>
        </div>
      </div>

      {/* Personal Info */}
      <div className="section">
        <h3>Personal Information</h3>
        <div className="info-grid">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled // usually email shouldn't be editable
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>
      </div>

      {/* Skills */}
      <div className="section">
        <div className="section-header">
          <h3>Skills</h3>
          <button className="add-btn" onClick={() => setShowSkillModal(true)}>+ Add Skill</button>
        </div>
        <div className="skills-box">
          {skills.map((skill, index) => (
            <span key={index} className="skill-pill">
              {skill}
              <span className="remove-skill" onClick={() => removeSkill(index)}>×</span>
            </span>
          ))}
        </div>
        {showSkillModal && (
          <SkillModal onClose={() => setShowSkillModal(false)} onAddSkill={addSkill} />
        )}
      </div>

      {/* Experience */}
      <div className="section">
        <div className="section-header">
          <h3>Experience</h3>
          <button className="add-btn" onClick={() => {
            setEditingExperience(null);
            setShowExperienceModal(true);
          }}>+ Add Experience</button>
        </div>
        {experiences.map((exp, i) => (
          <div key={exp.id || i} className="experience-box">
            <strong>{exp.role}</strong>
            <p>{exp.company}</p>
        <p>
  {exp.start_date
    ? `${formatDate(exp.start_date)} - ${exp.end_date ? formatDate(exp.end_date) : "Present"}`
    : ""}
</p>
            <p>{exp.description}</p>
            <div className="action-icons">
              <FaPen onClick={() => { setEditingExperience(exp); setShowExperienceModal(true); }} />
              <FaTrash onClick={() => setExperiences(experiences.filter((e, idx) => idx !== i))} />
            </div>
          </div>
        ))}
{showExperienceModal && (
  <ExperienceModal
    onClose={() => {
      setShowExperienceModal(false);
      setEditingExperience(null);
    }}
    existingData={editingExperience}
    onSave={(data) => {
      setExperiences((prev) => {
        if (editingExperience) {
          return prev.map(exp => exp.id === data.id ? data : exp);
        }
        return [...prev, { ...data, id: Date.now() }];
      });
      setEditingExperience(null);
    }}
  />
)}
      </div>

      {/* Education */}
      <div className="section">
        <div className="section-header">
          <h3>Education</h3>
          <button className="add-btn" onClick={() => {
            setEditingEducationIndex(null);
            setShowEducationModal(true);
          }}>+ Add Education</button>
        </div>
        {educationList.map((edu, i) => (
          <div key={i} className="experience-box">
            <strong>{edu.degree}</strong>
            <p>{edu.institution}</p>
     <p>
  {edu.start_date
    ? `${formatDate(edu.start_date)} - ${edu.end_date ? formatDate(edu.end_date) : "Present"}`
    : ""}
</p>
            <p>{edu.description}</p>
            <div className="action-icons">
              <FaPen onClick={() => {
                setEditingEducationIndex(i);
                setShowEducationModal(true);
              }} />
              <FaTrash onClick={() => {
                setEducationList(prev => prev.filter((_, idx) => idx !== i));
              }} />
            </div>
          </div>
        ))}
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
      </div>

      {/* Resume Section */}
      <div className="section resume-section">
        <div className="resume-upload">
          <p className="label">Resume</p>
          <div className="upload-box">
            <p>Drag and drop your resume<br />or click to browse</p>
            <input
              type="file"
              id="resume-upload"
              className="file-input"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResumeFile(e.target.files[0])}
            />
            <small>PDF, DOCX (Max 5MB)</small>
          </div>
        </div>
        {/* {uploadedResumeUrl && (
          <div className="uploaded-resume">
            <div className="resume-file">
              <span>📄</span>
              <div>
                <a href={resumePreviewUrl || uploadedResumeUrl} target="_blank" rel="noopener noreferrer">
                  View Resume
                </a>
                <p className="resume-meta">Uploaded just now</p>
              </div>
              <div className="resume-actions">
                <a href={uploadedResumeUrl} download><button>⬇️</button></a>
                <button onClick={() => {
                  setUploadedResumeUrl(null);
                  setResumeFile(null);
                }}>🗑️</button>
              </div>
            </div>
          </div>
        )} */}
        
        
        <ResumeSection />
        
      </div>

      {/* Spinner Overlay */}
      {isSaving && (
        <div className="overlay">
          <div className="spinner"></div>
          <p>Saving your profile...</p>
        </div>
      )}

      {/* Success Banner */}
      {showSuccessMessage && (
        <div className="success-banner">
         ✅ Profile saved successfully!
        </div>
      )}

      <button className="save-btn" onClick={handleSave} disabled={isSaving}>Save Changes</button>
      
    </div>
  );
};

export default ProfilePage;