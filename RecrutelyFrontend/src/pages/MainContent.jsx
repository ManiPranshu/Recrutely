
import './MainContent.css'; 
import companyLogo from "/assets/google.png";
import Applications from "./Application.jsx"; 
import docIcon from "/assets/application.png";          
import rejectedIcon from "/assets/totaljob.png"; 
import shortlistedIcon from "/assets/shortlist.png"; 

const ApplicationStats = () => {
  const stats = [
    {
      label: "Total Applications",
      count: 24,
      icon: docIcon,
    },
    {
      label: "Rejected",
      count: 7,
      icon: rejectedIcon,
    },
    {
      label: "Shortlisted",
      count: 3,
      icon: shortlistedIcon,
    },
  ];

  return (
    <div className="application-stats-container">
      {stats.map((stat, index) => (
        <div className="stat-card" key={index}>
          <div className="stat-content">
            <img src={stat.icon} alt={stat.label} className="stat-icon" />
            <div>
              <p className="stat-label">{stat.label}</p>
              <p className="stat-count">{stat.count}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};





const JobDescription = () => {
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
          <button className="visit-button"   onClick={() => window.open("https://www.google.com/about/careers/applications/", "_blank")}>Visit Website</button>
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
        <button className="apply-btn">Apply Now</button>
        <button className="save-btn">💾 Save Job</button>
        <button className="share-btn">📤</button>
      </div>
    </div>
  );
};

const Joblist = () => {
  return (

      <div className="job-row">
        <div className="job-card">
          <h3>Job Title</h3>
          <p>Company Name</p>
          <p>Location</p>
          <p>Salary Range</p>
          <button className="apply-button">Apply Now</button>
        </div>

        <div className="job-card">
          <h3>Job Title</h3>
          <p>Company Name</p>
          <p>Location</p>
          <p>Salary Range</p>
          <button className="apply-button">Apply Now</button>
        </div>

        <div className="job-card">
          <h3>Job Title</h3>
          <p>Company Name</p>
          <p>Location</p>
          <p>Salary Range</p>
          <button className="apply-button">Apply Now</button>
        </div>


        <div className="job-card">
          <h3>Job Title</h3>
          <p>Company Name</p>
          <p>Location</p>
          <p>Salary Range</p>
          <button className="apply-button">Apply Now</button>
        </div>


        <div className="job-card">
          <h3>Job Title</h3>
          <p>Company Name</p>
          <p>Location</p>
          <p>Salary Range</p>
          <button className="apply-button">Apply Now</button>
        </div>


        <div className="job-card">
          <h3>Job Title</h3>
          <p>Company Name</p>
          <p>Location</p>
          <p>Salary Range</p>
          <button className="apply-button">Apply Now</button>
        </div>
      </div>

  );
};





const MainContent = () => {
  return (
    <div className="main-content">

      
      
      <ApplicationStats />
      <Joblist />
       <Applications />
       <JobDescription />

      
      <div style={{ height: "auto" }}></div>
    </div>
  );
};

export default MainContent;
