export default function AgentCard({ title, content }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{title}</h3>

      <pre style={styles.content}>
        {typeof content === "object"
          ? JSON.stringify(content, null, 2)
          : content}
      </pre>
    </div>
  );
}

const styles = {
  card: {
    background: "#0b1220",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    padding: "12px",
    marginBottom: "10px",
    color: "white",
  },

  title: {
    marginBottom: "8px",
    color: "#4da3ff",
    fontSize: "14px",
  },

  content: {
    fontSize: "12px",
    whiteSpace: "pre-wrap",
    color: "#cbd5e1",
  },
};