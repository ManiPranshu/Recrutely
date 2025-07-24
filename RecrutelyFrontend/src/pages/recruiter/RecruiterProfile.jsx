import React, { useState } from "react";
import "./recruiterProfile.css";

const RecruiterProfile = () => {
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);

  const handleAddSkill = () => {
    if (skillInput.trim() !== "") {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setCompanyLogo(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save form data logic
    alert("Profile submitted!");
  };

  const handleReset = () => {
    setSkills([]);
    setSkillInput("");
    setCompanyLogo(null);
    document.getElementById("recruiter-form").reset();
  };

  return (
    <div className="recruiter-profile-container">
      <h2>Recruiter Profile</h2>
      <form onSubmit={handleSubmit} id="recruiter-form">
        {/* Upload Company Logo */}
        <div className="form-group logo-upload">
          <label>Company Logo</label>
          <div
            className="upload-box"
            onClick={() => document.getElementById("logo-input").click()}
          >
            <img
              src="https://img.icons8.com/ios-filled/50/upload-to-cloud.png"
              alt="upload icon"
              className="upload-icon"
            />
            <p>Drag and drop your logo or click to browse</p>
            <button type="button" className="upload-btn">
              Upload Logo
            </button>
            <p className="upload-note">PNG, JPG (Max 5MB)</p>
            <input
              id="logo-input"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
          {companyLogo && (
            <img
              src={companyLogo}
              alt="Company Logo"
              className="company-logo-preview"
            />
          )}
        </div>

        {/* Personal Info */}
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="e.g. John Doe" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="e.g. john@company.com" required />
          </div>
          <div className="form-group">
            <label>Company Name</label>
            <input type="text" placeholder="e.g. ABC Corp" required />
          </div>
          <div className="form-group">
            <label>Company Industry Type</label>
            <input
              type="text"
              placeholder="e.g. Technology Finance etc."
              required
            />
          </div>
          <div className="form-group">
            <label>Company Size</label>
            <input type="text" placeholder="e.g. 10000-20000" required />
          </div>
          <div className="form-group">
            <label>Company Location</label>
            <input type="text" placeholder="e.g. Delhi" required />
          </div>
          <div className="form-group">
            <label>Work Mode</label>
            <input type="text" placeholder="e.g. Remote" required />
          </div>
          <div className="form-group">
            <label>Company Website Link</label>
            <input type="text" placeholder="e.g. www.google.com" required />
          </div>
          <div className="form-group">
            <label>Designation</label>
            <input type="text" placeholder="e.g. Talent Acquisition Head" />
          </div>
        </div>

        {/* Skills */}
        <div className="form-group">
          <label>Skills</label>
          <div className="skills-input">
            <input
              type="text"
              placeholder="Enter a skill and press Add"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddSkill())
              }
            />
            <button type="button" className="add-btn" onClick={handleAddSkill}>
              Add
            </button>
          </div>
          <div className="skills-list">
            {skills.map((skill, idx) => (
              <span className="skill-pill" key={idx}>
                {skill}
                <button type="button" onClick={() => handleRemoveSkill(idx)}>
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Company Description */}
        <div className="form-group">
          <label>Company Description</label>
          <textarea
            placeholder="Describe your company, mission, values, etc."
            rows="4"
          />
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button type="button" onClick={handleReset} className="reset-btn">
            Reset
          </button>
          <button type="submit" className="submit-btn">
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecruiterProfile;
