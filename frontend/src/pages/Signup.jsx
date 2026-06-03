import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await API.post("/auth/register", {
        email,
        password,
      });

      console.log(res.data);

      alert("Account created successfully. Please login.");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Signup failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.glow}></div>

      <div style={styles.card}>
        <h1 style={styles.title}>🧠 Create SOC Account</h1>
        <p style={styles.subtitle}>
          Join OpsMind AI Security Operations Center
        </p>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleSignup} style={styles.button}>
          Create Account
        </button>

        <p style={styles.link} onClick={() => navigate("/login")}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#070b14",
    color: "white",
    position: "relative",
  },

  glow: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background: "radial-gradient(circle, #4da3ff33, transparent 70%)",
    filter: "blur(80px)",
    bottom: "-150px",
    left: "-150px",
  },

  card: {
    width: "100%",
    maxWidth: "380px",
    padding: "30px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    textAlign: "center",
  },

  title: {
    marginBottom: "8px",
    fontSize: "22px",
    color: "#4da3ff",
  },

  subtitle: {
    marginBottom: "20px",
    fontSize: "13px",
    color: "#9fb3ff",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "#0b1220",
    color: "white",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#4da3ff",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  link: {
    marginTop: "12px",
    fontSize: "13px",
    color: "#4da3ff",
    cursor: "pointer",
  },
};