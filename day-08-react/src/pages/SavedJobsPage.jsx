import { Link } from "react-router-dom";
import JobCard from "../components/JobCard";

const SavedJobsPage = ({ savedJobs, savedIds, onToggleSave }) => {
  return (
    <main className="max-w-[1100px] mx-auto px-6 py-8">

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Saved Jobs</h2>
        <p className="text-gray-400 text-sm">
          {savedJobs.length} {savedJobs.length === 1 ? "job" : "jobs"} saved
        </p>
      </div>

      {savedJobs.length === 0 ? (
        <div className="text-center py-16 px-6 bg-white rounded-2xl border border-gray-100">
          <div className="text-5xl mb-4">🔖</div>
          <p className="text-base font-semibold text-gray-700 mb-2">No saved jobs yet</p>
          <p className="text-sm text-gray-400 mb-6">
            Hit "Save job" on any listing to keep track of it here.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-2.5 bg-blue-500 text-white rounded-xl text-sm font-medium no-underline hover:bg-blue-600 transition-colors"
          >
            Browse jobs
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
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