import JobCard from "./JobCard";

const SkeletonCard = () => (
  <div style={{
    background: "var(--surface)", borderRadius: "var(--radius)",
    padding: 24, border: "1px solid var(--border)",
    display: "flex", flexDirection: "column", gap: 12,
  }}>
    <style>{`
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
    `}</style>
    {[48, 16, 12, 12, 12].map((height, i) => (
      <div key={i} style={{
        height,
        width:        i === 0 ? 48 : i === 1 ? "60%" : "80%",
        borderRadius: i === 0 ? "50%" : 6,
        background:   "#f0f0f0",
        animation:    "pulse 1.5s ease-in-out infinite",
      }} />
    ))}
  </div>
);

const JobList = ({ jobs, isLoading, error, savedIds, onToggleSave }) => {
  if (isLoading) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        textAlign: "center", padding: "64px 24px",
        background: "#fef2f2", borderRadius: "var(--radius)",
        border: "1px solid #fecaca",
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
        <p style={{ fontSize: 16, fontWeight: 500, color: "#ef4444", marginBottom: 8 }}>Failed to load jobs</p>
        <p style={{ fontSize: 14, color: "#b91c1c" }}>{error}</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div style={{
        textAlign: "center", padding: "64px 24px",
        color: "var(--muted)", background: "var(--surface)",
        borderRadius: "var(--radius)", border: "1px solid var(--border)",
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>No jobs match your search</p>
        <p style={{ fontSize: 14 }}>Try a different keyword or clear the filters</p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
      {jobs.map(job => (
        <JobCard
          key={job.id}
          job={job}
          isSaved={savedIds.includes(job.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </div>
  );
};

export default JobList;