const Navbar = () => {
  return (
    <nav style={{
      display:         "flex",
      justifyContent:  "space-between",
      alignItems:      "center",
      padding:         "16px 32px",
      background:      "var(--primary)",
      position:        "sticky",
      top:             0,
      zIndex:          100,
    }}>
      <span style={{ color: "white", fontSize: 20, fontWeight: 700 }}>
        DevJobs
      </span>

      <ul style={{
        display:    "flex",
        gap:        24,
        listStyle:  "none",
      }}>
        {["Jobs", "Companies", "Saved", "Profile"].map(link => (
          <li key={link}>
            <a
              href="#"
              style={{
                color:          "#ccc",
                textDecoration: "none",
                fontSize:       14,
              }}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;