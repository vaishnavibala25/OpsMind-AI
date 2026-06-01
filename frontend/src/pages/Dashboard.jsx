function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>OpsMind Dashboard</h1>

      <div style={{
        display: "flex",
        gap: "20px",
        marginTop: "20px"
      }}>
        <div>
          <h3>Total Incidents</h3>
          <h1>25</h1>
        </div>

        <div>
          <h3>Critical</h3>
          <h1>8</h1>
        </div>

        <div>
          <h3>Resolved</h3>
          <h1>17</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;