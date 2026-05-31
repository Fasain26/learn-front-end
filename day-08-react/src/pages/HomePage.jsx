import { useState } from "react";
import Hero from "../components/Hero";
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
    <div>
      <Hero totalJobs={jobs.length} isLoading={isLoading} />

      <main className="max-w-[1100px] mx-auto px-6 py-8">

        {/* Controls */}
        <div className="flex gap-3 mb-7 flex-wrap items-center">
          <input
            type="text"
            placeholder="Search jobs, companies, skills..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-[220px] px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-900 dark:text-white outline-none focus:border-blue-400 transition-colors placeholder:text-gray-300 dark:placeholder:text-gray-600"
          />

          <div className="flex gap-2 flex-wrap">
            {FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setFilter(filter)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-all duration-150 cursor-pointer
                  ${activeFilter === filter
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-400 hover:border-blue-300 hover:text-blue-400"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-[13px] bg-white dark:bg-gray-900 dark:text-white outline-none cursor-pointer"
          >
            <option value="default">Sort: Default</option>
            <option value="company">Sort: Company A–Z</option>
            <option value="newest">Sort: Newest first</option>
          </select>
        </div>

        {/* Results count */}
        {!isLoading && (
          <p className="text-sm text-gray-400 mb-5">
            Showing{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {filteredJobs.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {jobs.length}
            </span>{" "}
            jobs
          </p>
        )}

        <JobList
          jobs={filteredJobs}
          isLoading={isLoading}
          error={error}
          savedIds={savedIds}
          onToggleSave={onToggleSave}
        />

      </main>
    </div>
  );
};

export default HomePage;