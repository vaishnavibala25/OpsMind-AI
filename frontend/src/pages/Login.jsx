import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      login(res.data.user, res.data.token);

      navigate("/incident");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.glow}></div>

      <div style={styles.card}>
        <h1 style={styles.title}>🛡️ OpsMind SOC Login</h1>
        <p style={styles.subtitle}>Secure access to AI incident console</p>

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

        <button onClick={handleLogin} style={styles.button}>
          Login to Console
        </button>

        <p
          style={styles.link}
          onClick={() => navigate("/register")}
        >
          Create new account
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
    top: "-150px",
    right: "-150px",
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
    marginTop: "5px",
  },

  link: {
    marginTop: "12px",
    fontSize: "13px",
    color: "#4da3ff",
    cursor: "pointer",
  },
};