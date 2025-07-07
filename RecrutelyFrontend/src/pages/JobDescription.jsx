import "./JobDescription.css"
import {useState} from "react"
import companyLogo from "/assets/google.png"; // or your actual logo path
import ApplyModal from "./ApplyModal"; // or your actual modal file path
export default function JobDescription () {

  const [showResumePopup, setShowResumePopup] = useState(false);

  return (
    <div className="job-details-container">
      {/* Header */}
      <div className="job-header-box">
        <div>
          <h2 className="job-title">Senior Frontend Developer</h2>
          <p className="company-name">Google Inc.</p>
          <div className="job-tags">
            <span>Remote</span>
            <span>Full-Time</span>
            <span>$120–150</span>
            <span>Posted 2 days ago</span>
          </div>
        </div>
      </div>

      {/* Content Box */}
      <div className="job-content-row">
        {/* Left Box - Job Description */}
        <div className="job-description-box">
          <h3>Job Description</h3>
          <h4>Responsibilities</h4>
          <ul>
            <li>Develop high-quality frontend apps using React, TypeScript</li>
            <li>Collaborate with design and backend teams</li>
            <li>Optimize apps for speed and scalability</li>
            <li>Write clean, maintainable, documented code</li>
          </ul>

          <h4>Required Skills</h4>
          <ul>
            <li>5+ years experience in frontend development</li>
            <li>Expert knowledge of React, JavaScript, TypeScript</li>
            <li>Familiarity with CSS frameworks and preprocessors</li>
            <li>CI/CD pipelines and testing frameworks</li>
          </ul>

          <h4>Perks & Benefits</h4>
          <ul>
            <li>Equity, health, dental insurance</li>
            <li>Flexible hours, remote work</li>
            <li>Conference attendance, training</li>
          </ul>
        </div>

        {/* Right Box - Company Info */}
        <div className="company-info-box">
          <img src={companyLogo} alt="Google Inc." className="company-logo" />
          <h3 className="company-name">Google Inc.</h3>
          <p><strong>Industry:</strong> Technology</p>
          <p><strong>Company Size:</strong> 10,000+ Employees</p>
          <button className="visit-button">Visit Website</button>
          <h4>About Company</h4>
          <p className="about-text">
            Google is a multinational technology company that specializes in Internet-related
            services and products, including online advertising, search engines, cloud computing,
            and software.
          </p>
        </div>
      </div>

      {/* Button Row */}
      <div className="button-row">
        <button className="apply-btn" onClick={() => setShowResumePopup(true)} >Apply Now</button>
        
        <button className="save-btn1">💾 Save Job</button>
        <button className="share-btn">📤</button>
      </div>
      {showResumePopup && <ApplyModal onClose={() => setShowResumePopup(false)} />}
    </div>
    
  );
};