import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import JobDetailPage from "./pages/JobDetailPage";
import SavedJobsPage from "./pages/SavedJobsPage";

const API_URL = "https://remotive.com/api/remote-jobs?limit=20&category=software-dev";

const normalizeJobType = (type) => {
  if (!type) return "Full-time";
  if (type.includes("contract")) return "Contract";
  if (type.includes("part"))     return "Part-time";
  return "Full-time";
};

const App = () => {
  const [jobs, setJobs]           = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]         = useState(null);
  const [savedIds, setSavedIds]   = useState(
    () => JSON.parse(localStorage.getItem("savedIds")) || []
  );
  const [darkMode, setDarkMode]   = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        const normalized = data.jobs.map(job => ({
          id:          job.id,
          title:       job.title,
          company:     job.company_name,
          location:    job.candidate_required_location || "Remote",
          type:        normalizeJobType(job.job_type),
          tags:        job.tags?.slice(0, 4) ?? [],
          logo:        job.company_logo,
          url:         job.url,
          date:        job.publication_date,
          description: job.description,
        }));
        setJobs(normalized);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    localStorage.setItem("savedIds", JSON.stringify(savedIds));
  }, [savedIds]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleSave = (id) => {
    setSavedIds(prev =>
      prev.includes(id)
        ? prev.filter(savedId => savedId !== id)
        : [...prev, id]
    );
  };

  const savedJobs = jobs.filter(job => savedIds.includes(job.id));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <Navbar
        savedCount={savedJobs.length}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(prev => !prev)}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              jobs={jobs}
              isLoading={isLoading}
              error={error}
              savedIds={savedIds}
              onToggleSave={toggleSave}
            />
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <JobDetailPage
              jobs={jobs}
              isLoading={isLoading}
              savedIds={savedIds}
              onToggleSave={toggleSave}
            />
          }
        />
        <Route
          path="/saved"
          element={
            <SavedJobsPage
              savedJobs={savedJobs}
              savedIds={savedIds}
              onToggleSave={toggleSave}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;