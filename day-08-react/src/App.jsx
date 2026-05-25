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

const App = () => {
  return (
    <div>
      <Navbar />

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>

        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>
            Find your next role
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 15 }}>
            {JOBS.length} jobs available right now
          </p>
        </div>

        <JobList jobs={JOBS} />

      </main>
    </div>
  );
};

export default App;