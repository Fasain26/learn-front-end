import { Link, useLocation } from "react-router-dom";

const Navbar = ({ savedCount }) => {
  const location = useLocation();

  const linkClass = (path) =>
    `text-sm transition-colors duration-150 ${
      location.pathname === path
        ? "text-white font-semibold"
        : "text-gray-400 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-[#1a1a2e]">
      <Link to="/" className="text-white text-xl font-bold no-underline">
        DevJobs
      </Link>

      <ul className="flex items-center gap-7 list-none">
        <li>
          <Link to="/" className={linkClass("/")}>
            Jobs
          </Link>
        </li>
        <li className="relative">
          <Link to="/saved" className={linkClass("/saved")}>
            Saved
            {savedCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-blue-500 text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;