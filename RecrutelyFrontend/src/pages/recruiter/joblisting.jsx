import { Link } from "react-router-dom";
import "./joblisting.css";
import JobCard from "../../components/JobCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const JobListing = () => {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;





const handleEdit = (job) => {
  navigate(`/postjob/${job.id}`);
};

const handleUpdate = (updatedJob) => {
  setJobs((prevJobs) =>
    prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
  );
};

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/jobs/listings");
        const data = await res.json();
        if (data.success) {
          setJobs(data.jobs);
        } else {
          console.error("Failed to fetch jobs");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalJobs = filteredJobs.length;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

 const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this job?")) return;

  try {
    const res = await fetch(`http://localhost:3000/api/jobs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText);
    }

    alert("Job deleted successfully!");

    // ✅ Remove deleted job from UI
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  } catch (err) {
    console.error("Error deleting job:", err.message);
    alert("Failed to delete job: " + err.message);
  }
};




  return (
    <div className="job-listing">
      <p className="job-heading">
        Manage your posted jobs and view applicants easily
      </p>

      <div className="job-actions">
        <Link to="/postjob" className="job-post-link">
          <button className="job-btn">+ Post a Job</button>
        </Link>
        <input
          type="search"
          placeholder="Search for job"
          className="job-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="job-grid">
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <JobCard
              key={job.id}
              jobId={job.id}
              title={job.title}
              company={job.company} // OR any label you want, like "Remote/Onsite"
              location={`${job.location} / ${job.work_mode}`} // Combine location and work mode
              salary={`${job.salary_min} - ${job.salary_max}`} // Construct from salaryMin, salaryMax
              date={new Date(job.posted_at).toDateString()}
              applicants={"0"}
              status={"Active"}
              onDelete={() => handleDelete(job.id)} // 👈 pass delete function here
              onEdit={() => handleEdit(job)} // 👈 pass edit function here
            />
          ))
        ) : (
          <p style={{ padding: "2em", color: "#888" }}>
            No jobs found for "{searchTerm}"
          </p>
        )}
      </div>

      {/* Pagination Footer */}
      {totalJobs > jobsPerPage && (
        <div className="pagination-footer">
          <span>
            Showing {indexOfFirstJob + 1}–{Math.min(indexOfLastJob, totalJobs)}{" "}
            of {totalJobs} jobs
          </span>

          <div className="pagination-controls">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
   

    </div>
  );
};

export default JobListing;
