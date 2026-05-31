import { useParams, useNavigate, Link } from "react-router-dom";

const JobDetailPage = ({ jobs, isLoading, savedIds, onToggleSave }) => {
  const { id }     = useParams();
  const navigate   = useNavigate();

  const job    = jobs.find(j => j.id === Number(id));
  const isSaved = savedIds.includes(Number(id));

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en", {
      month: "long", day: "numeric", year: "numeric",
    });

  const typeColors = {
    "Full-time": { bg: "#eff6ff", color: "#4f8ef7" },
    "Contract":  { bg: "#f0fdf4", color: "#16a34a" },
    "Part-time": { bg: "#fdf4ff", color: "#9333ea" },
  };

  if (isLoading) {
    return (
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px" }}>
        <p style={{ color: "var(--muted)" }}>Loading job details...</p>
      </main>
    );
  }

  if (!job) {
    return (
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🕵️</div>
        <h2 style={{ marginBottom: 8 }}>Job not found</h2>
        <p style={{ color: "var(--muted)", marginBottom: 24 }}>
          This job may have been removed or the link is invalid.
        </p>
        <Link to="/" style={{
          padding: "10px 24px", background: "var(--accent)",
          color: "white", borderRadius: "var(--radius)",
          textDecoration: "none", fontSize: 14,
        }}>
          Back to jobs
        </Link>
      </main>
    );
  }

  const badge = typeColors[job.type] ?? typeColors["Full-time"];

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px" }}>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "none", border: "none", cursor: "pointer",
          color: "var(--muted)", fontSize: 14, marginBottom: 24,
          fontFamily: "inherit", padding: 0,
        }}
      >
        ← Back
      </button>

      {/* Header card */}
      <div style={{
        background: "var(--surface)", borderRadius: "var(--radius)",
        boxShadow: "var(--shadow)", padding: 32,
        border: "1px solid var(--border)", marginBottom: 20,
      }}>

        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 20 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 14,
            overflow: "hidden", background: "#f5f5f5",
            flexShrink: 0, display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            {job.logo
              ? <img src={job.logo} alt={job.company} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              : <span style={{ fontSize: 32 }}>🏢</span>
            }
          </div>

          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>
              {job.title}
            </h1>
            <p style={{ fontSize: 15, color: "var(--muted)", marginBottom: 12 }}>
              {job.company}
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{
                fontSize: 12, padding: "4px 12px", borderRadius: 20,
                background: badge.bg, color: badge.color, fontWeight: 500,
              }}>
                {job.type}
              </span>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>📍 {job.location}</span>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>📅 {formatDate(job.date)}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {job.tags.length > 0 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
            {job.tags.map(tag => (
              <span key={tag} style={{
                fontSize: 12, padding: "4px 12px",
                borderRadius: 20, background: "var(--bg)",
                color: "var(--muted)", border: "1px solid var(--border)",
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 12 }}>
          <a
            href={job.url}
            target="_blank"
            rel="noreferrer"
            style={{
              flex: 1, padding: "12px 0", background: "var(--accent)",
              color: "white", borderRadius: "var(--radius)",
              textDecoration: "none", fontSize: 15, fontWeight: 600,
              textAlign: "center", transition: "background 0.15s",
            }}
          >
            Apply now →
          </a>
          <button
            onClick={() => onToggleSave(job.id)}
            style={{
              padding: "12px 24px", borderRadius: "var(--radius)",
              border: "1.5px solid",
              borderColor: isSaved ? "var(--accent)" : "var(--border)",
              background:  isSaved ? "#eff6ff" : "var(--surface)",
              color:       isSaved ? "var(--accent)" : "var(--muted)",
              fontSize: 14, fontWeight: 500, cursor: "pointer",
              fontFamily: "inherit", transition: "all 0.15s",
            }}
          >
            {isSaved ? "✓ Saved" : "Save"}
          </button>
        </div>
      </div>

      {/* Description card */}
      <div style={{
        background: "var(--surface)", borderRadius: "var(--radius)",
        boxShadow: "var(--shadow)", padding: 32,
        border: "1px solid var(--border)",
      }}>
        <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 20 }}>Job Description</h2>
        <div
          style={{ fontSize: 14, lineHeight: 1.8, color: "#444" }}
          dangerouslySetInnerHTML={{ __html: job.description }}
        />
      </div>

    </main>
  );
};

export default JobDetailPage;