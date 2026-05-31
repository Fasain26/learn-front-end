import JobCard from "./JobCard";

const SkeletonCard = () => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col gap-3">
    {[48, 16, 12, 12, 12].map((height, i) => (
      <div
        key={i}
        className="bg-gray-100 rounded-md animate-pulse"
        style={{
          height,
          width: i === 0 ? 48 : i === 1 ? "60%" : "80%",
          borderRadius: i === 0 ? "50%" : undefined,
        }}
      />
    ))}
  </div>
);

const JobList = ({ jobs, isLoading, error, savedIds, onToggleSave }) => {

  if (isLoading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 px-6 bg-red-50 rounded-xl border border-red-200">
        <div className="text-5xl mb-4">⚠️</div>
        <p className="text-base font-medium text-red-500 mb-2">Failed to load jobs</p>
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-white rounded-xl border border-gray-100">
        <div className="text-5xl mb-4">🔍</div>
        <p className="text-base font-medium text-gray-700 mb-2">No jobs match your search</p>
        <p className="text-sm text-gray-400">Try a different keyword or clear the filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
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