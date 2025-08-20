// import React, { useState } from "react";
// import "./recruiterProfile.css";
// import { FaCamera } from "react-icons/fa";

// const RecruiterProfile = () => {

//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?.id;

//   const [skills, setSkills] = useState([]);
//   const [skillInput, setSkillInput] = useState("");
//   const [companyLogo, setCompanyLogo] = useState(null);
//   const [companyLogoFile, setCompanyLogoFile] = useState(null);

//   const handleFileUpload = async (file, type) => {
//   const formData = new FormData();
//   formData.append("file", file);

//   const endpoint = type === "photo" ? "photo" : "resume";

//   try {
//     const res = await fetch(`http://localhost:5050/api/upload/${endpoint}`, {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();
//     return data.url;
//   } catch (error) {
//     console.error(`${type} Upload Error:`, error);
//     return null;
//   }
// };

//   const handleAddSkill = () => {
//     if (skillInput.trim() !== "") {
//       setSkills([...skills, skillInput.trim()]);
//       setSkillInput("");
//     }
//   };

//   const handleRemoveSkill = (index) => {
//     const newSkills = [...skills];
//     newSkills.splice(index, 1);
//     setSkills(newSkills);
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     setCompanyLogo(URL.createObjectURL(file)); // for preview
//     setCompanyLogoFile(file); // to upload later
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let logoUrl = null;

//     if (companyLogoFile) {
//       logoUrl = await handleFileUpload(companyLogoFile, "photo");
//       if (!logoUrl) {
//         alert("Logo upload failed!");
//         return;
//       }
//     }

//     const recruiterData = {
//       user_id: userId,
//       recruiter_name: document.querySelector("input[placeholder='e.g. John Doe']").value,
//       recruiter_email: document.querySelector("input[placeholder='e.g. john@company.com']").value,
//       phone_number: document.querySelector("input[placeholder='e.g. 8736966031']").value,
//       company_name: document.querySelector("input[placeholder='e.g. ABC Corp']").value,
//       company_url: document.querySelector("input[placeholder='e.g. www.google.com']").value,
//       industry_type: document.querySelector("input[placeholder='e.g. Technology Finance etc.']").value,
//       company_size: document.querySelector("input[placeholder='e.g. 10000-20000']").value,
//       recruiter_designation: document.querySelector("input[placeholder='e.g. Talent Acquisition Head']").value,
//       recruiter_skills: skills,
//       company_logo: logoUrl || "",
//       company_description: document.querySelector("textarea").value,
//     };

//     try {
//       const res = await fetch("http://localhost:5050/api/recruiter/profile", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(recruiterData),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to submit profile");
//       }

//       const data = await res.json();
//       alert("Profile submitted successfully!");
//       console.log(data);
//     } catch (error) {
//       console.error("Error submitting profile:", error.message);
//       alert("Submission failed");
//     }
//   };

//   const handleReset = () => {
//     setSkills([]);
//     setSkillInput("");
//     setCompanyLogo(null);
//     setCompanyLogoFile(null);
//     document.getElementById("recruiter-form").reset();
//   };

  
//   return (
//    <div className="recruiter-profile-container">
//       <h2>Recruiter Profile</h2>
//       <form onSubmit={handleSubmit} id="recruiter-form">
//         {/* Company Logo Upload */}
//         <div className="profile-photo-section">
//           <p>Company Logo</p>
//           <div className="profile-photo-box">
//             {companyLogo ? (
//               <img src={companyLogo} alt="Company Logo" className="profile-preview-img" />
//             ) : (
//               <div className="photo-placeholder">
//                 <FaCamera className="camera-icon" />
//               </div>
//             )}

//             <input
//               type="file"
//               id="logo-upload"
//               className="file-input"
//               accept=".png,.jpg,.jpeg"
//               style={{ display: "none" }}
//               onChange={handleImageUpload}
//             />
//             <label htmlFor="logo-upload" className="upload-photo-btn">
//               📤 Upload Logo
//             </label>
//             <p className="recommend">Recommended 300x300 px</p>
//           </div>
//         </div>


