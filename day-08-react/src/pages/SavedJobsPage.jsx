import { Link } from "react-router-dom";
import JobCard from "../components/JobCard";

const SavedJobsPage = ({ savedJobs, savedIds, onToggleSave }) => {
  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>

      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>
          Saved Jobs
        </h2>
        <p style={{ color: "var(--muted)", fontSize: 15 }}>
          {savedJobs.length} {savedJobs.length === 1 ? "job" : "jobs"} saved
        </p>
      </div>

      {savedJobs.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "64px 24px",
          background: "var(--surface)", borderRadius: "var(--radius)",
          border: "1px solid var(--border)",
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔖</div>
          <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 8, color: "var(--text)" }}>
            No saved jobs yet
          </p>
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 24 }}>
            Hit "Save job" on any listing to keep track of it here.
          </p>
          <Link to="/" style={{
            padding: "10px 24px", background: "var(--accent)",
            color: "white", borderRadius: "var(--radius)",
            textDecoration: "none", fontSize: 14, fontWeight: 500,
          }}>
            Browse jobs
          </Link>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
        }}>
          {savedJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedIds.includes(job.id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      )}

    </main>
  );
};

export default SavedJobsPage;