import { Link, useLocation } from "react-router-dom";

const Navbar = ({ savedCount }) => {
  const location = useLocation();

  const linkStyle = (path) => ({
    color:          location.pathname === path ? "white" : "#999",
    textDecoration: "none",
    fontSize:       14,
    fontWeight:     location.pathname === path ? 600 : 400,
    transition:     "color 0.15s",
  });

  return (
    <nav style={{
      display:        "flex",
      justifyContent: "space-between",
      alignItems:     "center",
      padding:        "16px 32px",
      background:     "var(--primary)",
      position:       "sticky",
      top:            0,
      zIndex:         100,
    }}>
      <Link to="/" style={{ color: "white", fontSize: 20, fontWeight: 700, textDecoration: "none" }}>
        DevJobs
      </Link>

      <ul style={{ display: "flex", gap: 28, listStyle: "none", alignItems: "center" }}>
        <li>
          <Link to="/" style={linkStyle("/")}>Jobs</Link>
        </li>
        <li style={{ position: "relative" }}>
          <Link to="/saved" style={linkStyle("/saved")}>
            Saved
            {savedCount > 0 && (
              <span style={{
                position:     "absolute",
                top:          -8,
                right:        -12,
                background:   "var(--accent)",
                color:        "white",
                fontSize:     10,
                fontWeight:   700,
                width:        18,
                height:       18,
                borderRadius: "50%",
                display:      "flex",
                alignItems:   "center",
                justifyContent: "center",
              }}>
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