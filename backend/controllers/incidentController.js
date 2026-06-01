import Incident from "../models/Incident.js";

import { askAI } from "../services/openaiService.js";

import { networkPrompt } from "../agents/networkAgent.js";
import { databasePrompt } from "../agents/databaseAgent.js";
import { securityPrompt } from "../agents/securityAgent.js";
import { applicationPrompt } from "../agents/applicationAgent.js";
import { managerPrompt } from "../agents/managerAgent.js";

export const analyzeIncident = async (req, res) => {
  try {
   const { title, description } = req.body;

    console.log("Request received");
    console.log(description);

    console.log("Calling Network Agent...");
    const network = await askAI(networkPrompt(description));

    console.log("Calling Database Agent...");
    const database = await askAI(databasePrompt(description));

    console.log("Calling Security Agent...");
    const security = await askAI(securityPrompt(description));

    console.log("Calling Application Agent...");
    const application = await askAI(applicationPrompt(description));

    console.log("Calling Manager Agent...");




    const finalReport = await askAI(
      managerPrompt(
       description,
        network,
        database,
        security,
        application
      )
    );


    await Incident.create({
title,
 description,

  network,

  database,

  security,

  application,

  finalReport

});

const severityPrompt = `
Classify this incident severity.

Incident:
${description}

Return ONLY one word:

Low
Medium
High
Critical
`;

const severity = await askAI(severityPrompt);

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
res.json({
  success: true,
  severity,
  network,
  database,
  security,
  application,
  finalReport
});
  }
};