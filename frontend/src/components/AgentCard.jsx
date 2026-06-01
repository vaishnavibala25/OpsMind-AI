function AgentCard({title,content}) {

  return (
    <div
      style={{
        border:"1px solid gray",
        padding:"15px",
        margin:"15px",
        borderRadius:"10px"
      }}
    >

      <h2>{title}</h2>

      <p>{content}</p>

    </div>
  );
}

export default AgentCard;