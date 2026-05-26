import JobCard from "./JobCard";

const JobList = ({ jobs }) => {
  if (jobs.length === 0) {
    return (
      <div style={{
        textAlign:    "center",
        padding:      "64px 24px",
        color:        "var(--muted)",
        background:   "var(--surface)",
        borderRadius: "var(--radius)",
        border:       "1px solid var(--border)",
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>
          No jobs match your search
        </p>
        <p style={{ fontSize: 14 }}>
          Try a different keyword or clear the filters
        </p>
      </div>
    );
  }

  return (
    <div style={{
      display:             "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap:                 20,
    }}>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;