import { useState } from "react";
import API from "../services/api";
import AgentCard from "../components/AgentCard";

function IncidentForm() {

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
    description
  }
);
      setResult(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>OpsMind AI</h1>

      <input
  type="text"
  placeholder="Incident Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  style={{
    width: "600px",
    padding: "10px"
  }}
/>

<br />
<br />

<textarea
  rows="8"
  cols="80"
  placeholder="Incident Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>

      <br />
      <br />

      <button onClick={handleSubmit}>

        {loading
          ? "Analyzing..."
          : "Analyze Incident"}

      </button>

      {result && (

        <>

          <AgentCard
            title="Network Agent"
            content={result.network}
          />

          <AgentCard
            title="Database Agent"
            content={result.database}
          />

          <AgentCard
            title="Security Agent"
            content={result.security}
          />

          <AgentCard
            title="Application Agent"
            content={result.application}
          />

          <AgentCard
            title="Manager Report"
            content={result.finalReport}
          />

        </>
      )}

    </div>
  );
}

export default IncidentForm;