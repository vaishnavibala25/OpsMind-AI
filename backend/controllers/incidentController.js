import Incident from "../models/Incident.js";

import { askAI } from "../services/openaiService.js";

import { networkPrompt } from "../agents/networkAgent.js";
import { databasePrompt } from "../agents/databaseAgent.js";
import { securityPrompt } from "../agents/securityAgent.js";
import { applicationPrompt } from "../agents/applicationAgent.js";
import { managerPrompt } from "../agents/managerAgent.js";

const parseAI = (data) => {
  try {
    return typeof data === "string"
      ? JSON.parse(data)
      : data;
  } catch {
    return data;
  }
};

const calculateSeverity = (
  network,
  database,
  security,
  application
) => {

  const scores = [
    network?.confidenceScore || 0,
    database?.confidenceScore || 0,
    security?.confidenceScore || 0,
    application?.confidenceScore || 0
  ];

  const max = Math.max(...scores);

  if (max >= 0.85) return "Critical";

  if (max >= 0.65) return "High";

  if (max >= 0.40) return "Medium";

  return "Low";
};

export const analyzeIncident = async (req, res) => {

  try {

    const { title, description } = req.body;

    if (!title || !description) {

      return res.status(400).json({
        success: false,
        message: "Title and Description are required"
      });

    }

    console.log("Request received");
    console.log(description);

    console.log("Calling Network Agent...");
    const network =
      parseAI(
        await askAI(
          networkPrompt(description)
        )
      );

    console.log("Calling Database Agent...");
    const database =
      parseAI(
        await askAI(
          databasePrompt(description)
        )
      );

    console.log("Calling Security Agent...");
    const security =
      parseAI(
        await askAI(
          securityPrompt(description)
        )
      );

    console.log("Calling Application Agent...");
    const application =
      parseAI(
        await askAI(
          applicationPrompt(description)
        )
      );

    console.log("Calling Manager Agent...");

    const managerResponse =
      await askAI(
        managerPrompt(
          description,
          network,
          database,
          security,
          application
        )
      );

    let managerData;

    try {

      managerData =
        typeof managerResponse === "string"
          ? JSON.parse(managerResponse)
          : managerResponse;

    } catch {

      managerData = {};

    }

    const severity =
      calculateSeverity(
        network,
        database,
        security,
        application
      );

    const rankings = [

      {
        agent: "Network",
        score:
          network?.confidenceScore || 0
      },

      {
        agent: "Database",
        score:
          database?.confidenceScore || 0
      },

      {
        agent: "Security",
        score:
          security?.confidenceScore || 0
      },

      {
        agent: "Application",
        score:
          application?.confidenceScore || 0
      }

    ].sort(
      (a, b) =>
        b.score - a.score
    );

    const executiveSummary = `
Incident Severity: ${severity}

Primary Cause:
${managerData?.rootCause?.primary || "Unknown"}

Top Responsible Domain:
${rankings[0]?.agent || "Unknown"}

Business Impact:
${managerData?.impact?.business?.[0] || "Unknown"}

Recommended Action:
${managerData?.recommendation?.[0] || "Investigate immediately"}
`;

    const incident =
      await Incident.create({

        title,
        description,

        severity,

        executiveSummary,

        rankings,

        rootCause:
          managerData?.rootCause || {},

        impact:
          managerData?.impact || {
            technical: [],
            business: []
          },

        risk:
          managerData?.risk || {
            shortTerm: [],
            longTerm: []
          },

        recommendation:
          managerData?.recommendation || [],

        network,
        database,
        security,
        application,

        finalReport:
          managerData,

        status: "Open"
      });

    return res.status(200).json({

      success: true,

      id: incident._id,

      severity,

      executiveSummary,

      rankings,

      network,

      database,

      security,

      application,

      rootCause:
        incident.rootCause,

      impact:
        incident.impact,

      risk:
        incident.risk,

      recommendation:
        incident.recommendation,

      finalReport:
        incident.finalReport

    });

  } catch (error) {

    console.error(
      "Incident Analysis Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Analysis failed"
    });

  }
};