import { useState } from "react";
import { FaCamera, FaUpload, FaEdit, FaTrash } from "react-icons/fa";
import "./profile.css";
const allSkills = [
  "Python",
  "React",
  "JavaScript",
  "CSS",
  "C++",
  "Node.js",
  "Django",
  "a",
  "b",
  "c",
  "d",
  "e",
];

function Profile() {
  const [image, setImage] = useState(null);
  const [showSkill, setShowSkill] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showExp, setShowExp] = useState(false);
  const [expForm, setExpForm] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    discrip: "",
  });
  const [addedExp, setAddedExp] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const filteredSkills = allSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedSkills.includes(skill)
  );

  const addSkill = (skill) => {
    setSelectedSkills([...selectedSkills, skill]);
    // setSearchTerm('');
  };

  const removeSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const handleChange = (e) => {
    setExpForm({ ...expForm, [e.target.name]: e.target.value });
  };

  const addExp = (e) => {
    e.preventDefault();
    const { role, company, startDate, endDate, discrip } = expForm;

    if (!role.trim() || !company.trim()) return;

    const newExp = {
      role,
      company,
      period: `${startDate} to ${endDate}`,
      discrip,
      startDate,
      endDate,
    };

    if (editIndex !== null) {
      // Editing an existing item
      const updated = [...addedExp];
      updated[editIndex] = newExp;
      setAddedExp(updated);
    } else {
      // Adding a new item
      setAddedExp((prev) => [...prev, newExp]);
    }

    // Reset everything
    setExpForm({
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      discrip: "",
    });
    setEditIndex(null);
    setShowExp(false);
  };

  const handleDelete = (indexToRemove) => {
    setAddedExp((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleEdit = (index) => {
    const exp = addedExp[index];
    setExpForm({
      role: exp.role,
      company: exp.company,
      startDate: exp.startDate,
      endDate: exp.endDate,
      discrip: exp.discrip,
    });
    setEditIndex(index); // mark which entry is being edited
    setShowExp(true); // show the popup
  };

  return (
    <>
      {/* <div className="heading-profile">
      <h2>Post a new job</h2>
      <p>Fill out the job details below to create a new listing.</p>
    </div> */}

      <div className="profile-pic">
        <span className="personal-heading">Profile Picture</span>

        <input
          type="file"
          id="imageInput"
          accept=".jpg,.png,jpeg"
          onChange={handleImageChange}
          hidden
        />

        <label
          htmlFor="imageInput"
          className={`image-upload-label ${image ? "uploaded" : ""}`}
        >
          {image ? (
            <img src={image} alt="Uploaded" className="uploaded-image" />
          ) : (
            <FaCamera size="2rem" color="#555" />
          )}
        </label>

        <label htmlFor="imageInput" className="upload-btn">
          <FaUpload style={{ marginRight: "0.5rem" }} />
          Upload Image
        </label>

        <p className="recom">Recommended: 300*300px</p>
      </div>

      <div className="perso-info">
        <span className="personal-heading">Personal Information</span>
        <div className="name">
          <div style={{ width: "100%" }}>
            <p className="info-title" style={{ marginTop: "1rem" }}>
              First Name
            </p>
            <input type="text" className="first-name" />
          </div>

          <div style={{ width: "100%" }}>
            <p className="info-title" style={{ marginTop: "1rem" }}>
              Last Name
            </p>
            <input type="text" className="last-name" />
          </div>
        </div>

        <p className="info-title">Email Address</p>
        <input type="text" className="info-input-field" />

        <p className="info-title">Phone Number</p>
        <input type="text" className="info-input-field" />

        <p className="info-title">Location</p>
        <input type="text" className="info-input-field" />
      </div>

      <div className="skill-grid">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            fontSize: "1.2rem",
          }}
        >
          <span className="skill-heading">Skills</span>
          <button className="skill-button" onClick={() => setShowSkill(true)}>
            + Add Skill
          </button>
        </div>

        <div className="selected-skills">
          {selectedSkills.map((skill) => (
            <div key={skill} className="skill-chip">
              {skill}
              <span className="remove-skill" onClick={() => removeSkill(skill)}>
                ×
              </span>
            </div>
          ))}
        </div>

        {showSkill && (
          <div className="addskill-popup">
            <div className="addskill-content">
              <h3>Add a Skill</h3>
              <input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <ul className="skill-list">
                {filteredSkills.map((skill) => (
                  <li key={skill} onClick={() => addSkill(skill)}>
                    {skill}
                  </li>
                ))}
                {filteredSkills.length === 0 && searchTerm.trim() && (
                  <li
                    className="add-custom"
                    onClick={() => addSkill(searchTerm)}
                  >
                    Add "{searchTerm}" as a skill
                  </li>
                )}
              </ul>
              <div className="popup-buttons">
                <button onClick={() => setShowSkill(false)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* experience page  */}
      <div className="skill-grid">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            fontSize: "1.2rem",
          }}
        >
          <span className="skill-heading">Experience</span>
          <button className="skill-button" onClick={() => setShowExp(true)}>
            + Add Experience
          </button>
        </div>

        <div className="experience-list">
          {addedExp.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-content">
                <div>
                <strong>Role:</strong> {exp.role}
              </div>
              <div>
                <strong>Company:</strong> {exp.company}
              </div>
              <div>
                <strong>Period:</strong> {exp.period}
              </div>
              <div>
                <strong>Description:</strong> {exp.discrip}
              </div>
              </div>
              <div className="exp-actions">
                <FaEdit className="icon" onClick={() => handleEdit(index)} />
                <FaTrash className="icon" onClick={() => handleDelete(index)} />
              </div>
            </div>
          ))}
        </div>

        {showExp && (
          <div className="exp-popup">
            <div className="exp-content">
              <h3>Add Experience</h3>
              <form onSubmit={addExp}>
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  required
                  value={expForm.role}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  required
                  value={expForm.company}
                  onChange={handleChange}
                />
                <label>Work Period</label>
                <div className="date-range">
                  <input
                    type="date"
                    name="startDate"
                    value={expForm.startDate}
                    onChange={handleChange}
                    required
                  />
                  <span>to</span>
                  <input
                    type="date"
                    name="endDate"
                    value={expForm.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <input
                  type="text"
                  name="discrip"
                  placeholder="Description"
                  required
                  value={expForm.discrip}
                  onChange={handleChange}
                />
                <div className="popup-buttons">
                  <button type="submit">Add</button>
                  {/* <button type="button" onClick={() => setShowExp(false)}>
                Close
              </button> */}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;