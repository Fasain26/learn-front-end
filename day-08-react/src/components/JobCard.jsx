const JobCard = ({ job }) => {
  return (
    <div style={{
      background:   "var(--surface)",
      borderRadius: "var(--radius)",
      boxShadow:    "var(--shadow)",
      padding:      24,
      display:      "flex",
      flexDirection:"column",
      gap:          12,
      border:       "1px solid var(--border)",
    }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{
          width:        48,
          height:       48,
          borderRadius: 10,
          background:   job.color,
          display:      "flex",
          alignItems:   "center",
          justifyContent:"center",
          fontSize:     22,
          flexShrink:   0,
        }}>
          {job.logo}
        </div>

        <span style={{
          fontSize:     11,
          padding:      "4px 10px",
          borderRadius: 20,
          background:   job.type === "Full-time" ? "#eff6ff" : "#f0fdf4",
          color:        job.type === "Full-time" ? "var(--accent)" : "#16a34a",
          fontWeight:   500,
        }}>
          {job.type}
        </span>
      </div>

      <div>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
          {job.title}
        </h3>
        <p style={{ fontSize: 13, color: "var(--muted)" }}>
          {job.company}
        </p>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {job.tags.map(tag => (
          <span
            key={tag}
            style={{
              fontSize:     12,
              padding:      "3px 10px",
              borderRadius: 20,
              background:   "var(--bg)",
              color:        "var(--muted)",
              border:       "1px solid var(--border)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div style={{
        display:       "flex",
        justifyContent:"space-between",
        alignItems:    "center",
        marginTop:     "auto",
        paddingTop:    12,
        borderTop:     "1px solid var(--border)",
      }}>
        <span style={{ fontSize: 13, color: "var(--muted)" }}>
          📍 {job.location}
        </span>
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--accent)" }}>
          {job.salary}
        </span>
      </div>

    </div>
  );
};

export default JobCard;