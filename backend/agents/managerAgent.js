export const managerPrompt = (
  incident,
  network,
  database,
  security,
  application
) => `
You are an Incident Commander.

Incident:
${incident}

Network Analysis:
${network}

Database Analysis:
${database}

Security Analysis:
${security}

Application Analysis:
${application}

Provide:

1. Root Cause
2. Impact
3. Recommended Actions
4. Final Confidence Score
`;