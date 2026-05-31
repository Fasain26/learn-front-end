const Hero = ({ totalJobs, isLoading }) => {
  return (
    <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2d2d5e] text-white">
      <div className="max-w-[1100px] mx-auto px-6 py-16 text-center">

        <span className="inline-block text-xs font-semibold tracking-widest text-blue-400 uppercase mb-4">
          Remote & Global
        </span>

        <h1 className="text-4xl font-bold mb-4 leading-tight">
          Find your next{" "}
          <span className="text-blue-400">developer role</span>
        </h1>

        <p className="text-gray-400 text-base max-w-md mx-auto mb-10">
          Browse{" "}
          {isLoading
            ? "thousands of"
            : <span className="text-white font-semibold">{totalJobs}</span>
          }{" "}
          remote software jobs from top companies worldwide.
        </p>

        {/* Stats row */}
        <div className="flex justify-center gap-8 flex-wrap">
          {[
            { label: "Live Jobs",      value: isLoading ? "—" : totalJobs  },
            { label: "Remote Only",    value: "100%"                        },
            { label: "New This Week",  value: isLoading ? "—" : Math.floor(totalJobs * 0.4) },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Hero;