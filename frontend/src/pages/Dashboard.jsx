import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [incidents, setIncidents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("/incidents/history");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      setIncidents(data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalIncidents = incidents.length;

  const criticalCount = incidents.filter(
    (i) => i.severity === "Critical"
  ).length;

  const highCount = incidents.filter(
    (i) => i.severity === "High"
  ).length;

  const latestIncidents = incidents.slice(0, 5);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>
        🧠 OpsMind SOC Dashboard
      </h1>

      <p style={styles.subtitle}>
        Real-Time Incident Monitoring Console
      </p>

      {/* KPI SECTION */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <h2>{totalIncidents}</h2>
          <p>Total Incidents</p>
        </div>

        <div style={styles.statCard}>
          <h2>{criticalCount}</h2>
          <p>Critical Alerts</p>
        </div>

        <div style={styles.statCard}>
          <h2>{highCount}</h2>
          <p>High Severity</p>
        </div>

        <div style={styles.statCard}>
          <h2>5</h2>
          <p>AI Agents Online</p>
        </div>
      </div>

      {/* AGENT STATUS */}
      <div style={styles.section}>
        <h2>🤖 AI Agent Status</h2>

        <div style={styles.agentGrid}>
          <div style={styles.agent}>
            🟢 Network Agent
          </div>

          <div style={styles.agent}>
            🟢 Database Agent
          </div>

          <div style={styles.agent}>
            🟢 Security Agent
          </div>

          <div style={styles.agent}>
            🟢 Application Agent
          </div>

          <div style={styles.agent}>
            🟢 Manager Agent
          </div>
        </div>
      </div>

      {/* LIVE SYSTEM STATUS */}
      <div style={styles.section}>
        <h2>📡 SOC Status</h2>

        <div style={styles.statusGrid}>
          <div style={styles.statusCard}>
            <h3>System Health</h3>
            <p style={{ color: "#34c759" }}>
              Operational
            </p>
          </div>

          <div style={styles.statusCard}>
            <h3>Threat Level</h3>
            <p style={{ color: "#ff9500" }}>
              Medium
            </p>
          </div>

          <div style={styles.statusCard}>
            <h3>Monitoring</h3>
            <p style={{ color: "#34c759" }}>
              Active
            </p>
          </div>
        </div>
      </div>

      {/* LATEST INCIDENTS */}
      <div style={styles.section}>
        <h2>📌 Latest Incidents</h2>

        {latestIncidents.length === 0 ? (
          <p>No incidents available</p>
        ) : (
          latestIncidents.map((inc) => (
            <div
              key={inc._id}
              style={styles.incidentCard}
              onClick={() =>
                navigate(`/incident/${inc._id}`)
              }
            >
              <h3>{inc.title}</h3>

              <p>
                <strong>Severity:</strong>{" "}
                {inc.severity}
              </p>

              <p>
                <strong>Root Cause:</strong>{" "}
                {inc.rootCause?.primary ||
                  "Not Available"}
              </p>

              <p>
                <strong>Created:</strong>{" "}
                {new Date(
                  inc.createdAt
                ).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#081224",
    color: "white",
    padding: "20px",
    fontFamily: "Arial",
  },

  title: {
    color: "#4da3ff",
    marginBottom: "5px",
  },

  subtitle: {
    color: "#94a3b8",
    marginBottom: "25px",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "15px",
    marginBottom: "20px",
  },

  statCard: {
    background: "#111a2e",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
  },

  section: {
    background: "#111a2e",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
  },

  agentGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "10px",
  },

  agent: {
    background: "#0b1220",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "center",
  },

  statusGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "15px",
  },

  statusCard: {
    background: "#0b1220",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "center",
  },

  incidentCard: {
    background: "#0b1220",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "10px",
    cursor: "pointer",
    borderLeft: "4px solid #4da3ff",
  },
};