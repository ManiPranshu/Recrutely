import React, { useState } from "react";
import "./SkillModal.css";

const SkillModal = ({ onClose, onAddSkill }) => {
  const skillOptions = [
    // (same full array of skills you already have)
    "JavaScript", "TypeScript", "Python", "Java", "C", "C++", "C#", "Go", "Ruby", "Rust", "Kotlin", "Swift", "PHP",
    "HTML", "CSS", "SASS", "Bootstrap", "Tailwind CSS", "React", "Next.js", "Vue.js", "Angular", "jQuery", "Redux",
    "Node.js", "Express.js", "Django", "Flask", "Spring Boot", "ASP.NET", "GraphQL", "REST APIs", "gRPC",
    "SQL", "MySQL", "PostgreSQL", "MongoDB", "Firebase", "Oracle", "Redis", "SQLite", "Cassandra",
    "Docker", "Kubernetes", "Git", "GitHub", "GitLab", "CI/CD", "Jenkins", "Travis CI", "Nginx", "Apache", "Terraform", "AWS", "Azure", "Google Cloud", "Linux", "Bash", "Zsh",
    "React Native", "Flutter", "SwiftUI", "Android", "iOS", "Xcode", "Android Studio",
    "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Natural Language Processing", "ChatGPT", "Transformers",
    "Jest", "Mocha", "Chai", "Enzyme", "React Testing Library", "Selenium", "Cypress", "JUnit", "Postman",
    "OAuth", "JWT", "HTTPS", "SSL/TLS", "Authentication", "Authorization", "OWASP",
    "AWS Lambda", "EC2", "S3", "Cloud Functions", "Cloud Firestore", "Heroku", "Vercel", "Netlify",
    "Problem Solving", "Communication", "Teamwork", "Agile", "Scrum", "Leadership", "Time Management", "Critical Thinking", "Project Management", "Notion", "Figma", "Trello", "Jira", "Slack", "Zoom", "VS Code", "PostgreSQL",
    "Data Analysis", "Data Visualization", "BigQuery", "Apache Spark", "Hadoop", "Power BI", "Tableau", "Excel"
  ];

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleAdd = () => {
    if (selectedSkills.length > 0) {
      onAddSkill(selectedSkills);
      onClose();
    }
  };

  const filteredSkills = skillOptions.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Select Skills</h3>

        {/* 🔍 Search Box */}
        <input
          type="text"
          className="search-input"
          placeholder="Search skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="skill-options">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill) => (
              <button
                key={skill}
                className={`skill-option ${selectedSkills.includes(skill) ? "selected" : ""}`}
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </button>
            ))
          ) : (
            <p className="no-skill-msg">No matching skills found.</p>
          )}
        </div>

        <div className="modal-buttons">
          <button className="modal-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="modal-submit"
            onClick={handleAdd}
            disabled={selectedSkills.length === 0}
          >
            Add {selectedSkills.length} Skill{selectedSkills.length > 1 ? "s" : ""}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillModal;
