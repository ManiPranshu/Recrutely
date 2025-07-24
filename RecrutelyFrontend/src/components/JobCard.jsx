import {
  FaUsers,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDollarSign,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const Oneliner = ({ icon, text }) => (
  <div className="job-oneline">
    {icon && <span className="job-icon">{icon}</span>}
    {text && <span className="job-text">{text}</span>}
  </div>
);

const JobCard = ({
  jobId,
  title,
  company,
  location,
  salary,
  date,
  applicants,
  status,
  onDelete,
  onEdit,
}) => {

   const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/postjob/${jobId}`);

  };

  return (


<div className="job-card"  onClick={handleClick} style={{ cursor: "pointer" }}>
    <div className="job-card-header">
      <span className="job-title">{title}</span>
      <div className={`job-status ${status.toLowerCase()}`}>{status}</div>
    </div>

    <span className="job-company">{company}</span>

    <div className="job-content">
      <Oneliner icon={<FaMapMarkerAlt size=".875em" />} text={location} />
      <Oneliner icon={<FaDollarSign size=".875em" />} text={salary} />
      <Oneliner
        icon={<FaCalendarAlt size=".875em" />}
        text={`Posted on ${date}`}
      />
      <Oneliner
        icon={<FaUsers size=".875em" />}
        text={`${applicants} Applicants`}
      />
    </div>

    <div className="job-card-actions-wrapper">
      <div className="job-card-actions"  >
        <button className="job-btn primary">
          <FaEye size="1em" />
          View Applicants
        </button>

        <button
          className="job-btn outline"
          onClick={onEdit}
          style={{ cursor: "pointer" }}
        >
          <FaEdit size="1em" />
          Edit
        </button>

        <FaTrash
          className="job-icon-trash"
          style={{ cursor: "pointer" }}
          onClick={onDelete}
        />
      </div>
    </div>
  </div>
);
};

export default JobCard;

