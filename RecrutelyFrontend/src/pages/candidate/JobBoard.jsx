import React, { useState } from "react";
import "./JobBoard.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

// const allJobs = Array.from({ length: 124 }, (_, i) => ({
//   id: i + 1,
//   title: "Senior Frontend Developer",
//   company: "Google Inc.",
//   type: "Full-Time",
//   location: "Remote",
//   salary: "$120-$180",
//   description: "Join our dynamic team to build cutting-edge web applications using React, TypeScript, and more.",
//   posted: "2 days ago",
// }));

const jobTypes = ["All Types", "Full-Time", "Part-Time", "Contract"];
const locations = ["All Locations", "Remote", "San Francisco", "New York"];
const salaries = ["Any Salary", "$80-$120", "$120-$180", "$180+"];

const JOBS_PER_PAGE = 6;

export default function JobBoard() {
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/jobs/listings"); // Replace with your actual backend URL
        const data = await res.json();
        setAllJobs(data.jobs); // Ensure backend sends { jobs: [...] }
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("All Types");
  const [location, setLocation] = useState("All Locations");
  const [salary, setSalary] = useState("Any Salary");
  const [page, setPage] = useState(1);

  // Filtering logic
 const filteredJobs = allJobs.filter((job) => {
  const matchesSearch =
    job.title?.toLowerCase().includes(search.toLowerCase()) ||
    job.company?.toLowerCase().includes(search.toLowerCase()) ||
    job.responsibilities?.toLowerCase().includes(search.toLowerCase());

  const matchesType =
    type === "All Types" || job.job_type === type;

  const matchesLocation =
    location === "All Locations" || job.location === location;

  const matchesSalary =
    salary === "Any Salary" ||
    (salary === "$80-$120" && job.salary_min >= 80 && job.salary_max <= 120) ||
    (salary === "$120-$180" && job.salary_min >= 120 && job.salary_max <= 180) ||
    (salary === "$180+" && job.salary_min >= 180);

  return matchesSearch && matchesType && matchesLocation && matchesSalary;
});


  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (page - 1) * JOBS_PER_PAGE,
    page * JOBS_PER_PAGE
  );

  // Handlers
  const handleFilter = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page on filter
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div className="c-job-board">
      {/* Search and Filters */}
      <form className="c-job-filters" onSubmit={handleFilter}>
        <input
          className="c-job-search"
          type="text"
          placeholder="Search job titles, companies or keywords..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {jobTypes.map((jt) => (
            <option key={jt}>{jt}</option>
          ))}
        </select>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          {locations.map((loc) => (
            <option key={loc}>{loc}</option>
          ))}
        </select>
        <select value={salary} onChange={(e) => setSalary(e.target.value)}>
          {salaries.map((sal) => (
            <option key={sal}>{sal}</option>
          ))}
        </select>
        <button className="c-apply-filters" type="submit">
          <span role="img" aria-label="filter">
            ⏵
          </span>{" "}
          Apply Filters
        </button>
      </form>

      {/* Job Cards */}
      <div className="c-job-cards">
        {paginatedJobs.map((job) => (
          <div className="c-job-card" key={job.id}>
            <div className="c-job-card-header">
              <div>
                <div className="c-job-title">{job.title}</div>
                <div className="c-job-company">{job.company}</div>
              </div>
              <button className="c-bookmark-btn" title="Bookmark">
                &#9734;
              </button>
            </div>
            <div className="c-job-tags">
              <span className="c-job-tag">{job.job_type}</span>
              <span className="c-job-tag">{job.location}</span>
              <span className="c-job-tag">{`$${job.salary_min}-$${job.salary_max}`}</span>
            </div>
            <div className="c-job-desc">{job.responsibilities}</div>
            <div className="c-job-footer">
              <span className="c-job-posted">
                Posted {new Date(job.posted_at).toDateString()}
              </span>

             <Link to={`/jobdesc/${job.id}`}>
  <button className="c-apply-btn">Apply Now</button>
</Link>

            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="c-job-pagination">
        <span>
          Showing {(page - 1) * JOBS_PER_PAGE + 1}-
          {Math.min(page * JOBS_PER_PAGE, filteredJobs.length)} of{" "}
          {filteredJobs.length} jobs
        </span>
        <div className="c-pagination-controls">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            &#60;
          </button>
          {page > 2 && (
            <>
              <button
                className={page === 1 ? "active" : ""}
                onClick={() => handlePageChange(1)}
              >
                1
              </button>
              {page > 3 && <span className="c-pagination-ellipsis">...</span>}
            </>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === page || p === page - 1 || p === page + 1)
            .map((p) => (
              <button
                key={p}
                className={p === page ? "c-active" : ""}
                onClick={() => handlePageChange(p)}
              >
                {p}
              </button>
            ))}
          {page < totalPages - 1 && (
            <>
              {page < totalPages - 2 && (
                <span className="c-pagination-ellipsis">...</span>
              )}
              <button
                className={page === totalPages ? "c-active" : ""}
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            &#62;
          </button>
        </div>
      </div>
    </div>
  );
}
