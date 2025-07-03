import React from "react";
import { useState } from "react";
import "./ApplyModal.css"; // Import the CSS below

function ApplyModal({ onClose }) {

  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  }

  return (
    <div className="overlay">
      <div className="popup">
        <h2 className="popup-title">Apply For Senior Frontend Developer</h2>

        <div className="upload-section">
          <p className="label">Upload Resume</p>
          <div className="upload-box">
            <div className="upload-icon">📄</div>
            <p>
              Drag and drop your resume
              <br />
              or click to browse
            </p>
            <input
              type="file"
              id="resume-upload"
              className="file-input"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileUpload(e)}
            />

            <button htmlFor="resume-upload" className="upload-button">
              Upload Resume
            </button>
            <p className="upload-note">PDF, DOCX (Max 5MB)</p>
          </div>
        </div>

        <div className="divider">
          <hr />
          <span>OR</span>
          <hr />
        </div>

        <div className="saved-resumes">
          <p className="label">Select from saved resumes</p>

          <div className="resume-item">
            <div className="resume-info">
              <span className="pdf-icon">📄</span>
              <div>
                <p className="resume-name">resume_john_doe.pdf</p>
                <p className="resume-meta">1.2 MB - Uploaded on May 15, 2023</p>
              </div>
            </div>
            <div className="resume-actions">⬇️ 📤</div>
          </div>

          <div className="resume-item">
            <div className="resume-info">
              <span className="pdf-icon">📄</span>
              <div>
                <p className="resume-name">resume_john_doe.pdf</p>
                <p className="resume-meta">1.2 MB - Uploaded on May 15, 2023</p>
              </div>
            </div>
            <div className="resume-actions">⬇️ 📤</div>
          </div>
        </div>

        <div className="message-box">
          <p className="label">Personal Message (Optional)</p>
          <textarea placeholder="Write a brief message to employer..." />
        </div>

        <div className="popup-actions">
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>

          <button className="submit">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default ApplyModal;
