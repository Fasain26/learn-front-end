import { useParams, useNavigate, Link } from "react-router-dom";

const TYPE_STYLES = {
  "Full-time": "bg-blue-50 text-blue-500 dark:bg-blue-950 dark:text-blue-400",
  "Contract":  "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400",
  "Part-time": "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
};

const JobDetailPage = ({ jobs, isLoading, savedIds, onToggleSave }) => {
  const { id }   = useParams();
  const navigate = useNavigate();

  const job     = jobs.find(j => j.id === Number(id));
  const isSaved = savedIds.includes(Number(id));

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en", {
      month: "long", day: "numeric", year: "numeric",
    });

  if (isLoading) {
    return (
      <main className="max-w-[800px] mx-auto px-6 py-8">
        <div className="flex flex-col gap-4">
          {[80, 24, 16, 16, 200].map((h, i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" style={{ height: h }} />
          ))}
        </div>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="max-w-[800px] mx-auto px-6 py-8 text-center">
        <div className="text-5xl mb-4">🕵️</div>
        <h2 className="text-xl font-bold mb-2 dark:text-white">Job not found</h2>
        <p className="text-gray-400 text-sm mb-6">
          This job may have been removed or the link is invalid.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium no-underline transition-colors"
        >
          Back to jobs
        </Link>
      </main>
    );
  }

  const badgeClass = TYPE_STYLES[job.type] ?? TYPE_STYLES["Full-time"];

  return (
    <main className="max-w-[800px] mx-auto px-6 py-8">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 mb-6 bg-transparent border-none cursor-pointer transition-colors"
      >
        ← Back
      </button>

      {/* Header card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-8 mb-5">
        <div className="flex gap-5 items-start mb-5">
          <div
            className="rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 flex items-center justify-center"
            style={{ width: 72, height: 72 }}
          >
            {job.logo
              ? <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
              : <span className="text-3xl">🏢</span>
            }
          </div>

          <div className="flex-1">
            <h1 className="text-xl font-bold mb-1.5 leading-snug text-gray-900 dark:text-white">
              {job.title}
            </h1>
            <p className="text-[15px] text-gray-400 mb-3">{job.company}</p>
            <div className="flex gap-2.5 flex-wrap items-center">
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${badgeClass}`}>
                {job.type}
              </span>
              <span className="text-[13px] text-gray-400">📍 {job.location}</span>
              <span className="text-[13px] text-gray-400">📅 {formatDate(job.date)}</span>
            </div>
          </div>
        </div>

        {job.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-6">
            {job.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 border border-gray-100 dark:border-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <a
            href={job.url}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-[15px] font-semibold text-center no-underline transition-colors"
          >
            Apply now →
          </a>
          <button
            onClick={() => onToggleSave(job.id)}
            className={`px-6 py-3 rounded-xl border text-sm font-medium cursor-pointer transition-all
              ${isSaved
                ? "bg-blue-50 dark:bg-blue-950 border-blue-300 dark:border-blue-800 text-blue-500"
                : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-400 hover:border-blue-300 hover:text-blue-400"
              }`}
          >
            {isSaved ? "✓ Saved" : "Save"}
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-8">
        <h2 className="text-base font-semibold mb-5 text-gray-900 dark:text-white">
          Job Description
        </h2>
        <div
          className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: job.description }}
        />
      </div>

    </main>
  );
};

export default JobDetailPage;