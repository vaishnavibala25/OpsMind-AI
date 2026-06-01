import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#111827",
        padding: "15px"
      }}
    >
      <Link
        to="/"
        style={{
          color: "white",
          marginRight: "20px"
        }}
      >
        Dashboard
      </Link>

      <Link
        to="/analyze"
        style={{
          color: "white"
        }}
      >
        Analyze
      </Link>
    </nav>
  );
}

export default Navbar;