//         {/* Personal Info */}
//         <div className="form-grid">
//           <div className="form-group">
//             <label>Full Name</label>
//             <input type="text" placeholder="e.g. John Doe" required />
//           </div>
//           <div className="form-group">
//             <label>Email</label>
//             <input type="email" placeholder="e.g. john@company.com" required />
//           </div>
//           <div className="form-group">
//             <label>Phone No.</label>
//             <input type="text" placeholder="e.g. 8736966031" required />
//           </div>
//           <div className="form-group">
//             <label>Company Name</label>
//             <input type="text" placeholder="e.g. ABC Corp" required />
//           </div>
//           <div className="form-group">
//             <label>Company Industry Type</label>
//             <input
//               type="text"
//               placeholder="e.g. Technology Finance etc."
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Company Size</label>
//             <input type="text" placeholder="e.g. 10000-20000" required />
//           </div>
//           <div className="form-group">
//             <label>Company Location</label>
//             <input type="text" placeholder="e.g. Delhi" required />
//           </div>
          
//           <div className="form-group">
//             <label>Company Website Link</label>
//             <input type="text" placeholder="e.g. www.google.com" required />
//           </div>
//           <div className="form-group">
//             <label>Designation</label>
//             <input type="text" placeholder="e.g. Talent Acquisition Head" />
//           </div>
//         </div>

//         {/* Skills */}
//         <div className="form-group">
//           <label>Skills</label>
//           <div className="skills-input">
//             <input
//               type="text"
//               placeholder="Enter a skill and press Add"
//               value={skillInput}
//               onChange={(e) => setSkillInput(e.target.value)}
//               onKeyDown={(e) =>
//                 e.key === "Enter" && (e.preventDefault(), handleAddSkill())
//               }
//             />
//             <button type="button" className="add-btn" onClick={handleAddSkill}>
//               Add
//             </button>
//           </div>
//           <div className="skills-list">
//             {skills.map((skill, idx) => (
//               <span className="skill-pill" key={idx}>
//                 {skill}
//                 <button type="button" onClick={() => handleRemoveSkill(idx)}>
//                   ×
//                 </button>
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Company Description */}
//         <div className="form-group">
//           <label>Company Description</label>
//           <textarea
//             placeholder="Describe your company, mission, values, etc."
//             rows="4"
//           />
//         </div>

//         {/* Buttons */}
//         <div className="form-buttons">
//           <button type="button" onClick={handleReset} className="reset-btn">
//             Reset
//           </button>
//           <button type="submit" className="submit-btn" onClick={handleSubmit} >
//             Save Profile
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default RecruiterProfile;

import React, { useState, useEffect } from "react";
import "./recruiterProfile.css";
import { FaCamera } from "react-icons/fa";

// Define initial state outside the component for easy resetting
const initialFormData = {
  recruiter_name: "",
  recruiter_email: "",
  phone_number: "",
  company_name: "",
  company_url: "",
  industry_type: "",
  company_size: "",
  company_location: "",
  recruiter_designation: "",
  company_description: "",
};

