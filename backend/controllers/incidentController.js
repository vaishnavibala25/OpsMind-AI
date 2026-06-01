import { networkPrompt } from "../agents/networkAgent.js";
import { databasePrompt } from "../agents/databaseAgent.js";
import { securityPrompt } from "../agents/securityAgent.js";
import { applicationPrompt } from "../agents/applicationAgent.js";
import { managerPrompt } from "../agents/managerAgent.js";

const network = await askAI(networkPrompt(incident));
const database = await askAI(databasePrompt(incident));
const security = await askAI(securityPrompt(incident));
const application = await askAI(applicationPrompt(incident));

const finalReport = await askAI(
  managerPrompt(
    incident,
    network,
    database,
    security,
    application
  )
);