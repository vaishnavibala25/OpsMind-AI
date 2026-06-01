function AgentCard({ title, content }) {

  return (

    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        marginTop: "15px",
        borderRadius: "10px"
      }}
    >

      <h3>{title}</h3>

      <pre
        style={{
          whiteSpace: "pre-wrap"
        }}
      >
        {content}
      </pre>

    </div>
  );
}

export default AgentCard;