const RecruiterProfile = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [companyLogoPreview, setCompanyLogoPreview] = useState(null);
  const [companyLogoFile, setCompanyLogoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Effect to load user info if it exists (e.g., for an "Edit Profile" page)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        recruiter_name: user.name || "",
        recruiter_email: user.email || "",
      }));
    }
  }, []);

  // A single handler for all text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompanyLogoPreview(URL.createObjectURL(file)); // for preview
      setCompanyLogoFile(file); // to upload later
    }
  };

  const handleAddSkill = () => {
    if (skillInput.trim() !== "" && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };
  
  // File upload logic remains the same
  const handleFileUpload = async (file) => {
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    try {
      const res = await fetch(`http://localhost:3000/api/upload/photo`, {
        method: "POST",
        body: uploadFormData,
      });
      const data = await res.json();
      return data.url;
    } catch (error) {
      console.error("Photo Upload Error:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
        alert("User not found. Please log in again.");
        setLoading(false);
        return;
    }

    let logoUrl = "";
    if (companyLogoFile) {
      logoUrl = await handleFileUpload(companyLogoFile);
      if (!logoUrl) {
        alert("Logo upload failed! Please try again.");
        setLoading(false);
        return;
      }
    }

    const recruiterData = {
      ...formData,
      user_id: user.id,
      recruiter_skills: skills,
      company_logo: logoUrl,
    };

    try {
      const res = await fetch("http://localhost:3000/api/recruiter/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recruiterData),
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      
      const data = await res.json();
      alert("Profile saved successfully!");
      console.log(data);
    } catch (error) {
      console.error("Error submitting profile:", error.message);
      alert("Submission failed. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setSkills([]);
    setSkillInput("");
    setCompanyLogoPreview(null);
    setCompanyLogoFile(null);
  };

  return (
    <div className="recruiter-profile-container">
      <h2>Recruiter Profile</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Company Logo Upload */}
        <div className="profile-photo-section">
          <p className="section-title">Company Logo</p>
          <div className="profile-photo-box">
            <label htmlFor="logo-upload" className="photo-uploader">
              {companyLogoPreview ? (
                <img src={companyLogoPreview} alt="Company Logo" className="profile-preview-img" />
              ) : (
                <div className="photo-placeholder">
                  <FaCamera className="camera-icon" />
                  <span>Upload Logo</span>
                </div>
              )}
            </label>
            <input
              type="file"
              id="logo-upload"
              accept=".png,.jpg,.jpeg"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <p className="recommend">Recommended: 300x300 px</p>
          </div>
        </div>

        {/* Personal & Company Info */}
        <div className="form-grid">
          {/* We add 'name' attribute to each input to make our handleChange function work */}
          <div className="form-group">
            <label htmlFor="recruiter_name">Full Name</label>
            <input id="recruiter_name" name="recruiter_name" type="text" placeholder="e.g. John Doe" value={formData.recruiter_name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="recruiter_email">Email</label>
            <input id="recruiter_email" name="recruiter_email" type="email" placeholder="e.g. john@company.com" value={formData.recruiter_email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="phone_number">Phone No.</label>
            <input id="phone_number" name="phone_number" type="tel" placeholder="e.g. 8736966031" value={formData.phone_number} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="recruiter_designation">Designation</label>
            <input id="recruiter_designation" name="recruiter_designation" type="text" placeholder="e.g. Talent Acquisition Head" value={formData.recruiter_designation} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="company_name">Company Name</label>
            <input id="company_name" name="company_name" type="text" placeholder="e.g. ABC Corp" value={formData.company_name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="company_url">Company Website</label>
            <input id="company_url" name="company_url" type="url" placeholder="e.g. https://www.abccorp.com" value={formData.company_url} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="industry_type">Industry Type</label>
            <input id="industry_type" name="industry_type" type="text" placeholder="e.g. Technology, Finance" value={formData.industry_type} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="company_size">Company Size</label>
            <input id="company_size" name="company_size" type="text" placeholder="e.g. 1000-5000 employees" value={formData.company_size} onChange={handleChange} required />
          </div>
          <div className="form-group grid-span-2">
             <label htmlFor="company_location">Company Location</label>
            <input id="company_location" name="company_location" type="text" placeholder="e.g. Kanpur, Uttar Pradesh" value={formData.company_location} onChange={handleChange} required />
          </div>
        </div>

        {/* Skills */}
        <div className="form-group">
          <label htmlFor="skills">Skills</label>
          <div className="skills-input">
            <input
              id="skills"
              type="text"
              placeholder="Enter skill and press Add"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
            />
            <button type="button" className="add-btn" onClick={handleAddSkill}>Add</button>
          </div>
          <div className="skills-list">
            {skills.map((skill, idx) => (
              <span className="skill-pill" key={idx}>
                {skill}
                <button type="button" onClick={() => handleRemoveSkill(idx)}>×</button>
              </span>
            ))}
          </div>
        </div>

        {/* Company Description */}
        <div className="form-group">
          <label htmlFor="company_description">Company Description</label>
          <textarea
            id="company_description"
            name="company_description"
            placeholder="Describe your company's mission, values, and culture."
            rows="5"
            value={formData.company_description}
            onChange={handleChange}
          />
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button type="button" onClick={handleReset} className="reset-btn" disabled={loading}>Reset</button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecruiterProfile;