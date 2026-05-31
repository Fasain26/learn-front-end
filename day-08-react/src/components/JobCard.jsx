import { Link } from "react-router-dom";

const JobCard = ({ job, isSaved, onToggleSave }) => {
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en", {
      month: "short",
      day:   "numeric",
      year:  "numeric",
    });

  const typeColors = {
    "Full-time": { bg: "#eff6ff", color: "#4f8ef7" },
    "Contract":  { bg: "#f0fdf4", color: "#16a34a" },
    "Part-time": { bg: "#fdf4ff", color: "#9333ea" },
  };

  const badge = typeColors[job.type] ?? typeColors["Full-time"];

  return (
    <div style={{
      background:    "var(--surface)",
      borderRadius:  "var(--radius)",
      boxShadow:     "var(--shadow)",
      border:        "1px solid var(--border)",
      display:       "flex",
      flexDirection: "column",
      overflow:      "hidden",
      transition:    "transform 0.15s, box-shadow 0.15s",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--shadow)";
      }}
    >
      {/* Clickable area → job detail page */}
      <Link
        to={`/jobs/${job.id}`}
        style={{ textDecoration: "none", color: "inherit", padding: 24, flex: 1, display: "flex", flexDirection: "column", gap: 12 }}
      >
        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{
            width: 48, height: 48, borderRadius: 10,
            overflow: "hidden", background: "#f5f5f5",
            flexShrink: 0, display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            {job.logo
              ? <img src={job.logo} alt={job.company} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              : <span style={{ fontSize: 22 }}>🏢</span>
            }
          </div>
          <span style={{
            fontSize: 11, padding: "4px 10px",
            borderRadius: 20, background: badge.bg,
            color: badge.color, fontWeight: 500,
          }}>
            {job.type}
          </span>
        </div>

        {/* Title + company */}
        <div>
          <h3 style={{
            fontSize: 15, fontWeight: 600, marginBottom: 4,
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden",
          }}>
            {job.title}
          </h3>
          <p style={{ fontSize: 13, color: "var(--muted)" }}>{job.company}</p>
        </div>

        {/* Tags */}
        {job.tags.length > 0 && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {job.tags.map(tag => (
              <span key={tag} style={{
                fontSize: 11, padding: "3px 10px",
                borderRadius: 20, background: "var(--bg)",
                color: "var(--muted)", border: "1px solid var(--border)",
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Bottom row */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginTop: "auto",
          paddingTop: 12, borderTop: "1px solid var(--border)",
        }}>
          <span style={{ fontSize: 13, color: "var(--muted)" }}>📍 {job.location}</span>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>{formatDate(job.date)}</span>
        </div>
      </Link>

      {/* Save button — outside the Link so it doesn't navigate */}
      <button
        onClick={() => onToggleSave(job.id)}
        style={{
          padding:        "10px",
          border:         "none",
          borderTop:      "1px solid var(--border)",
          background:     isSaved ? "#eff6ff" : "var(--surface)",
          color:          isSaved ? "var(--accent)" : "var(--muted)",
          fontSize:       13,
          fontWeight:     500,
          cursor:         "pointer",
          fontFamily:     "inherit",
          transition:     "all 0.15s",
        }}
      >
        {isSaved ? "✓ Saved" : "Save job"}
      </button>
    </div>
  );
};

export default JobCard;