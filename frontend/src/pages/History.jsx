import { useEffect, useState } from "react";
import API from "../services/api";

function History() {

  const [incidents, setIncidents] = useState([]);

  useEffect(() => {

    fetchIncidents();

  }, []);

  const fetchIncidents = async () => {

    try {

      const response =
        await API.get("/incidents");

      setIncidents(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div>

      <h1>Incident History</h1>

      {incidents.map((item) => (

        <div
          key={item._id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "10px"
          }}
        >

          <h3>{item.title}</h3>

          <p>{item.description}</p>

        </div>

      ))}

    </div>
  );
}

export default History;