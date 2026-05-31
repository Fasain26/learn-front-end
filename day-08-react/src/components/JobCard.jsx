import { Link } from "react-router-dom";

const TYPE_STYLES = {
  "Full-time": "bg-blue-50 text-blue-500 dark:bg-blue-950 dark:text-blue-400",
  "Contract":  "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400",
  "Part-time": "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
};

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en", {
    month: "short", day: "numeric", year: "numeric",
  });

const JobCard = ({ job, isSaved, onToggleSave }) => {
  const badgeClass = TYPE_STYLES[job.type] ?? TYPE_STYLES["Full-time"];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col overflow-hidden transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md">

      <Link
        to={`/jobs/${job.id}`}
        className="flex flex-col gap-3 p-6 flex-1 no-underline text-inherit"
      >
        {/* Top row */}
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 flex items-center justify-center">
            {job.logo
              ? <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
              : <span className="text-2xl">🏢</span>
            }
          </div>
          <span className={`text-[11px] font-medium px-3 py-1 rounded-full ${badgeClass}`}>
            {job.type}
          </span>
        </div>

        {/* Title + company */}
        <div>
          <h3 className="text-[15px] font-semibold mb-1 line-clamp-2 text-gray-900 dark:text-white">
            {job.title}
          </h3>
          <p className="text-[13px] text-gray-400">{job.company}</p>
        </div>

        {/* Tags */}
        {job.tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {job.tags.map(tag => (
              <span
                key={tag}
                className="text-[11px] px-2.5 py-0.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 border border-gray-100 dark:border-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Bottom row */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
          <span className="text-[13px] text-gray-400">📍 {job.location}</span>
          <span className="text-[12px] text-gray-300 dark:text-gray-600">{formatDate(job.date)}</span>
        </div>
      </Link>

      {/* Save button */}
      <button
        onClick={() => onToggleSave(job.id)}
        className={`w-full py-2.5 text-[13px] font-medium border-t transition-all duration-150 cursor-pointer
          ${isSaved
            ? "bg-blue-50 dark:bg-blue-950 text-blue-500 border-blue-100 dark:border-blue-900"
            : "bg-white dark:bg-gray-900 text-gray-400 border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
          }`}
      >
        {isSaved ? "✓ Saved" : "Save job"}
      </button>

    </div>
  );
};

export default JobCard;