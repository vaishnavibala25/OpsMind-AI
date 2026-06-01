import { askAI } from "../services/openaiService.js";

import { networkPrompt } from "../agents/networkAgent.js";
import { databasePrompt } from "../agents/databaseAgent.js";
import { securityPrompt } from "../agents/securityAgent.js";
import { applicationPrompt } from "../agents/applicationAgent.js";
import { managerPrompt } from "../agents/managerAgent.js";

export const analyzeIncident = async (req, res) => {
  try {
    const { incident } = req.body;

    console.log("Request received");
    console.log(incident);

    console.log("Calling Network Agent...");
    const network = await askAI(networkPrompt(incident));

    console.log("Calling Database Agent...");
    const database = await askAI(databasePrompt(incident));

    console.log("Calling Security Agent...");
    const security = await askAI(securityPrompt(incident));

    console.log("Calling Application Agent...");
    const application = await askAI(applicationPrompt(incident));

    console.log("Calling Manager Agent...");
    const finalReport = await askAI(
      managerPrompt(
        incident,
        network,
        database,
        security,
        application
      )
    );

    res.status(200).json({
      success: true,
      network,
      database,
      security,
      application,
      finalReport
    });

  } catch (error) {
    console.error("Incident Analysis Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to analyze incident",
      error: error.message
    });
  }
};