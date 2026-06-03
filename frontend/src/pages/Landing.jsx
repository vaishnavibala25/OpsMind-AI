import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.bgGlow}></div>

      <div style={styles.container}>
        <div style={styles.badge}>🛡️ SECURITY OPERATIONS CENTER</div>

        <h1 style={styles.title}>
          OpsMind <span style={styles.accent}>AI SOC</span>
        </h1>

        <p style={styles.subtitle}>
          Real-time AI-powered threat detection, incident analysis, and autonomous security response system.
        </p>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h2>⚡ Real-Time</h2>
            <p>Instant AI incident classification</p>
          </div>

          <div style={styles.card}>
            <h2>🧠 Multi-Agent AI</h2>
            <p>Network, Security, DB & App intelligence</p>
          </div>

          <div style={styles.card}>
            <h2>🔐 Threat Detection</h2>
            <p>Brute force, anomalies & intrusion detection</p>
          </div>
        </div>

        <div style={styles.buttons}>
          <button style={styles.primary} onClick={() => navigate("/login")}>
            Enter SOC Console
          </button>

          <button style={styles.secondary} onClick={() => navigate("/dashboard")}>
            View Dashboard
          </button>
        </div>

        <p style={styles.footer}>
          AI-driven SOC platform • Built for modern cybersecurity teams
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#070b14",
    color: "white",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  },

  bgGlow: {
    position: "absolute",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, #4da3ff33, transparent 70%)",
    top: "-200px",
    left: "-200px",
    filter: "blur(60px)",
  },

  container: {
    textAlign: "center",
    maxWidth: "900px",
    zIndex: 2,
  },

  badge: {
    display: "inline-block",
    padding: "6px 12px",
    fontSize: "12px",
    border: "1px solid #4da3ff",
    borderRadius: "20px",
    color: "#4da3ff",
    marginBottom: "20px",
  },

  title: {
    fontSize: "56px",
    fontWeight: "800",
    marginBottom: "10px",
  },

  accent: {
    color: "#4da3ff",
  },

  subtitle: {
    fontSize: "18px",
    color: "#9fb3ff",
    marginBottom: "40px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "40px",
  },

  card: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    padding: "20px",
    backdropFilter: "blur(10px)",
  },

  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "20px",
  },

  primary: {
    padding: "12px 26px",
    background: "#4da3ff",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  secondary: {
    padding: "12px 26px",
    background: "transparent",
    border: "1px solid #4da3ff",
    borderRadius: "10px",
    color: "#4da3ff",
    cursor: "pointer",
  },

  footer: {
    fontSize: "12px",
    color: "#6b7aa5",
  },
};