import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <div style={styles.navbar}>
      <div style={styles.logo}>OpsMind SOC</div>

      <div style={styles.links}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/incident">Incident</Link>
        <Link to="/history">History</Link>
         <Link to="/analytics">Analytics</Link>
      </div>

      <button style={styles.btn} onClick={logout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "#111a2e",
    borderBottom: "1px solid #1f2a44",
  },
  logo: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#4ea1ff",
  },
  links: {
    display: "flex",
    gap: "20px",
  },
  btn: {
    background: "#4ea1ff",
    border: "none",
    padding: "8px 12px",
    color: "white",
    cursor: "pointer",
    borderRadius: "6px",
  },
};