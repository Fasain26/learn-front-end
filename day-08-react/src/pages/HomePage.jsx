import { useState } from "react";
import JobList from "../components/JobList";

const FILTERS = ["All", "Full-time", "Contract", "Part-time"];

const HomePage = ({ jobs, isLoading, error, savedIds, onToggleSave }) => {
  const [search, setSearch]       = useState("");
  const [activeFilter, setFilter] = useState("All");
  const [sortBy, setSortBy]       = useState("default");

  const filteredJobs = jobs
    .filter(job => {
      const q = search.toLowerCase();
      const matchesSearch =
        job.title.toLowerCase().includes(q)   ||
        job.company.toLowerCase().includes(q) ||
        job.tags.some(tag => tag.toLowerCase().includes(q));
      const matchesFilter = activeFilter === "All" || job.type === activeFilter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "company") return a.company.localeCompare(b.company);
      if (sortBy === "newest")  return new Date(b.date) - new Date(a.date);
      return 0;
    });

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>

      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>
          Find your next role
        </h2>
        <p style={{ color: "var(--muted)", fontSize: 15 }}>
          {isLoading ? "Loading jobs..." : `${filteredJobs.length} of ${jobs.length} jobs`}
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search jobs, companies, skills..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, minWidth: 220, padding: "10px 16px",
            border: "1.5px solid var(--border)", borderRadius: "var(--radius)",
            fontSize: 14, fontFamily: "inherit", outline: "none",
            background: "var(--surface)",
          }}
        />

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setFilter(filter)}
              style={{
                padding: "9px 18px", borderRadius: 20,
                border: "1.5px solid",
                borderColor:  activeFilter === filter ? "var(--accent)" : "var(--border)",
                background:   activeFilter === filter ? "var(--accent)" : "var(--surface)",
                color:        activeFilter === filter ? "white" : "var(--muted)",
                fontSize: 13, fontWeight: 500, cursor: "pointer",
                fontFamily: "inherit", transition: "all 0.15s",
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{
            padding: "9px 14px", border: "1.5px solid var(--border)",
            borderRadius: "var(--radius)", fontSize: 13,
            fontFamily: "inherit", outline: "none",
            background: "var(--surface)", cursor: "pointer", color: "var(--text)",
          }}
        >
          <option value="default">Sort: Default</option>
          <option value="company">Sort: Company A–Z</option>
          <option value="newest">Sort: Newest first</option>
        </select>
      </div>

      <JobList
        jobs={filteredJobs}
        isLoading={isLoading}
        error={error}
        savedIds={savedIds}
        onToggleSave={onToggleSave}
      />
    </main>
  );
};

export default HomePage;