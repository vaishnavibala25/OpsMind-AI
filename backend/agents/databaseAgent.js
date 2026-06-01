export const databasePrompt = (incident) => `
You are a Senior Database Administrator.

Analyze:

${incident}

Provide:
1. Possible Database Causes
2. Risks
3. Confidence Score
`;