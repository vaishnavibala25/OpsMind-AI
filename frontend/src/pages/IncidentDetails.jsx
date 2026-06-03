import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function IncidentDetails() {
  const { id } = useParams();
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIncident();
  }, [id]);

  const fetchIncident = async () => {
    try {
      setLoading(true);

      const res = await API.get("/incidents/history");

      const list = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      const found = list.find((i) => String(i._id) === String(id));

      setIncident(found || null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <p style={styles.loading}>Loading incident report...</p>
      </div>
    );
  }

  if (!incident) {
    return (
      <div style={styles.page}>
        <p style={styles.error}>Incident not found</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🧠 Incident Report</h1>

      {/* HEADER CARD */}
      <div style={styles.card}>
        <h2>{incident.title}</h2>
        <p>
          <b>Severity:</b>{" "}
          <span style={getSeverityStyle(incident.severity)}>
            {incident.severity}
          </span>
        </p>
      </div>

      {/* ROOT CAUSE */}
      <div style={styles.card}>
        <h3>🔍 Root Cause</h3>
        <p>{incident.rootCause?.primary || "Not available"}</p>
      </div>

      {/* IMPACT */}
      <div style={styles.card}>
        <h3>⚠ Impact</h3>
        <p>
          <b>Technical:</b>{" "}
          {incident.impact?.technical?.join(", ") || "N/A"}
        </p>
        <p>
          <b>Business:</b>{" "}
          {incident.impact?.business?.join(", ") || "N/A"}
        </p>
      </div>

      {/* RISK */}
      <div style={styles.card}>
        <h3>📊 Risk Analysis</h3>
        <p>
          <b>Short Term:</b>{" "}
          {incident.risk?.shortTerm?.join(", ") || "N/A"}
        </p>
        <p>
          <b>Long Term:</b>{" "}
          {incident.risk?.longTerm?.join(", ") || "N/A"}
        </p>
      </div>

      {/* RECOMMENDATION */}
      <div style={styles.card}>
        <h3>🛠 Recommendations</h3>
        <p>
          {incident.recommendation?.join(", ") || "N/A"}
        </p>
      </div>

      {/* AGENT OUTPUTS */}
      <div style={styles.card}>
        <h3>🤖 Agent Intelligence</h3>

        <div style={styles.agentBox}>
          <h4>Network</h4>
          <pre>{format(incident.network)}</pre>
        </div>

        <div style={styles.agentBox}>
          <h4>Security</h4>
          <pre>{format(incident.security)}</pre>
        </div>

        <div style={styles.agentBox}>
          <h4>Database</h4>
          <pre>{format(incident.database)}</pre>
        </div>

        <div style={styles.agentBox}>
          <h4>Application</h4>
          <pre>{format(incident.application)}</pre>
        </div>
      </div>
    </div>
  );
}

/* Helpers */
function format(data) {
  if (!data) return "N/A";
  if (typeof data === "string") {
    try {
      return JSON.stringify(JSON.parse(data), null, 2);
    } catch {
      return data;
    }
  }
  return JSON.stringify(data, null, 2);
}

function getSeverityStyle(severity) {
  const base = {
    padding: "2px 8px",
    borderRadius: "6px",
    fontWeight: "bold",
  };

  switch (severity) {
    case "Critical":
      return { ...base, color: "#ff3b30" };
    case "High":
      return { ...base, color: "#ff9500" };
    case "Medium":
      return { ...base, color: "#ffd60a" };
    case "Low":
      return { ...base, color: "#34c759" };
    default:
      return { ...base, color: "#94a3b8" };
  }
}

/* Styles */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#0b1220",
    color: "white",
    padding: "20px",
    fontFamily: "Arial",
  },

  title: {
    color: "#4da3ff",
    marginBottom: "15px",
  },

  card: {
    background: "#111a2e",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  agentBox: {
    marginTop: "10px",
    padding: "10px",
    background: "#0b1220",
    borderRadius: "8px",
  },

  loading: {
    color: "#ffd60a",
  },

  error: {
    color: "#ff3b30",
  },
};