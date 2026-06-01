import { useState } from "react";
import API from "../services/api";
import AgentCard from "../components/AgentCard";

function IncidentForm() {

  const [incident,setIncident] = useState("");
  const [result,setResult] = useState(null);
  const [loading,setLoading] = useState(false);

  const handleSubmit = async() => {

    setLoading(true);

    try{

      const response = await API.post(
        "/incidents/analyze",
        {
          incident
        }
      );

      setResult(response.data);

    }catch(error){

      console.log(error);

    }finally{

      setLoading(false);

    }
  };

  return (
    <div>

      <textarea
        rows="8"
        cols="70"
        placeholder="Enter Incident..."
        value={incident}
        onChange={(e)=>setIncident(e.target.value)}
      />

      <br/>

      <button onClick={handleSubmit}>
        Analyze Incident
      </button>

      {loading && (
        <h3>Analyzing...</h3>
      )}

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
            title="Final Report"
            content={result.finalReport}
          />
        </>
      )}

    </div>
  );
}

export default IncidentForm;