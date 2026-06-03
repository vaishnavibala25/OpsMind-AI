import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [incidents, setIncidents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const res = await API.get("/incidents/history");

    const data = Array.isArray(res.data)
      ? res.data
      : res.data?.data || [];

    setIncidents(data);
  };

  return (
    <div style={styles.page}>
      <h1>📜 Incident History</h1>

      {incidents.map((inc) => (
        <div
          key={inc._id}
          style={styles.card}
          onClick={() => navigate(`/incident/${inc._id}`)}
        >
          <h3>{inc.title}</h3>

          <p>
            Severity: {inc.severity}
          </p>

          <p>
            Root Cause:
            {" "}
            {inc.rootCause?.primary}
          </p>

          <p>
            Created:
            {" "}
            {new Date(
              inc.createdAt
            ).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  page:{
    minHeight:"100vh",
    background:"#081224",
    color:"white",
    padding:"20px"
  },

  card:{
    background:"#0f1c35",
    padding:"20px",
    marginBottom:"15px",
    borderRadius:"10px",
    cursor:"pointer"
  }
};