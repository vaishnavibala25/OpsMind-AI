import { useEffect, useState } from "react";
import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

export default function Analytics() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("/incidents/history");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      setIncidents(data);
    } catch (err) {
      console.log(err);
    }
  };

  const critical = incidents.filter(
    (i) => i.severity === "Critical"
  ).length;

  const high = incidents.filter(
    (i) => i.severity === "High"
  ).length;

  const medium = incidents.filter(
    (i) => i.severity === "Medium"
  ).length;

  const low = incidents.filter(
    (i) => i.severity === "Low"
  ).length;

  const severityData = [
    { name: "Critical", value: critical },
    { name: "High", value: high },
    { name: "Medium", value: medium },
    { name: "Low", value: low },
  ];

  const COLORS = [
    "#ff3b30",
    "#ff9500",
    "#ffd60a",
    "#34c759",
  ];

  const rootCauseMap = {};

  incidents.forEach((inc) => {
    const cause =
      inc.rootCause?.primary || "Unknown";

    rootCauseMap[cause] =
      (rootCauseMap[cause] || 0) + 1;
  });

  const causeData = Object.entries(rootCauseMap)
    .map(([cause, count]) => ({
      cause,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>
        📊 OpsMind Analytics Dashboard
      </h1>

      <p style={styles.subtitle}>
        AI-Powered Security Incident Intelligence
      </p>

      {/* KPI CARDS */}
      <div style={styles.cardGrid}>
        <div style={styles.kpiCard}>
          <h2>{incidents.length}</h2>
          <p>Total Incidents</p>
        </div>

        <div style={styles.kpiCard}>
          <h2>{critical}</h2>
          <p>Critical Alerts</p>
        </div>

        <div style={styles.kpiCard}>
          <h2>{high}</h2>
          <p>High Severity</p>
        </div>

        <div style={styles.kpiCard}>
          <h2>5</h2>
          <p>AI Agents</p>
        </div>
      </div>

      {/* PIE CHART */}
      <div style={styles.chartCard}>
        <h2>🚨 Severity Distribution</h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <PieChart>
            <Pie
              data={severityData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {severityData.map(
                (entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART */}
      <div style={styles.chartCard}>
        <h2>🎯 Top Root Causes</h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <BarChart data={causeData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="cause"
              tick={{ fill: "#fff" }}
            />

            <YAxis
              tick={{ fill: "#fff" }}
            />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="count"
              fill="#4da3ff"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* SUMMARY */}
      <div style={styles.chartCard}>
        <h2>🤖 AI Coverage Summary</h2>

        <ul>
          <li>
            Network Agent → Network
            analysis
          </li>

          <li>
            Database Agent → Database
            bottleneck detection
          </li>

          <li>
            Security Agent → Threat &
            attack analysis
          </li>

          <li>
            Application Agent → App
            performance diagnosis
          </li>

          <li>
            Manager Agent → Root cause,
            risk & recommendation
          </li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#081224",
    color: "white",
    padding: "20px",
    fontFamily: "Arial",
  },

  title: {
    color: "#4da3ff",
    marginBottom: "5px",
  },

  subtitle: {
    color: "#94a3b8",
    marginBottom: "20px",
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "15px",
    marginBottom: "20px",
  },

  kpiCard: {
    background: "#111a2e",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.3)",
  },

  chartCard: {
    background: "#111a2e",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.3)",
  },
};