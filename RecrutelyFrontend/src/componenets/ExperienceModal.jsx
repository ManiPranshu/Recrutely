// ExperienceModal.jsx
import React, { useState, useEffect } from "react";
import "./ExperienceModal.css";

const ExperienceModal = ({ onClose, onSave, existingData }) => {
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  useEffect(() => {
    if (existingData) {
      setFormData(existingData);
    }
  }, [existingData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const { role, company, startDate, endDate, description } = formData;
    if (role && company && startDate && endDate && description) {
      onSave({
        ...formData,
        id: existingData?.id || Date.now(), // preserve ID for editing
      });
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{existingData ? "Edit" : "Add"} Experience</h3>
        <input
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
        />
        <input
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
        />
        <div className="date-inputs">
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
          <span>to</span>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <div className="modal-buttons">
          <button className="modal-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-submit" onClick={handleSubmit}>
            {existingData ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceModal;
