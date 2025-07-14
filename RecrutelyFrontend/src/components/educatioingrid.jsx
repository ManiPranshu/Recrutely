import { useState } from "react";
import "./profile.css"
const Edugrid=()=>{
  // State
const [showEdu, setShowEdu] = useState(false);
const [eduForm, setEduForm] = useState({
  university: "",
  degree: "",
  duration: "",
  cgpa: "",
  board: "",
});
const [addedEdu, setAddedEdu] = useState([]);
const [editEduIndex, setEditEduIndex] = useState(null);

// Handlers
const handleEduChange = (e) => {
  setEduForm({ ...eduForm, [e.target.name]: e.target.value });
};

const addEdu = (e) => {
  e.preventDefault();
  const { university, degree, duration, cgpa, board } = eduForm;

  if (!university.trim() || !degree.trim()) return;

  const newEdu = { university, degree, duration, cgpa, board };

  if (editEduIndex !== null) {
    const updated = [...addedEdu];
    updated[editEduIndex] = newEdu;
    setAddedEdu(updated);
  } else {
    setAddedEdu(prev => [...prev, newEdu]);
  }

  setEduForm({ university: "", degree: "", duration: "", cgpa: "", board: "" });
  setEditEduIndex(null);
  setShowEdu(false);
};

const handleEduEdit = (index) => {
  const edu = addedEdu[index];
  setEduForm({ ...edu });
  setEditEduIndex(index);
  setShowEdu(true);
};

const handleEduDelete = (indexToRemove) => {
  setAddedEdu(prev => prev.filter((_, i) => i !== indexToRemove));
};

  return(
    <>
    <div className="skill-grid">
  <div className="skill-grid-header">
    <span className="skill-heading">Education</span>
    <button className="skill-button" onClick={() => setShowEdu(true)}>
      + Add Education
    </button>
  </div>

  <div className="experience-list">
    {addedEdu.map((edu, index) => (
      <div key={index} className="experience-item">
        <div className="experience-content">
          <div><span className="label">University:</span> {edu.university}</div>
          <div><span className="label">Degree:</span> {edu.degree}</div>
          <div><span className="label">Duration:</span> {edu.duration}</div>
          <div><span className="label">CGPA/Percentage:</span> {edu.cgpa}</div>
          <div><span className="label">Board:</span> {edu.board}</div>
        </div>
        <div className="exp-actions">
          <FaEdit className="icon" onClick={() => handleEduEdit(index)} />
          <FaTrash className="icon" onClick={() => handleEduDelete(index)} />
        </div>
        <div className="exp-divider"></div>
      </div>
    ))}
  </div>

  {showEdu && (
    <div className="exp-popup">
      <div className="exp-content">
        <h3>Add Education</h3>
        <form onSubmit={addEdu}>
          <input
            type="text"
            name="university"
            placeholder="University"
            value={eduForm.university}
            onChange={handleEduChange}
            required
          />
          <input
            type="text"
            name="degree"
            placeholder="Degree"
            value={eduForm.degree}
            onChange={handleEduChange}
            required
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={eduForm.duration}
            onChange={handleEduChange}
            required
          />
          <input
            type="text"
            name="cgpa"
            placeholder="CGPA / Percentage"
            value={eduForm.cgpa}
            onChange={handleEduChange}
            required
          />
          <input
            type="text"
            name="board"
            placeholder="Board"
            value={eduForm.board}
            onChange={handleEduChange}
            required
          />
          <div className="popup-buttons">
            <button type="submit">{editEduIndex !== null ? "Update" : "Add"}</button>
            <button type="button" onClick={() => {
              setShowEdu(false);
              setEditEduIndex(null);
            }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>

    </>
  )
}

export default Edugrid;