import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import AgentCard from "../components/AgentCard";

function IncidentForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await API.post(
        "/incidents/analyze",
        {
          title,
          description,
        }
      );

      setResult(response.data);

      const incidentId =
        response.data.id ||
        response.data._id;

      if (incidentId) {
        setTimeout(() => {
          navigate(`/incident/${incidentId}`);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      alert("Analysis Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>
          🧠 OpsMind AI SOC Console
        </h1>

        <input
          type="text"
          placeholder="Incident Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          style={styles.input}
        />

        <textarea
          placeholder="Describe the Incident..."
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          style={styles.textarea}
        />

        <button
          onClick={handleSubmit}
          style={styles.button}
        >
          {loading
            ? "Analyzing Incident..."
            : "Analyze Incident"}
        </button>

        {result && (
          <div style={{ marginTop: 30 }}>
            <h2>AI Analysis Result</h2>

            <div style={styles.severity}>
              Severity:
              {" "}
              {result.severity}
            </div>

            <AgentCard
              title="🌐 Network Agent"
              content={result.network}
            />

            <AgentCard
              title="🗄 Database Agent"
              content={result.database}
            />

            <AgentCard
              title="🔒 Security Agent"
              content={result.security}
            />

            <AgentCard
              title="⚙ Application Agent"
              content={result.application}
            />

            <AgentCard
              title="👨‍💼 Manager Report"
              content={result.finalReport}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default IncidentForm;

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  card: {
    width: "900px",
    background: "#111827",
    padding: "25px",
    borderRadius: "12px",
    color: "white",
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "none",
  },

  textarea: {
    width: "100%",
    minHeight: "150px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
  },

  button: {
    width: "100%",
    marginTop: "15px",
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  severity: {
    padding: "10px",
    marginBottom: "15px",
    background: "#1e293b",
    borderRadius: "8px",
    fontWeight: "bold",
  },
};