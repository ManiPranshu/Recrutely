import React, { useEffect, useState } from "react";
import "./ResumeSection.css"; // assuming CSS file

const ResumeSection = () => {
  const [resumes, setResumes] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id; 

  useEffect(() => {
    fetch(`http://localhost:5050/api/profile/resumes/${userId}`)
      .then((res) => res.json())
      .then((data) => setResumes(data))
      .catch((err) => console.error("Error fetching resumes:", err));
  }, [userId]);

  return (
    <div className="section resume-section-pr">
      {resumes.length > 0 && (
        <div className="uploaded-resume-list-pr">
          {resumes.map((resume) => (
            <div className="resume-file-pr" key={resume.id}>
              <span>📄</span>
              <div>
                <a
                  href={resume.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {decodeURIComponent(resume.resume_url.split("/").pop())
                    .replace(/\.pdf$/, "") // remove .pdf extension temporarily
                    .replace(/[_-]/g, " ") // replace underscores/dashes with spaces
                    .split(" ") // split into words
                    .slice(0, 4) // take first 2 words
                    .join(" ") + ".pdf"}
                </a>

                <p className="resume-meta-pr">
                  Uploaded on {new Date(resume.uploaded_at).toLocaleString()}
                </p>
              </div>
              <div className="resume-actions-pr">
                <a href={resume.resume_url} download>
                  <button>⬇️</button>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeSection;
