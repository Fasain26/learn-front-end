import { useState } from "react";
import Navbar from "./components/Navbar";
import JobList from "./components/JobList";

const JOBS = [
  {
    id:       1,
    title:    "Frontend Developer",
    company:  "Tokopedia",
    location: "Jakarta, Indonesia",
    type:     "Full-time",
    salary:   "$3k–$5k",
    tags:     ["React", "TypeScript", "CSS"],
    logo:     "🛒",
    color:    "#fff0e6",
  },
  {
    id:       2,
    title:    "React Engineer",
    company:  "Gojek",
    location: "Remote",
    type:     "Full-time",
    salary:   "$4k–$7k",
    tags:     ["React", "Node.js", "GraphQL"],
    logo:     "🛵",
    color:    "#e6f7f0",
  },
  {
    id:       3,
    title:    "UI Developer",
    company:  "Traveloka",
    location: "Bali, Indonesia",
    type:     "Contract",
    salary:   "$2k–$3k",
    tags:     ["Vue", "Tailwind", "Figma"],
    logo:     "✈️",
    color:    "#e6eeff",
  },
  {
    id:       4,
    title:    "Junior Frontend",
    company:  "Bukalapak",
    location: "Jakarta, Indonesia",
    type:     "Full-time",
    salary:   "$1.5k–$2.5k",
    tags:     ["JavaScript", "React", "Git"],
    logo:     "🏪",
    color:    "#fff0f0",
  },
  {
    id:       5,
    title:    "Frontend Intern",
    company:  "Shopee",
    location: "Remote",
    type:     "Contract",
    salary:   "$800–$1.2k",
    tags:     ["HTML", "CSS", "JavaScript"],
    logo:     "🛍️",
    color:    "#fff8e6",
  },
  {
    id:       6,
    title:    "Web Developer",
    company:  "Grab",
    location: "Singapore",
    type:     "Full-time",
    salary:   "$5k–$8k",
    tags:     ["React", "AWS", "Docker"],
    logo:     "🚗",
    color:    "#f0fff4",
  },
];

const FILTERS = ["All", "Full-time", "Contract"];

const App = () => {
  const [search, setSearch]       = useState("");
  const [activeFilter, setFilter] = useState("All");
  const [sortBy, setSortBy]       = useState("default");

  const filteredJobs = JOBS
    .filter(job => {
      const q = search.toLowerCase();
      const matchesSearch =
        job.title.toLowerCase().includes(q)   ||
        job.company.toLowerCase().includes(q) ||
        job.tags.some(tag => tag.toLowerCase().includes(q));

      const matchesFilter =
        activeFilter === "All" || job.type === activeFilter;

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === "company") return a.company.localeCompare(b.company);
      return 0;
    });

  return (
    <div>
      <Navbar />

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>

        {/* ── HERO ── */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>
            Find your next role
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 15 }}>
            {filteredJobs.length} of {JOBS.length} jobs
          </p>
        </div>

        {/* ── CONTROLS ── */}
        <div style={{
          display:        "flex",
          gap:            12,
          marginBottom:   28,
          flexWrap:       "wrap",
          alignItems:     "center",
        }}>

          {/* Search */}
          <input
            type="text"
            placeholder="Search jobs, companies, skills..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex:         1,
              minWidth:     220,
              padding:      "10px 16px",
              border:       "1.5px solid var(--border)",
              borderRadius: "var(--radius)",
              fontSize:     14,
              fontFamily:   "inherit",
              outline:      "none",
              background:   "var(--surface)",
            }}
          />

          {/* Filter buttons */}
          <div style={{ display: "flex", gap: 8 }}>
            {FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setFilter(filter)}
                style={{
                  padding:      "9px 18px",
                  borderRadius: 20,
                  border:       "1.5px solid",
                  borderColor:  activeFilter === filter ? "var(--accent)" : "var(--border)",
                  background:   activeFilter === filter ? "var(--accent)" : "var(--surface)",
                  color:        activeFilter === filter ? "white" : "var(--muted)",
                  fontSize:     13,
                  fontWeight:   500,
                  cursor:       "pointer",
                  fontFamily:   "inherit",
                  transition:   "all 0.15s",
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{
              padding:      "9px 14px",
              border:       "1.5px solid var(--border)",
              borderRadius: "var(--radius)",
              fontSize:     13,
              fontFamily:   "inherit",
              outline:      "none",
              background:   "var(--surface)",
              cursor:       "pointer",
              color:        "var(--text)",
            }}
          >
            <option value="default">Sort: Default</option>
            <option value="company">Sort: Company A–Z</option>
          </select>

        </div>

        {/* ── JOB LIST ── */}
        <JobList jobs={filteredJobs} />

      </main>
    </div>
  );
};

export default App;